"use client";
import { useRef, useState } from "react";
import styles from "./TtsInput.module.css";
import { tts_base64 } from "@/app/tts";

export default function TtsInput({ id, onDelete, speechRate, pitch }) {
  const [text, setText] = useState("");
  const [isTextChanged, setIsTextChanged] = useState(false);
  const [base64Audio, setBase64Audio] = useState("");
  const [isTTSLoading, setIsTTSLoading] = useState(false);
  const [isConfirmRemoveVisible, setIsConfirmRemoveVisible] = useState(false);

  const removeConfirmContainerRef = useRef(null);

  const handleRemoveConfirmBlur = (e) => {
    if (!removeConfirmContainerRef.current.contains(e.relatedTarget)) {
      setIsConfirmRemoveVisible(false);
    }
  };

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
        onBlur={() => {
          if (isTextChanged) {
            setIsTTSLoading(true);
            tts_base64(text, speechRate, pitch).then((b64aud) => {
              setIsTTSLoading(false);
              setBase64Audio(b64aud);
              setIsTextChanged(false);
            });
          }
        }}
      ></textarea>
      {isTTSLoading ? (
        <p>Loading...</p>
      ) : (
        <audio
          controls="controls"
          src={`data:audio/mp3;base64,${base64Audio}`}
        />
      )}
      <div
        className={styles.removeConfirmContainer}
        ref={removeConfirmContainerRef}
        onBlur={handleRemoveConfirmBlur}
      >
        <button onClick={() => setIsConfirmRemoveVisible(true)}>Remove</button>
        {isConfirmRemoveVisible && (
          <button onClick={() => onDelete(id)}>Confirm</button>
        )}
      </div>
    </div>
  );
}
