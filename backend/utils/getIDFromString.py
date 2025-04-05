from bson import ObjectId
from fastapi import HTTPException


def getIDFromString(id: str) -> ObjectId:
    try:
        return ObjectId(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ID: " + id)
