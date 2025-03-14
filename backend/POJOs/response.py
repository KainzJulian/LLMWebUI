from typing import Generic, TypeVar, Optional
from pydantic import BaseModel
from fastapi import FastAPI

T = TypeVar("T")


class Response(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None
    message: Optional[str] = None
