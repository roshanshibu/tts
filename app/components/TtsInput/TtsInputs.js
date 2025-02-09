"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./TtsInput.module.css";
import { tts_base64 } from "@/app/tts";

export default function TtsInput({
  id,
  onDelete,
  speechRate,
  pitch,
  defaultVoice,
  setDefaultVoice,
}) {
  const [text, setText] = useState("");
  const [isTextChanged, setIsTextChanged] = useState(false);
  const [base64Audio, setBase64Audio] = useState("");
  const [isTTSLoading, setIsTTSLoading] = useState(false);
  const [isConfirmRemoveVisible, setIsConfirmRemoveVisible] = useState(false);
  const [voice, setVoice] = useState(defaultVoice);

  const removeConfirmContainerRef = useRef(null);

  const handleRemoveConfirmBlur = (e) => {
    if (!removeConfirmContainerRef.current.contains(e.relatedTarget)) {
      setIsConfirmRemoveVisible(false);
    }
  };

  const doTTS = (force = false) => {
    if (isTextChanged || (force && text.length > 0)) {
      setIsTTSLoading(true);
      tts_base64(text, speechRate, pitch, voice).then((b64aud) => {
        setIsTTSLoading(false);
        setBase64Audio(b64aud);
        setIsTextChanged(false);
      });
    }
  };

  const handleVoiceChange = (newVoice) => {
    setDefaultVoice(newVoice);
    setVoice(newVoice);
  };

  useEffect(() => {
    doTTS(true);
  }, [voice]);

  return (
    <div className={styles.ttsInputContainer}>
      <textarea
        name="Text1"
        rows="5"
        className={styles.textInput}
        value={text}
        onChange={(e) => {
          setIsTextChanged(true);
          setText(e.target.value);
        }}
        onBlur={doTTS}
      ></textarea>
      <div className={styles.audioContainer}>
        {isTTSLoading ? (
          <p>Loading...</p>
        ) : (
          <audio
            controls="controls"
            src={`data:audio/mp3;base64,${base64Audio}`}
          />
        )}
      </div>
      <div className={styles.footer}>
        <select
          onChange={(e) => {
            handleVoiceChange(e.target.value);
          }}
          value={voice}
        >
          <option value="en-US-JennyNeural">English 1</option>
          <option value="en-GB-RyanNeural">English 2</option>
          <option value="en-AU-NatashaNeural">English 3</option>
          <option value="en-US-SteffanNeural">English 4</option>
          <option value="ml-IN-SobhanaNeural">Malayalam</option>
          <option value="de-DE-ConradNeural">German 1</option>
          <option value="de-DE-AmalaNeural">German 2</option>
        </select>
        <div
          className={styles.removeConfirmContainer}
          ref={removeConfirmContainerRef}
          onBlur={handleRemoveConfirmBlur}
        >
          <button onClick={() => setIsConfirmRemoveVisible(true)}>
            Remove
          </button>
          {isConfirmRemoveVisible && (
            <button onClick={() => onDelete(id)}>Confirm</button>
          )}
        </div>
      </div>
    </div>
  );
}
