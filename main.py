from fastapi import FastAPI, HTTPException, Depends, UploadFile, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from passlib.context import CryptContext
import shutil
from fastapi import File, UploadFile
#######
import Models.models as models
from Database.database import engine, session_local
from sqlalchemy.orm import Session
from typing import List, Annotated
from fastapi.encoders import jsonable_encoder
import uuid
from fastapi.middleware.cors import CORSMiddleware
import random

###########################
# THIS IS THE FILE WITH CRUD OPERATIONS
###########################
app = FastAPI()

origins = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

##########
# MODELS
class UserBase(BaseModel):
    username: str
    email: str
    hashed_password: str

class HWCarPostBase(BaseModel):
    post_id: int
    userID: uuid.UUID
    username: str
    image_url: str
    model: str
    year: int
    type: str
    series: str
    color: str

class CommentsBase(BaseModel):
    post_id: int
    comment: str
    user_id: int

class LikeBase(BaseModel):
    post_id: int
    user_id: int

class CollectionsBase(BaseModel):
    postID: uuid.UUID
    collection_name: str
    userID: uuid.UUID
class CollectionNamesBase(BaseModel):
    userID: uuid.UUID
    collection_name: str
##################
# DB Connection
def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()

dp_dependency = Annotated[Session,Depends(get_db)]

################
#   POST

@app.post("/reg/{u_name}_{u_email}_{u_pass}")
def register_user(u_name,u_email,u_pass, db: dp_dependency):
    email = db.query(models.User).where(models.User.email == u_email).first()
    db_user = models.User(
        id = uuid.uuid4(),
        username=u_name,
        email=u_email,
        hashed_password=u_pass
        )
    if not email:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    else:
        raise HTTPException(status_code=409, detail="Email already exists")
    return {"id": db_user.id, "username": db_user.username}

@app.post("/like/{u_id}_{p_id}")
def like_post(u_id,p_id,db: dp_dependency):
    db_like = models.Likes(
        id = uuid.uuid4(),
        user_id = u_id,
        post_id = p_id
    )
    db.add(db_like)
    db.commit()
    db.refresh(db_like)
    return db_like

@app.post("/comment/{u_id}_{p_id}_{comment}")
def comment_post(u_id,p_id,comm,db: dp_dependency):
    db_comment = models.Comments(
        id = uuid.uuid4(),
        post_id = p_id,
        comment = comm,
        user_id = u_id,
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

@app.post("/post")
def create_hw_post(post: HWCarPostBase,db: dp_dependency):
    db_hw_post = models.HWCarPost(
        id = uuid.uuid4(),
        userID = post.userID,
        username = post.username,
        image_url = post.image_url,
        model = post.model,
        year = post.year,
        type = post.type,
        series = post.series,
        color = post.color 
    )
    db.add(db_hw_post)
    db.commit()
    db.refresh(db_hw_post)
    return db_hw_post

@app.post("/add_post_to_collection/{p_id}_{coll_id}_{u_id}")
def add_hw_post_to_collection(p_id,coll_id,u_id,db: dp_dependency):
    coll_name = db.query(models.CollectionNames).where(models.CollectionNames.id == coll_id).first()
    db_post_collection = models.Collections(
        id = uuid.uuid4(),
        postID = p_id,
        collection_name = coll_name.collection_name,
        userID = u_id
    )
    db.add(db_post_collection)
    db.commit()
    db.refresh(db_post_collection)
    return db_post_collection

@app.post("/add_car_to_coll/{u_id}_{coll_name}_{p_id}")
def add_car_to_coll(u_id,coll_name,p_id,db: dp_dependency):

    collection = models.Collections(
        id = uuid.uuid4(),
        postID = p_id,
        userID = u_id,
        collection_name = coll_name
    )
    db.add(collection)
    db.commit()
    db.refresh(collection)
    return collection

@app.post("/create_collection/{u_id}_{name}")
def create_collection(u_id,name,db: dp_dependency):
    collection = models.CollectionNames(
        id = uuid.uuid4(),
        userID = u_id,
        collection_name = name
    )
    db.add(collection)
    db.commit()
    db.refresh(collection)
    return collection

@app.post("/change_collection/{id}_{new_name}")
def change_collection(id,new_name,db:dp_dependency):
    collection = db.query(models.CollectionNames).where(models.CollectionNames.id == id).first()
    if collection is None:
        raise HTTPException(status_code=404, detail="Collection not found")
    new_coll = models.CollectionNames(
        id = collection.id,
        userID = collection.userID,
        collection_name = new_name
    )
    db.delete(collection)
    db.commit()
    db.add(new_coll)
    db.commit()
    db.refresh(new_coll)
    
    
    return {"message": f"Collection with ID {id} has been updated to {new_name}"}
        

##################
#  GET

@app.get("/user_exist/{email}_{password}")
def get_user(email,password,db: dp_dependency):
    hashed_password = password
    user = db.query(models.User).filter(models.User.email == email, models.User.hashed_password == hashed_password).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user.id, "username": user.username}

