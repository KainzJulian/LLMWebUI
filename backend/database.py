import pymongo

client = None

async def initDatabase():
   global client
   client = pymongo.MongoClient("mongodb://localhost:8080/")
