"use client";
import { useState } from "react";
import TtsInput from "./components/TtsInput/TtsInputs";
import styles from "./page.module.css";

export default function Home() {
  const [inputs, setInputs] = useState([1]);
  const addInput = () => {
    setInputs([...inputs, inputs.length + 1]);
  };
  const removeInput = (deleteInput) => {
    setInputs(inputs.filter((input) => input !== deleteInput));
  };

  const [speechRate, setSpeechRate] = useState(0);
  const [pitch, setPitch] = useState(0);

  return (
    <>
      <div className={styles.controlsContainer}>
        <div>
          <p>Speech rate (range: -100% to 100%)</p>
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
          <p>Voice pitch (range: -100Hz to 100Hz)</p>
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
        <button
          onClick={() => {
            setSpeechRate(0);
            setPitch(0);
          }}
        >
          Reset
        </button>
      </div>

      {inputs.map((input) => (
        <TtsInput
          key={input}
          id={input}
          onDelete={removeInput}
          speechRate={speechRate}
          pitch={pitch}
        />
      ))}
      <button onClick={addInput}>Add</button>
    </>
  );
}
