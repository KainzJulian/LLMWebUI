from pydantic import BaseModel


class SearchResult(BaseModel):
    id: str
    modelName: str
    text: str
