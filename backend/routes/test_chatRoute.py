import datetime
import pytest
from routes.chatRoute import *


def chat(id: str):

    return Chat(
        id=id,
        modelName="test",
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

    assert response.success is True
    assert response.data[0]["id"] == "test1"
    assert response.data[1]["id"] == "test2"
    assert response.error is None


def test_deleteChat():
    response = deleteChat("test1")

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_getChatByID():
    response = getChatByID("test2")

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_addConvo():
    response = addConvo(Convo(content="test", role="test"), "test2")

    assert response.success is True
    assert response.data is not None
    assert response.error is None


def test_changeFavourite():
    response = changeFavourite("test2")

    assert response.success is True
    assert response.data is None
    assert response.error is None


def test_deleteAllChats():
    response = deleteAllChats()

    assert response.success is True
    assert response.data is None
    assert response.error is None
