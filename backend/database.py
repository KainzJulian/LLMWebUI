import os
from dotenv import find_dotenv, load_dotenv
import pymongo
import config

config.loadEnvironment()

client = pymongo.MongoClient(os.getenv("MONGO_URI"))
client._connect()

database = client[os.getenv("DATABASE_NAME")]
modelCollection = database[os.getenv("MODEL_COLLECTION")]
chatCollection = database[os.getenv("CHAT_COLLECTION")]

# model.insert_one({})
# chat.insert_one({})
