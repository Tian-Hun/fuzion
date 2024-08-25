import { createNetworkConfig, NetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

// Config options for the networks you want to connect to
export const { networkConfig, useNetworkVariable, useNetworkVariables } = createNetworkConfig({
    localnet: {
        url: getFullnodeUrl('localnet'),
        variables: {
            packageId: process.env.NEXT_PUBLIC_LOCALNET_PACKAGE_ID,
            objectFuMinter: process.env.NEXT_PUBLIC_LOCALNET_OBJECT_FU_MINTER,
            objectDrawConfig: process.env.NEXT_PUBLIC_LOCALNET_OBJECT_DRAW_CONFIG,
            objectTreasury: process.env.NEXT_PUBLIC_LOCALNET_OBJECT_TREASURY,
        },
    },
    devnet: {
        url: getFullnodeUrl('devnet'),
        variables: {
            packageId: process.env.NEXT_PUBLIC_DEVNET_PACKAGE_ID,
            objectFuMinter: process.env.NEXT_PUBLIC_DEVNET_OBJECT_FU_MINTER,
            objectDrawConfig: process.env.NEXT_PUBLIC_DEVNET_OBJECT_DRAW_CONFIG,
            objectTreasury: process.env.NEXT_PUBLIC_DEVNET_OBJECT_TREASURY,
        },
    },
    testnet: {
        url: getFullnodeUrl('testnet'),
        variables: {
            packageId: process.env.NEXT_PUBLIC_TESTNET_PACKAGE_ID,
            objectFuMinter: process.env.NEXT_PUBLIC_TESTNET_OBJECT_FU_MINTER,
            objectDrawConfig: process.env.NEXT_PUBLIC_TESTNET_OBJECT_DRAW_CONFIG,
            objectTreasury: process.env.NEXT_PUBLIC_TESTNET_OBJECT_TREASURY,
        },
    },
    mainnet: {
        url: getFullnodeUrl('mainnet'),
        variables: {
            packageId: process.env.NEXT_PUBLIC_MAINNET_PACKAGE_ID,
            objectFuMinter: process.env.NEXT_PUBLIC_MAINNET_OBJECT_FU_MINTER,
            objectDrawConfig: process.env.NEXT_PUBLIC_MAINNET_OBJECT_DRAW_CONFIG,
            objectTreasury: process.env.NEXT_PUBLIC_MAINNET_OBJECT_TREASURY,
        },
    },
});
