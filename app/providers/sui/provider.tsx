'use client';

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { networkConfig } from "./config";

import "@mysten/dapp-kit/dist/index.css";

interface SuiProviderProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

export const SuiProvider: React.FC<SuiProviderProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
                <WalletProvider autoConnect>
                    {children}
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
};
