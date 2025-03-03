"use client";

import { useState } from "react";
import SlotMachine from "../components/SlotMachine";
import WalletConnect from "../components/WalletConnect";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  return (
    <main className="flex items-center justify-center min-h-screen w-full relative">
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
    </main>
  );
}
