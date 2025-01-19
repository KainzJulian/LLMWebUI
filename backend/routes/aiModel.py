from fastapi import *

router = APIRouter(prefix="models")

@router.get("/")
def getModels():
  return "test"
