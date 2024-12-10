"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../../config";
import { WalletInfoContext } from "@/store/walletContext";

const queryClient = new QueryClient();
export function Providers({
  children,
  initialState,
}: Readonly<{
  children: React.ReactNode;
  initialState: any;
}>) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {/* <WalletInfoContext> */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      {/* </WalletInfoContext> */}
    </WagmiProvider>
  );
}
