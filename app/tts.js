"use server";

import { EdgeTTS } from "@andresaya/edge-tts";

export async function tts_base64(input_text, speechRate, pitch, voice) {
  const tts = new EdgeTTS();

  await tts.synthesize(input_text, voice, {
    rate: `${speechRate}%`, // Speech rate (range: -100% to 100%)
    volume: "100%", // Speech volume (range: -100% to 100%)
    pitch: `${pitch}Hz`, // Voice pitch (range: -100Hz to 100Hz)
  });

  return tts.toBase64();
}
