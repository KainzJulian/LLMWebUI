from transformers import (
    Pipeline,
    AutoModelForCausalLM,
    AutoTokenizer,
    pipeline,
    TextStreamer,
)
import torch
import os
from baseService import BaseService

modelPath = "./models/miniTester"

baseService = BaseService(modelPath, "text-generation")

prompt = [{"role": "user", "content": "How are you today?"}]

baseService.generate(prompt)

for word in baseService.getStreamer():
    print(word)


# tokenizer = AutoTokenizer.from_pretrained(modelPath)
# streamer = TextStreamer(tokenizer)

# generator = pipeline(
#     "text-generation",
#     tokenizer=tokenizer,
#     model=modelPath,
#     device="auto",
# )


# output = generator(prompt, do_sample=False, return_full_text=True, streamer=streamer)


# for word in streamer:
#     print(word)
