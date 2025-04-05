from typing import Optional
from pydantic import BaseModel
from POJOs.fileData import FileData
from POJOs.convo import Convo


class Chat(BaseModel):
    id: str
    modelName: str

    name: Optional[str]
    convo: Optional[list[Convo]]
    date: Optional[str]
    isFavourite: Optional[bool]
    isArchived: Optional[bool]

    files: Optional[list[FileData]]
