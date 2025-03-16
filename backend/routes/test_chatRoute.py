import datetime
import pytest
from routes.chatRoute import *


<<<<<<< HEAD
def chat(modelName: str) -> Chat:

    return Chat(
        id="",
        modelName=modelName,
=======
def chat(id: str):

    return Chat(
        id=id,
        modelName="test",
>>>>>>> a451b32 (test: added tests for backend)
        name="test",
        date="20.01.2000",
        isFavourite=False,
        convo=[
            Convo(content="test", role="system"),
            Convo(content="test", role="user"),
        ],
    )


def test_createChat():
    response = createChat(chat("test1"))
    response = createChat(chat("test2"))

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_getAllChats():
    response = getAllChats()
<<<<<<< HEAD
    print(response.data[0])

    assert response.success is True
    assert response.data[0]["modelName"] == "test1"
    assert response.data[1]["modelName"] == "test2"
=======

    assert response.success is True
    assert response.data[0]["id"] == "test1"
    assert response.data[1]["id"] == "test2"
>>>>>>> a451b32 (test: added tests for backend)
    assert response.error is None


def test_deleteChat():
<<<<<<< HEAD
    allChats = getAllChats().data
    response = deleteChat(allChats[0]["id"])
=======
    response = deleteChat("test1")
>>>>>>> a451b32 (test: added tests for backend)

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_getChatByID():
<<<<<<< HEAD
    allChats = getAllChats().data
    response = getChatByID(allChats[0]["id"])
=======
    response = getChatByID("test2")
>>>>>>> a451b32 (test: added tests for backend)

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_addConvo():
<<<<<<< HEAD
    allChats = getAllChats().data
    response = addConvo(Convo(content="test", role="test"), allChats[0]["id"])
=======
    response = addConvo(Convo(content="test", role="test"), "test2")
>>>>>>> a451b32 (test: added tests for backend)

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_changeFavourite():
<<<<<<< HEAD
    allChats = getAllChats().data
    response = changeFavourite(allChats[0]["id"])
=======
    response = changeFavourite("test2")
>>>>>>> a451b32 (test: added tests for backend)

    assert response.success is True
    assert response.data is None
    assert response.error is None


def test_deleteAllChats():
    response = deleteAllChats()

    assert response.success is True
<<<<<<< HEAD
    assert response.data is not None
=======
    assert response.data is None
>>>>>>> a451b32 (test: added tests for backend)
    assert response.error is None
