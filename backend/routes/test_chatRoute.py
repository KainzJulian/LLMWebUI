import datetime
import pytest
from routes.chatRoute import *


def chat(modelName: str, id: str) -> Chat:

    return Chat(
        id=id,
        modelName=modelName,
        name="test",
        date="20.01.2000",
        isFavourite=False,
        convo=[
            Convo(content="test", role="system"),
            Convo(content="testSearch", role="user"),
        ],
        isArchived=False,
        files=[],
    )


def test_createChat():
    response = createChat(chat("test1", "test1"))
    response = createChat(chat("test2", "test2"))

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_getAllChats():
    response = getAllChats()

    assert response.success is True
    assert response.data[0]["modelName"] == "test1"
    assert response.data[1]["modelName"] == "test2"
    assert response.error is None


def test_deleteChat():
    allChats = getAllChats().data
    response = deleteChat(allChats[0]["id"])

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_getChatByID():
    allChats = getAllChats().data
    response = getChatByID(allChats[0]["id"])

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_addConvo():
    allChats = getAllChats().data
    response = addConvo(Convo(content="test", role="test"), allChats[0]["id"])

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_changeFavourite():
    allChats = getAllChats().data
    response = changeFavourite(allChats[0]["id"])

    assert response.success is True
    assert response.data is None
    assert response.error is None


def test_changeName():
    allChats = getAllChats().data
    response = changeName(allChats[0]["id"], "newTest")

    assert response.success is True
    assert response.data is None
    assert response.error is None


def test_archive():
    allChats = getAllChats().data
    response = archive(allChats[0]["id"])

    assert response.success is True
    assert response.data is True
    assert response.error is None


def test_getArchive():
    response = getArchive()

    assert response.data[0]["name"] == "newTest"
    assert response.success is True
    assert response.error is None


def test_dearchive():
    allChats = getAllChats().data
    response = dearchive(allChats[0]["id"])

    assert response.success is True
    assert response.data is True
    assert response.error is None


def test_findChatsByText():
    allChats = getAllChats().data
    response = findChatsByText("testSearch")

    assert response.success is True
    assert response.data[0].id == allChats[0]["id"]
    assert response.data[0].text == "...testSearch..."
    assert response.error is None


def test_deleteAllChats():
    response = deleteAllChats()

    assert response.success is True
    assert response.data is not None
    assert response.error is None
