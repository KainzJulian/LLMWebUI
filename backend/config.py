import os
from dotenv import find_dotenv, load_dotenv


def loadEnvironment():
    load_dotenv(find_dotenv(".env"))

    ENV = os.getenv("CURRENT_ENVIRONMENT")

    if ENV == None:
        raise ValueError("No .env file found")

    found = load_dotenv(find_dotenv(f".env.{str(ENV)}"))

    if found == False:
        raise ValueError(f"No .env.{str(ENV)} file found")
