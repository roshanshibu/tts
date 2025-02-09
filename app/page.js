"use client";
import { useState } from "react";
import TtsInput from "./components/TtsInput/TtsInputs";
import styles from "./page.module.css";

export default function Home() {
  const [inputs, setInputs] = useState([1]);
  const addInput = () => {
    let newKey = inputs.length > 0 ? inputs[inputs.length - 1] + 1 : 1;
    setInputs([...inputs, newKey]);
  };
  const removeInput = (deleteInput) => {
    setInputs(inputs.filter((input) => input !== deleteInput));
  };

  const [speechRate, setSpeechRate] = useState(20);
  const [pitch, setPitch] = useState(0);
  const [defaultVoice, setDefaultVoice] = useState("en-US-JennyNeural");

  return (
    <>
      <div className={styles.controlsContainer}>
        <div>
          <p>
            Speech rate
            <br />
            <span>-100% to 100%</span>
          </p>
          <input
            type="range"
            name="rate"
            min="-100"
            max="100"
            onChange={(e) => setSpeechRate(e.target.value)}
            value={speechRate}
          />
          <p>{speechRate}%</p>
        </div>
        <div>
          <p>
            Voice pitch
            <br />
            <span>-100Hz to 100Hz</span>
          </p>
          <input
            type="range"
            name="rate"
            min="-100"
            max="100"
            onChange={(e) => setPitch(e.target.value)}
            value={pitch}
          />
          <p>{pitch}Hz</p>
        </div>
      </div>

      <button
        onClick={() => {
          setSpeechRate(0);
          setPitch(0);
        }}
        className={styles.resetControlsButton}
      >
        Reset
      </button>
      <hr className={styles.hr} />

      {inputs.map((input) => (
        <TtsInput
          key={input}
          id={input}
          onDelete={removeInput}
          speechRate={speechRate}
          pitch={pitch}
          defaultVoice={defaultVoice}
          setDefaultVoice={setDefaultVoice}
        />
      ))}
      <button onClick={addInput}>Add</button>
    </>
  );
}
