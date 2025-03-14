from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline, TextStreamer
import torch
import os


class BaseService:
    def __init__(self, modelName: str, task: str, device: str = "cpu"):

        self.task = task
        self.model = modelName
        self.generator = None
        self.streamer = None
        self.device = device

        self.tokenizer = AutoTokenizer.from_pretrained(self.model)

    def generate(self, input) -> str:
        self.generator = pipeline(
            self.task, tokenizer=self.tokenizer, model=self.model, device=self.device
        )

        self.streamer = TextStreamer(self.tokenizer)

        output = self.generator(
            input, do_sample=False, return_full_text=True, streamer=self.streamer
        )

        return output

    def getStreamer(self):
        return self.streamer
