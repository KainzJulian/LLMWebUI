import asyncio
import json
from typing import Literal, Optional, Sequence
from bson import ObjectId
from fastapi import *
from fastapi.responses import StreamingResponse
import ollama
from pydantic import BaseModel
from database import client, modelCollection

from POJOs.model import Model, ModelDetails, buildModel
from POJOs.chat import Chat
from POJOs.convo import Convo

aiModelRouter = APIRouter(prefix="/models")


@aiModelRouter.post("/update")
def updateModels():
    try:

        models = ollama.list()

        for help in models.models:
            modelCollection.update_one(
                {"model": help.model},
                {"$set": buildModel(help).model_dump()},
                upsert=True,
            )

        return True

    except Exception as e:
        return e


@aiModelRouter.get("/{name}")
def getModelByName(name: str) -> Model:

    document = modelCollection.find_one({"model": name})

    if document is None:
        raise HTTPException(
            status_code=404, detail="no document found with name: " + name
        )

    return document


@aiModelRouter.get("")
def getModels() -> list[Model]:
    modelList = list()

    for modelItem in modelCollection.find({}):
        modelList.append(modelItem)

    return modelList


@aiModelRouter.post("/generate")
async def generate(convo: list[Convo], modelName: str):
    try:
        print(convo)
        print(modelName)

        return StreamingResponse(
            generateChatResponse(convo, modelName), media_type="text/plain"
        )

    except Exception as e:
        print(e)
        return e


async def generateChatResponse(convoList: list[Convo], modelName: str):
    message = []

    print(modelName)

    for convo in convoList:
        message.append({"role": convo.role, "content": convo.content})

    response: ollama.ChatResponse

    async for response in await ollama.AsyncClient().chat(
        modelName, message, stream=True
    ):
        print(response.message.content)
        yield response.message.content
