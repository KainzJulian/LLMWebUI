from typing import BinaryIO
import uuid
from bson import ObjectId
from fastapi import APIRouter, File, HTTPException, UploadFile
from POJOs.fileData import FileData
from POJOs.response import Response
from POJOs.convo import Convo
from database import chatCollection, fs

fileRouter = APIRouter(prefix="/file")


@fileRouter.get("/{chatID}/names")
def getFilesNamesFromChat(chatID: str) -> Response:

    fileNames = chatCollection.find_one(
        {"_id": getIDFromString(chatID)}, {"_id": 0, "files": {"filename": 1}}
    )

    return Response(success=True, data=fileNames["files"])


@fileRouter.get("/{chatID}")
def getFilesFromChat(chatID: str) -> Response:

    nameList = []

    try:
        files = chatCollection.find_one(
            {"_id": getIDFromString(chatID)},
            {"_id": 0, "files": {"filename": 1, "contentType": 1, "id": 1, "size": 1}},
        )

        if files is None:
            return Response(success=True, data=None)

        for file in files["files"]:
            nameList.append(
                FileData(
                    id=file["id"],
                    filename=file["filename"],
                    contentType=file["contentType"],
                    size=file["size"],
                )
            )

    except Exception as e:
        return Response(success=False, error=str(e))

    return Response(success=True, data=nameList)


@fileRouter.post("test/{id}")
def getText(id: str) -> Response:

    gridOut = fs.open_download_stream_by_name(id)
    print(gridOut.read().decode())

    return Response(success=True, data="test")


@fileRouter.post("/upload/{chatID}")
async def uploadFile(chatID: str, file: UploadFile, fileID: str) -> Response:

    fileData = FileData(
        id=fileID,
        filename=file.filename,
        contentType=file.content_type,
        size=file.size,
    )

    try:
        chatCollection.update_one(
            {"_id": getIDFromString(chatID)},
            {"$push": {"files": fileData.model_dump()}},
        )

        # if file.content_type == "application/pdf":
        #     text = extractTextFromPDF(file.file)

        with fs.open_upload_stream(
            fileID,
            chunk_size_bytes=1048576,
            metadata={"contentType": file.content_type},
        ) as grid_in:

            # if file.content_type == "application/pdf":
            #     while chunk := await text.read(1024 * 1024):
            #         grid_in.write(chunk)
            #         print(f"Received chunk of size {len(chunk)} bytes")
            # else:
            while chunk := await file.read(1024 * 1024):

                print(f"Received chunk of size {len(chunk)} bytes")
                grid_in.write(chunk)

        return Response(success=True, data=fileData.id)

    except Exception as e:
        return Response(success=False, error=str(e))


def getIDFromString(id: str) -> ObjectId:
    try:
        return ObjectId(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid ID: " + id)


def extractTextFromPDF(pdf_data: BinaryIO) -> bytes:
    import pdfplumber

    pdf = pdfplumber.open(pdf_data)
    text = ""

    for page in pdf.pages:
        text += page.extract_text()

    return text.encode("utf-8")


def getDataFromFilesAsConvo(id: str) -> list | None:

    response = getFilesFromChat(id)

    if response.data is None:
        return None

    data = response.data

    chunk_size = 4096

    result = []

    for i in data:

        gridOut = fs.open_download_stream_by_name(i.id)
        decodedText = gridOut.read().decode("utf-8")

        for i in range(0, len(decodedText), chunk_size):
            chunk = decodedText[i : i + chunk_size]
            result.append(Convo(role="user", content=chunk))

    return result


@fileRouter.delete("/delete/{chatID}")
def deleteFile(chatID: str, fileID: str) -> Response:

    try:
        chatCollection.update_one(
            {"_id": getIDFromString(chatID)},
            {"$pull": {"files": {"id": fileID}}},
        )

        doc = fs.open_download_stream_by_name(fileID)
        fs.delete(doc._id)

        return Response(success=True, data=True)

    except Exception as e:
        return Response(success=False, error=str(e))
