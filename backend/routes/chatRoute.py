import json
import re
from bson import ObjectId
from fastapi import APIRouter, HTTPException
import ollama
from POJOs.chat import Chat
from POJOs.convo import Convo
from POJOs.response import Response
from POJOs.searchResult import SearchResult
from database import chatCollection

chatRouter = APIRouter(prefix="/chats")


@chatRouter.get("/")
def getAllChats() -> Response:

    chats = list(chatCollection.find({}))

    for chat in chats:
        chat["_id"] = str(chat["_id"])

    return Response(success=True, data=chats)


@chatRouter.delete("/")
def deleteAllChats():
    try:
        chatCollection.delete_many({"isArchived": False})
    except Exception as e:
        return Response(success=False, error=str(e))

    return Response(success=True, data=True)


@chatRouter.delete("/remove/{id}")
def deleteChat(id: str) -> Response:
    try:
        chatCollection.delete_one({"_id": getIDFromString(id)})
        return Response(success=True, data=True)

    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.get("/{id}")
def getChatByID(id: str) -> Response:
    try:
        document = chatCollection.find_one({"_id": getIDFromString(id)})

        if document is None:
            return Response(
                success=False, error="no document with the id {" + id + "} found"
            )
        return Response(success=True, data=document)
    except Exception as e:
        return Response(success=False, error=str(e))


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


@chatRouter.post("/switchFavourite/{id}")
def changeFavourite(id: str) -> Response:

    body = chatCollection.find_one({"id": id})

    try:

        chatCollection.update_one(
            {"_id": getIDFromString(id)},
            {"$set": {"isFavourite": not body["isFavourite"]}},
        )
        return Response(success=True)
    except Exception as e:
        return Response(success=False, error=str(e))


def getIDFromString(id: str) -> ObjectId:
    try:
        return ObjectId(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ID: " + id)


@chatRouter.post("/rename/{id}")
def changeName(name: str, id: str) -> Response:
    try:
        chatCollection.update_one(
            {"_id": getIDFromString(id)}, {"$set": {"name": name}}
        )
        return Response(success=True)
    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.post("/archive/{id}")
def archive(id: str) -> Response:
    try:
        chatCollection.update_one(
            {"_id": getIDFromString(id)}, {"$set": {"isArchived": True}}
        )

        return Response(success=True)
    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.get("/archive/all")
def getArchive() -> Response:
    try:

        archive = list(chatCollection.find({"isArchived": True}))

        for chat in archive:
            chat["_id"] = str(chat["_id"])

        return Response(success=True, data=archive)
    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.post("/dearchive/{id}")
def dearchive(id: str) -> Response:
    try:
        chatCollection.update_one(
            {"_id": getIDFromString(id)}, {"$set": {"isArchived": False}}
        )

        return Response(success=True)
    except Exception as e:
        return Response(success=False, error=str(e))


@chatRouter.get("/search/{text}")
def findChatsByText(text: str) -> Response:
    try:

        chatList: list[SearchResult] = []
        chats = chatCollection.aggregate(getSearchPipeline(text)).to_list()

        for chat in chats:
            for convo in chat["matchingContent"]:

                outputText = convo["content"]
                positions = [match.start() for match in re.finditer(text, outputText)]

                for i in positions:

                    if outputText[i - 50 : i + 50] == "":
                        continue

                    prepText = "..." + outputText[i - 50 : i + 50] + "..."

                    chatList.append(
                        SearchResult(
                            id=chat["id"],
                            modelName=chat["name"],
                            text=prepText,
                        )
                    )

        return Response(
            success=True,
            data=chatList,
        )
    except Exception as e:
        return Response(success=False, error=str(e))


def getSearchPipeline(text: str):
    return [
        {"$match": {"convo.content": {"$regex": f"{text}.*", "$options": "i"}}},
        {
            "$project": {
                "_id": 0,
                "id": 1,
                "content": 1,
                "name": 1,
                "matchingContent": {
                    "$filter": {
                        "input": "$convo",
                        "as": "item",
                        "cond": {
                            "$regexMatch": {
                                "input": "$$item.content",
                                "regex": f"{text}.*",
                                "options": "i",
                            }
                        },
                    }
                },
            }
        },
    ]
