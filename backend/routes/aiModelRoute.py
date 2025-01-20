from typing import Optional, Sequence
from fastapi import *
import ollama

aiModelRouter = APIRouter(prefix="/models")

@aiModelRouter.get("/")
def getModels() -> ollama.ProcessResponse:

  try:
    modelList = ollama.list()
    return modelList

  except ollama.ResponseError as e:
    print(e)

@aiModelRouter.post("/generate")
def generate(data:  Request) -> ollama.GenerateResponse:
  try:
    chunk = ollama.generate(data)
    return chunk
  except Exception as e:
    print(e)

class Request:
  model: Optional[str]
  messages: Optional[Sequence[str]]

