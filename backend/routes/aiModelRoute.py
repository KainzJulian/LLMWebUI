from fastapi import *


aiModelRouter = APIRouter(prefix="/models")

@aiModelRouter.get("/")
def getModels():
  return "test"
