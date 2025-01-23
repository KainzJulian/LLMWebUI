import json
from typing import Optional, Sequence
from fastapi import *
import ollama
from pydantic import BaseModel
from database import client, modelCollection

from classes.model import Model, ModelDetails, buildModel
from classes.chat import Chat
from classes.convo import Convo

aiModelRouter = APIRouter(prefix="/models")

@aiModelRouter.post("/update")
def updateModels():
  try:

    models = ollama.list()

    for help in models.models:
      modelCollection.update_one({"model": help.model}, {"$set":buildModel(help).model_dump()}, upsert=True)

    return True

  except Exception as e:
    return e


@aiModelRouter.get("")
def getModels() -> list[Model]:
    modelList = list()

    for modelItem in modelCollection.find({}):
      modelList.append(modelItem)

    return modelList

@aiModelRouter.post("/generate")
def generate(currentChat: Chat, sessionMemory:bool) -> bool:
  try:
    print(currentChat)
  #   chunk = ollama.generate(data)
  #   return chunk
  #   print(e)
    return True
  except Exception as e:
    return False

