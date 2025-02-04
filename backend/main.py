from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import pymongo
from routes import *


app = FastAPI()
print("http://127.0.0.1:8000/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

routes = [aiModelRouter, chatRouter, optionsRouter]

for route in routes:
  app.include_router(route)


