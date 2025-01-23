from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import pymongo
from routes import *

routes = [aiModelRouter, chatRouter, optionsRouter]

app = FastAPI()

@app.on_event("startup")
def onStartup():
  print("Starting Server http://127.0.0.1:8000/docs")

for route in routes:
  app.include_router(route)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

