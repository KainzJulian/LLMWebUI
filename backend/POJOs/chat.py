from sqlite3 import Date
from typing import Optional
import ollama
from pydantic import BaseModel, Field

from POJOs.convo import Convo


class Chat(BaseModel):
    id: str
    modelName: str

    name: Optional[str]
    convo: Optional[list[Convo]]
    date: Optional[str]
    isFavourite: Optional[bool]
    isArchived: Optional[bool]
