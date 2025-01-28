import json
from sqlite3 import Date
from typing import Optional

from bson import ObjectId
from ollama import ListResponse
import ollama
from pydantic import BaseModel, Field
import pymongo

class ModelDetails(BaseModel):
  parent_model: Optional[str] = ""
  format: Optional[str] = ""
  family: Optional[str] = ""
  families: Optional[list[str]] = []
  parameter_size: Optional[str] = ""
  quantization_level: Optional[str] = ""


class Model(BaseModel):
  model: Optional[str] = ""
  modified_at: Optional[str] = ""
  size: Optional[int] = 0
  digest: Optional[str] = ""
  details: Optional[ModelDetails] = ModelDetails()

def buildModel(data: ollama.ListResponse.Model) -> Model:
  return Model(model=data.model, name=data.model, modified_at=str(data.modified_at), size=data.size, digest=data.digest, details=ModelDetails(parent_model=data.details.parent_model, format=data.details.format, families=data.details.families, parameter_size=data.details.parameter_size, quantization_level=data.details.quantization_level))




