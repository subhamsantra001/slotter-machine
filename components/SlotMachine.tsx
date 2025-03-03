"use client";

import { useState } from "react";
import "./slotMachine.css";
import confetti from "canvas-confetti";

const symbols = ["🍓", "💎", "🦄"];
const winningCombination = ["💎", "💎", "💎"];

const SlotMachine = ({ account }: { account: string | null }) => {
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

  const shootRealisticCofetti = () => {
    const count = 200;
    const defaults = {
      origin: { x: 0.5, y: 0.5 },
    };

    function fire(particleRatio: number, opts: object) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
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
      shootRealisticCofetti();
    } else {
      setResultMessage(
        "❌ Better Luck Next Time! You have to get 💎 💎 💎 to win."
      );
      const failSound = new Audio("/fail.wav");
      failSound.play();
    }
  };

  return (
    <div className="slot-container p-10 py-8 bg-transparent [-webkit-box-shadow:1px_1px_10px_2px_#000,-1px_-1px_10px_2px_#b7b7b7] z-20 w-[500px] h-[400px]">
      {account && <p className="mb-1">Connected: {account}</p>}

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
