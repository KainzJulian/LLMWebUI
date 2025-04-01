from typing import Optional
from pydantic import BaseModel


class FileData(BaseModel):
    id: str
    filename: Optional[str]
    contentType: Optional[str] = None
    size: Optional[int] = None
