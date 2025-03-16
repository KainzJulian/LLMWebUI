from routes.aiModelRoute import *


def test_updateModels():
    response = updateModels()

    assert response.success is True
    assert response.error is None
    assert response.data is not None


def test_getModelByName():
    response = getModelByName("test2")

    assert response.success is False
    assert response.error == "no document with the name {test2} found"
    assert response.data is None


def test_getModels():
    response = getModels()

    assert response.success is True
    assert response.data is not None
    assert response.error is None
