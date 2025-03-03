"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({
  onWalletConnected,
  account,
  setAccount,
}: {
  onWalletConnected: () => void;
  account: string | null;
  setAccount: Dispatch<SetStateAction<string | null>>;
}) => {
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      setAccount(walletAddress);
      onWalletConnected();
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="z-20">
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
