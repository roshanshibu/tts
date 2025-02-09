"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./TtsInput.module.css";
import { tts_base64 } from "@/app/tts";

export default function TtsInput({ id, onDelete, speechRate, pitch }) {
  const [text, setText] = useState("");
  const [isTextChanged, setIsTextChanged] = useState(false);
  const [base64Audio, setBase64Audio] = useState("");
  const [isTTSLoading, setIsTTSLoading] = useState(false);
  const [isConfirmRemoveVisible, setIsConfirmRemoveVisible] = useState(false);
  const [voice, setVoice] = useState("ml-IN-SobhanaNeural");

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

  const handleVoiceChange = (option) => {
    let optionVoiceMap = {
      mal: "ml-IN-SobhanaNeural",
      eng1: "en-US-JennyNeural",
      eng2: "en-GB-RyanNeural",
      eng3: "en-AU-NatashaNeural",
      eng4: "en-US-SteffanNeural",
      ger1: "de-DE-ConradNeural",
      ger2: "de-DE-AmalaNeural",
    };
    setVoice(optionVoiceMap[option]);
  };

  useEffect(() => {
    console.log("voice changed!");
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
      {isTTSLoading ? (
        <p>Loading...</p>
      ) : (
        <audio
          controls="controls"
          src={`data:audio/mp3;base64,${base64Audio}`}
        />
      )}
      <div className={styles.footer}>
        <select onChange={(e) => handleVoiceChange(e.target.value)}>
          <option value="mal">Malayalam</option>
          <option value="eng1">English 1</option>
          <option value="eng2">English 2</option>
          <option value="eng3">English 3</option>
          <option value="eng4">English 4</option>
          <option value="ger1">German 1</option>
          <option value="ger2">German 2</option>
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
