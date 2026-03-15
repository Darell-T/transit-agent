from httpx import Response
from app.services.voice import generate_speech
from fastapi import APIRouter
from fastapi.responses import Response
import random

thinking_phrases = [
    "Consulting the MTA, as unreliable as that may be...",
    "One moment, sir. The subway requires patience even from me.",
    "Analyzing conditions. The MTA, as always, keeps things interesting.",
    "Processing. I assure you this will be faster than the F train.",
    "Give me a moment, sir. Even I have standards for accuracy."
]

router = APIRouter()

@router.post("/api/thinking")
async def thinking_audio():
    audio = generate_speech(random.choice(thinking_phrases))

    return Response(content=b"".join(audio), media_type="audio/mpeg")