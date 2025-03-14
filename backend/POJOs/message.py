class Message:
    role: str
    content: str
    images: list[str]


from pydantic import BaseModel


class Message(BaseModel):
    role: str
    content: str
