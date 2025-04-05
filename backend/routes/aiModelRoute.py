from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import ollama
import database
from POJOs import *
from POJOs.model import buildModel
from routes.fileRoute import getDataFromFilesAsConvo
from routes.chatRoute import getChatByID

aiModelRouter = APIRouter(prefix="/models")


@aiModelRouter.get("")
def getModels() -> Response:

    try:
        modelList = getModelList()
    except Exception as e:
        return Response(success=False, error=str(e))

    return Response(success=True, data=modelList)


@aiModelRouter.get("/{name}")
def getModelByName(name: str) -> Response:

    document = database.modelCollection.find_one({"model": name})

    if document is None:
        return Response(
            success=False,
            error="no document with the name {" + name + "} found",
        )

    document["_id"] = str(document["_id"])

    return Response(success=True, data=document)


@aiModelRouter.post("/update")
def updateModels() -> Response:

    try:
        models = ollama.list()

        for help in models.models:
            database.modelCollection.update_one(
                {"model": help.model},
                {"$set": buildModel(help).model_dump()},
                upsert=True,
            )

        return Response(success=True, data=models, error=None)

    except Exception as e:
        return Response(success=False, data=None, error=str(e))


def getModelList():
    modelList = list()

    collection = database.modelCollection.find({})

    for modelItem in collection:
        modelItem["_id"] = str(modelItem["_id"])
        modelList.append(modelItem)

    return modelList


@aiModelRouter.post("/generate")
async def generate(convo: list[Convo], id: str) -> Response:

    result = getDataFromFilesAsConvo(id)
    name = getChatByID(id)

    if result is not None:
        convo = result + convo

    try:
        return StreamingResponse(
            generateChatResponse(convo, name.data["modelName"]), media_type="text/plain"
        )

    except Exception as e:
        print("hi")
        print(e)
        return Response(success=False, error=str(e))


async def generateChatResponse(convoList: list[Convo], modelName: str):
    message = []

    for convo in convoList:
        message.append({"role": convo.role, "content": convo.content})

    response: ollama.ChatResponse

    async for response in await ollama.AsyncClient().chat(
        modelName, message, stream=True
    ):
        yield response.message.content
