
from sqlite3 import Date
from typing import Optional
import ollama
from pydantic import BaseModel

from classes.convo import Convo


class Chat(BaseModel):
   name: Optional[str]
   convo: Optional[list[Convo]]
   date: Optional[str]
   modelName: Optional[str]

   ollama.ChatResponse
