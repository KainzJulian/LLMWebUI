
from sqlite3 import Date
from typing import Optional
import ollama
from pydantic import BaseModel, Field

from classes.convo import Convo


class Chat(BaseModel):
  modelID: str

  name: Optional[str]
  convo: Optional[list[Convo]]
  date: Optional[str]
