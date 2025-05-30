import os
from dotenv import find_dotenv, load_dotenv
import gridfs
import pymongo
from config import loadEnvironment

loadEnvironment()

client = pymongo.MongoClient(os.getenv("MONGO_URI"))
client._connect()

database = client[os.getenv("DATABASE_NAME")]
modelCollection = database[os.getenv("MODEL_COLLECTION")]
chatCollection = database[os.getenv("CHAT_COLLECTION")]

fs = gridfs.GridFSBucket(database)
