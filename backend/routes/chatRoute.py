import json
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


@chatRouter.delete("/")
def deleteAllChats():
    chatCollection.delete_many({})


@chatRouter.delete("/{id}")
def deleteChat(id: str) -> bool:

    print(id)

    try:
        deleted = chatCollection.delete_one({"_id": getIDFromString(id)})
        print(deleted)
        return True

    except Exception as e:
        return False


@chatRouter.get("/{id}")
def getChatByID(id: str) -> Chat:
    document = chatCollection.find_one({"_id": getIDFromString(id)})

    if document is None:
        raise HTTPException(status_code=404, detail="no document found")

    return document


@chatRouter.post("/new")
def createChat(chat: Chat) -> str:
    try:
        id = chatCollection.insert_one(chat.model_dump()).inserted_id

        chatCollection.update_one(
            {"_id": id},
            {"$set": {"id": str(id)}},
        )

        return str(id)

    except Exception as e:
        raise HTTPException(
            status_code=404, detail="Error while creating new Chat: " + e
        )


@chatRouter.post("/add/{id}")
def addConvo(convo: Convo, id: str) -> bool:

    chatCollection.update_one(
        {"_id": getIDFromString(id)},
        {"$push": {"convo": {"content": convo.content, "role": convo.role}}},
    )

    return True


def getIDFromString(id: str) -> ObjectId:
    try:
        return ObjectId(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ID: " + id)
