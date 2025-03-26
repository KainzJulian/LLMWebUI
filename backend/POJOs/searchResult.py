from pydantic import BaseModel
from POJOs.convo import Convo


class SearchResult(BaseModel):
    id: str
    modelName: str
    text: str
