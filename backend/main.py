from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from routes import *
import os

app = FastAPI()
print(os.getenv("DOCS_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

routes = [aiModelRouter, chatRouter, fileRouter]

for route in routes:
    app.include_router(route)
