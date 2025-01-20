import pymongo

client = None
URI = "mongodb://127.0.0.1:27017"

async def initDatabase():
  global client
  client = pymongo.MongoClient(URI)
  client._connect()
  print(client)
