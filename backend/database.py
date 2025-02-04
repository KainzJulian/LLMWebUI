import pymongo

URI = "mongodb://127.0.0.1:27017"
client = pymongo.MongoClient(URI)
client._connect()

database = client["LLMDatabase"]
modelCollection = database["model"]
chatCollection = database["chat"]

# model.insert_one({})
# chat.insert_one({})


