"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WalletInfoType = {
  walletAdd: `0x${string}` | undefined;
  chain: string;
};

type walletContextProp = {
  connectedWalletAddressInfo: WalletInfoType;
  handleSetWalletAddressInfo: (data: WalletInfoType) => void;
};

const WalletInfo = createContext<walletContextProp | undefined>(undefined);

export const useWalletInfo = () => {
  const context = useContext(WalletInfo);
  if (!context) {
    throw new Error("useWalletInfo must be used within a WalletInfoProvider");
  }
  return context;
};

export const WalletInfoContext = ({ children }: any) => {
  const [connectedWalletAddressInfo, setConnectedWalletAddressInfo] =
    useState<WalletInfoType>({
      walletAdd: `0x${""}`,
      chain: "",
    });

  const handleSetWalletAddressInfo = (data: WalletInfoType) => {
    setConnectedWalletAddressInfo({
      walletAdd: data.walletAdd,
      chain: data.chain,
    });
  };

  useEffect(() => {
    console.log(connectedWalletAddressInfo);
  }, [connectedWalletAddressInfo]);

  return (
    <WalletInfo.Provider
      value={{ connectedWalletAddressInfo, handleSetWalletAddressInfo }}
    >
      {children}
    </WalletInfo.Provider>
  );
};
