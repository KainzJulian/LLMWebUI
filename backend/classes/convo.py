from sqlite3 import Date
from typing import Optional

from pydantic import BaseModel


class Convo(BaseModel):
  content: Optional[str]
  role: Optional[str]

class ConvoResponse(BaseModel):
  model: Optional[str]
  created_at: Optional[str]
  done_reason: Optional[str]
  done: Optional[bool]
  total_duration: Optional[int]
  response: Optional[Convo]

