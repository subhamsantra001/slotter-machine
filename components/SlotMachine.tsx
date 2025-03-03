"use client";

import { useState } from "react";
import "./slotMachine.css";

const symbols = ["🍓", "💎", "🦄"];
const winningCombination = ["💎", "💎", "💎"];

const SlotMachine = () => {
  const [reels, setReels] = useState(["🍓", "🍓", "🍓"]);
  const [starsEarned, setStarsEarned] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const shuffleReels = () => {
    return [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];
  };

  const spinReels = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResultMessage("");

    const spinSound = new Audio("/rolling.wav");
    spinSound.play();

    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
      setReels(shuffleReels()); // Shuffle symbols every 100ms
      shuffleCount++;

      if (shuffleCount >= 30) {
        clearInterval(shuffleInterval); // Stop shuffling after 15 times
        finalizeSpin();
      }
    }, 100);
  };

  const finalizeSpin = () => {
    const newReels = shuffleReels();
    setReels(newReels);
    setIsSpinning(false);

    if (JSON.stringify(newReels) === JSON.stringify(winningCombination)) {
      setStarsEarned(starsEarned + 10);
      setResultMessage("🎉 You Win 10 stars!");
      const winSound = new Audio("/jackpot.wav");
      winSound.play();
    } else {
      setResultMessage(
        "❌ Better Luck Next Time! You have to get 💎 💎 💎 to win."
      );
      const failSound = new Audio("/fail.wav");
      failSound.play();
    }
  };

  return (
    <div className="slot-container p-10 py-20 bg-transparent [-webkit-box-shadow:1px_1px_10px_2px_#000,-1px_-1px_10px_2px_#b7b7b7] z-20 w-[500px] h-[400px]">
      <h1>Slot Machine</h1>
      <p>Stars Earned: {starsEarned}</p>
      <div className="slot-machine">
        {reels.map((symbol, index) => (
          <div key={index} className="reel">
            {symbol}
          </div>
        ))}
      </div>
      <button onClick={spinReels} disabled={isSpinning}>
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      <p className="result-message text-xl">{resultMessage}</p>
    </div>
  );
};

export default SlotMachine;
