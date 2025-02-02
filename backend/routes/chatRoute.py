from bson import ObjectId
from fastapi import APIRouter, HTTPException
import ollama
from classes.convo import Convo
from classes.chat import Chat
from database import chatCollection


chatRouter = APIRouter(prefix="/chats")

@chatRouter.get("/")
def getAllChats() -> list[Chat]:
  return chatCollection.find({})

@chatRouter.get("/{id}")
def getChatByID(id: str) -> Chat:
  try:
    objID = ObjectId(id)
  except Exception as e:
    raise HTTPException(status_code=400, detail="Invalid ID: " + id)

  document = chatCollection.find_one({"_id": objID})

  if document is None:
    raise HTTPException(status_code=404, detail="no document found")

  return document

@chatRouter.post("/new")
def createChat(chat: Chat) -> bool:
  try:
    chatCollection.insert_one(chat.model_dump())

  except Exception as e:
    raise HTTPException(status_code=404, detail="Error while creating new Chat: " + e)

  return True

@chatRouter.post("/add/{id}")
def addConvo(convo: Convo, id: str) -> bool:

  try:
    objID = ObjectId(id)
  except Exception as e:
    raise HTTPException(status_code=400, detail="Invalid Id Format ID: " + id)


  chatCollection.update_one({"_id":objID}, {"$push":{"convo":{"content": convo.content, "role": convo.role}}})

  return True


