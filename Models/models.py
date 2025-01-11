from sqlalchemy import Column, Integer, String, ForeignKey
from Database.database import Base,engine
import uuid
from sqlalchemy.dialects.postgresql import UUID

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema":"public"}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    email = Column(String)
    hashed_password = Column(String)

class HWCarPost(Base):
    __tablename__ = "hw_cars"
    __table_args__ = {"schema":"public"}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    #user_id = Column(String)
    userID = Column(UUID(as_uuid=True))
    username = Column(String) 
    image_url = Column(String)
    model = Column(String)
    year = Column(Integer)
    type = Column(String)
    series = Column(String)
    color = Column(String)
    

class Likes(Base):
    __tablename__ = "likes"
    __table_args__ = {"schema":"public"}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(Integer)
    user_id = Column(Integer)

class Collections(Base):
    __tablename__ = "collections"
    __table_args__ = {"schema":"public"}
    id = Column(UUID(as_uuid=True), primary_key=True,default=uuid.uuid4)
    #post_id = Column(UUID(as_uuid=True))
    postID = Column(UUID(as_uuid=True))
    collection_name = Column(String)
    #user_id = Column(String)
    userID = Column(UUID(as_uuid=True))

class CollectionNames(Base):
    __tablename__ = "collection_names"
    __table_args__ = {"schema":"public"}
    id = Column(UUID(as_uuid=True), primary_key=True,default=uuid.uuid4)
    userID = Column(UUID(as_uuid=True))
    collection_name = Column(String)
    
class Comments(Base):
    __tablename__ = "comments"
    __table_args__ = {"schema":"public"}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(Integer)
    comment = Column(String)
    user_id = Column(Integer)
    