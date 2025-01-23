
from sqlite3 import Date
from typing import Optional
from pydantic import BaseModel

from classes.convo import Convo


class Chat(BaseModel):
   name: Optional[str]
   convo: Optional[Convo]
   date: Optional[str]
   modelName: Optional[str]
