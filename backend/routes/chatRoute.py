import json
from bson import ObjectId
from fastapi import APIRouter, HTTPException
import ollama
from POJOs.chat import Chat
from POJOs.convo import Convo
from POJOs.response import Response
from database import chatCollection

import pymongo

chatRouter = APIRouter(prefix="/chats")


@chatRouter.get("/")
def getAllChats() -> Response:

    chats = list(chatCollection.find({}))
    print(chats)

    for chat in chats:
        chat["_id"] = str(chat["_id"])

    return Response(success=True, data=chats)


@chatRouter.delete("/")
def deleteAllChats():
    try:
        chatCollection.delete_many({})
    except Exception as e:
        return Response(success=False, error=str(e))

    return Response(success=True, data=True)


@chatRouter.delete("/{id}")
def deleteChat(id: str) -> Response:

    print(id)

    try:
        chatCollection.delete_one({"_id": getIDFromString(id)})
        return Response(success=True, data=True)

    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.get("/{id}")
def getChatByID(id: str) -> Response:
    document = chatCollection.find_one({"_id": getIDFromString(id)})

    if document is None:
        return Response(
            success=False, error="no document with the id {" + id + "} found"
        )

    return Response(success=True, data=document)


@chatRouter.post("/new")
def createChat(chat: Chat) -> Response:
    try:
        id = chatCollection.insert_one(chat.model_dump()).inserted_id

        chatCollection.update_one(
            {"_id": id},
            {"$set": {"id": str(id)}},
        )

        return Response(success=True, data=str(id))

    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.post("/add/{id}")
def addConvo(convo: Convo, id: str) -> Response:

    try:
        chatCollection.update_one(
            {"_id": getIDFromString(id)},
            {"$push": {"convo": {"content": convo.content, "role": convo.role}}},
        )
    except Exception as e:
        return Response(success=False, error=str(e))

    return Response(success=True, data=True)


@chatRouter.post("/{id}/switchFavourite")
def changeFavourite(id: str) -> Response:

    body = chatCollection.find_one({"id": id})

    chatCollection.update_one(
        {"_id": getIDFromString(id)}, {"$set": {"isFavourite": not body["isFavourite"]}}
    )

    return Response(success=True)


def getIDFromString(id: str) -> ObjectId:
    try:
        return ObjectId(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ID: " + id)
