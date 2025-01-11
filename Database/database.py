from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


URL_DATABASE = "postgresql://postgres:1234@localhost:5432/HW_Catalogue"
engine = create_engine(URL_DATABASE)

session_local = sessionmaker(autoflush = False,autocommit = False,bind=engine)
Base = declarative_base()