@app.get("/collections/")
def get_collections_by_user_id(db: dp_dependency):
    collections = db.query(models.Collections).where(models.Collections.user_id == "1").all()
    collection_names = [collection.collection_name for collection in collections]
    
    return collections

@app.get("/get_all_likes/{p_id}")
def get_all_likes(p_id,db: dp_dependency):
    likes = db.query(models.Likes).where(models.Likes.post_id == p_id).all()
    return likes

@app.get("/all_user_coll/{u_id}")
def get_all_collections_of_user(u_id,db:dp_dependency):
    collections = db.query(models.CollectionNames).where(models.CollectionNames.userID == u_id).all()
    return collections

@app.get("/all_car_posts")
def get_all_cars(db: dp_dependency):
    cars = db.query(models.HWCarPost).all()
    if len(cars) < 2:
        return {"error": "Not enough cars in the database to select two."}
    random_cars = random.sample(cars, len(cars)-1) 
    return random_cars

@app.get("/user_cars/{u_id}")
def get_user_cars(u_id,db:dp_dependency):
    cars = db.query(models.HWCarPost).where(models.HWCarPost.userID == u_id).all()
    return cars
@app.get("/get_collection/{coll_name}_{u_id}")
def get_all_cars_from_collection(coll_name,u_id,db:dp_dependency):
    cars = db.query(models.Collections).where(models.Collections.userID == u_id, models.Collections.collection_name == coll_name).all()
    cars_to_show = []
    for c in cars:
        temp = db.query(models.HWCarPost).where(models.HWCarPost.id == c.postID).first()
        cars_to_show.append(temp)
    return cars_to_show


####################
# DELETE
@app.delete("/delete_like/{i_id}_{p_id}")
def delete_like_with_user_post_id(u_id,p_id,db: dp_dependency):
    like = db.query(models.Likes).where(models.Likes.user_id == u_id,
                                        models.Likes.post_id == p_id).first()
    if not like:
        raise HTTPException(status_code=404, detail="Like not found")
    db.delete(like)
    db.commit()
    return {"detail": "Like deleted successfully"}

@app.delete("/delete_like/{id}")
def delete_like_with_id(id,db: dp_dependency):
    like = db.query(models.Likes).where(models.Likes.id == id).first()
    if not like:
        raise HTTPException(status_code=404, detail="Like not found")
    db.delete(like)
    db.commit()
    return {"detail": "Like deleted successfully"}

@app.delete("/delete_comment/{id}")
def delete_comment(id,db : dp_dependency):
    comment = db.query(models.Comments).where(models.Comments.id == id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Like not found")
    db.delete(comment)
    db.commit()
    return {"detail": "Comment deleted successfully"}


@app.delete("/delete_post/{p_id}")
def delete_post(p_id,db: dp_dependency):
    
    db_post = db.query(models.HWCarPost).filter(models.HWCarPost.id == p_id).first()
    if db_post:
        db.delete(db_post)
        db.commit()

        all_likes = db.query(models.Likes).filter(models.Likes.post_id == 1).all()
        all_comments = db.query(models.Comments).filter(models.Comments.post_id == 1).all()
        all_in_collections = db.query(models.Collections).filter(models.Collections.post_id == 1).all()

        likes_len = len(all_likes)
        comm_len = len(all_comments)
        all_col = len(all_in_collections)
        for like in all_likes:
            db.delete(like)
        db.commit()

        for comment in all_comments:
            db.delete(comment)
        db.commit()

        for collection in all_in_collections:
            db.delete(collection)
        db.commit()

    else:
        return {"detail": "Post not found"}, 404 #change to HTTP
    
    return {"detail": "Everything deleted successfully"}

@app.delete("/delete_car/{p_id}")
def delete_car(p_id, db:dp_dependency):
    db_post = db.query(models.HWCarPost).where(models.HWCarPost.id == p_id).first()
    if db_post:
        in_all_collections = db.query(models.Collections).where(models.Collections.postID == db_post.id).all()
        for car in in_all_collections:
            db.delete(car)
        db.commit()
    db.delete(db_post)
    db.commit()

    return {"deleted"}  
@app.delete("/delete_coll/{u_id}_{coll_id}")
def delete_collection(u_id,coll_id,db:dp_dependency):
    coll = db.query(models.CollectionNames).where(models.CollectionNames.id == coll_id).first()
    coll_name = coll.collection_name

    db.delete(coll)
    db.commit()

    all_coll_info = db.query(models.Collections).where(models.Collections.collection_name == coll_name and models.Collections.userID == u_id).all()
    for coll1 in all_coll_info:
            db.delete(coll1)
    db.commit()

    return {"ok"}

@app.delete("/delete_car_from_coll/{p_id}_{u_id}_{coll_name}")
def delete_car_from_coll(p_id,u_id,coll_name,db:dp_dependency):
    row = db.query(models.Collections).where(models.Collections.collection_name == coll_name,models.Collections.userID == u_id,models.Collections.postID == p_id).first()
    db.delete(row)
    db.commit()
    return row