from fastapi import APIRouter
import ollama

chatRouter = APIRouter(prefix="/chat")

@chatRouter.get("/generate")
async def get():
  return "test"
