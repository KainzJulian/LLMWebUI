from typing import BinaryIO
from fastapi import APIRouter, UploadFile
from POJOs import *
from utils import getIDFromString
from database import chatCollection, fs

fileRouter = APIRouter(prefix="/chats")


@fileRouter.get("/{id}/names")
def getFileNamesFromChat(id: str) -> Response:

    fileNames = chatCollection.find_one(
        {"_id": getIDFromString(id)}, {"_id": 0, "files": {"filename": 1}}
    )

    return Response(success=True, data=fileNames["files"])


@fileRouter.get("/{id}/files")
def getFilesFromChat(id: str) -> Response:

    nameList = []

    try:
        files = chatCollection.find_one(
            {"_id": getIDFromString(id)},
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


@fileRouter.post("/{id}/upload")
async def uploadFile(id: str, file: UploadFile, fileID: str) -> Response:

    fileData = FileData(
        id=fileID,
        filename=file.filename,
        contentType=file.content_type,
        size=file.size,
    )

    try:
        chatCollection.update_one(
            {"_id": getIDFromString(id)},
            {"$push": {"files": fileData.model_dump()}},
        )

        with fs.open_upload_stream(
            fileID,
            chunk_size_bytes=1048576,
            metadata={"contentType": file.content_type},
        ) as grid_in:

            match file.content_type:
                case "application/pdf":
                    text = extractTextFromPDF(file.file)

                    for i in range(0, len(text), grid_in.chunk_size):
                        chunk = text[i : i + grid_in.chunk_size]
                        grid_in.write(chunk)
                case _:
                    while chunk := await file.read(1024 * 1024):

                        print(f"Received chunk of size {len(chunk)} bytes")
                        grid_in.write(chunk)

        return Response(success=True, data=fileData.id)

    except Exception as e:
        return Response(success=False, error=str(e))


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
        text = gridOut.read()

        for i in range(0, len(text), chunk_size):
            chunk = text[i : i + chunk_size]
            result.append(Convo(role="user", content=chunk))

    return result


@fileRouter.delete("/{id}/delete")
def deleteFile(id: str, fileID: str) -> Response:

    try:
        chatCollection.update_one(
            {"_id": getIDFromString(id)},
            {"$pull": {"files": {"id": fileID}}},
        )

        doc = fs.open_download_stream_by_name(fileID)
        fs.delete(doc._id)

        return Response(success=True, data=True)

    except Exception as e:
        return Response(success=False, error=str(e))
