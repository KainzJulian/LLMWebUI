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
    return Response(success=True, data=list(chatCollection.find({})))


@chatRouter.delete("/")
def deleteAllChats():
    chatCollection.delete_many({})
    return Response(success=True)


@chatRouter.delete("/{id}")
def deleteChat(id: str) -> Response:

    print(id)

    try:
        deleted = chatCollection.delete_one({"id": id})
        print(deleted)
        return Response(success=True, data=deleted)

    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.get("/{id}")
def getChatByID(id: str) -> Response:
    document = chatCollection.find_one({"id": id})

    if document is None:
        return Response(
            success=False, error="no document with the id {" + id + "} found"
        )

    return Response(success=True, data=document)


@chatRouter.post("/new")
def createChat(chat: Chat) -> Response:
    try:
        insertedRow = chatCollection.insert_one(chat.model_dump())
        id = insertedRow.inserted_id

        chatCollection.update_one(
            {"_id": id},
            {"$set": {"id": str(chat.id)}},
        )

        return Response(success=True, data=insertedRow)

    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.post("/add/{id}")
def addConvo(convo: Convo, id: str) -> Response:

    updated = chatCollection.update_one(
        {"id": id},
        {"$push": {"convo": {"content": convo.content, "role": convo.role}}},
    )

    return Response(success=True, data=updated)


@chatRouter.post("/{id}/switchFavourite")
def changeFavourite(id: str) -> Response:

    body = chatCollection.find_one({"id": id})

    chatCollection.update_one(
        {"id": id}, {"$set": {"isFavourite": body["isFavourite"]}}
    )

    return Response(success=True)
