from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import pymongo
from database import initDatabase

@asynccontextmanager
async def onStart():
    initDatabase()
    yield

app = FastAPI(lifespan=onStart())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular dev server URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

