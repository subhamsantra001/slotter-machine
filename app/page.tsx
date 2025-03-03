"use client";

import { useState } from "react";
import SlotMachine from "../components/SlotMachine";
import WalletConnect from "../components/WalletConnect";
import { BsTwitterX } from "react-icons/bs";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  return (
    <main className="flex flex-col gap-20 items-center justify-center min-h-screen w-full relative">
      {/* <div className="bg-red-400 absolute h-full w-full z-10"></div> */}
      <img src="/succinctbg.png" className="absolute h-full w-full z-10" />
      {!walletConnected ? (
        <WalletConnect
          onWalletConnected={() => setWalletConnected(true)}
          setAccount={setAccount}
          account={account}
        />
      ) : (
        <SlotMachine account={account} />
      )}
      <div className="z-20">
        <p className="text-black font-semibold text-center text-2xl">
          Follow me if you like it
        </p>
        <div className="w-full flex items-center justify-center gap-5 text-black mt-2">
          <a
            href="https://x.com/DefidecoderS"
            target="_blank"
            className="text-2xl text-center"
          >
            <BsTwitterX />
          </a>
        </div>
      </div>
    </main>
  );
}
