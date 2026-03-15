from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import os

client = ElevenLabs(
    api_key = os.getenv("ELEVENLABS_API_KEY")
)


def generate_speech(generator):
    audio_stream = client.text_to_speech.convert_as_stream(
    text = generator,
    voice_id = "ZL2cmWmK6zETVZ0oLnKb",
    model_id = "eleven_v3",
    output_format = "mp3_44100_128",
)
    return audio_stream