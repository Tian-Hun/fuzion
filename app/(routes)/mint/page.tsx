'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, Heading, Spinner, Strong, Text } from '@radix-ui/themes';
import { Transaction } from "@mysten/sui/transactions";
import {
    useCurrentWallet,
    useSignAndExecuteTransaction,
    useSuiClient,
} from "@mysten/dapp-kit";

import { FuButton } from '@/components/FuButton';
import { useNetworkVariables } from '@/providers/sui/config';

interface MintPageProps {}

const MintPage: NextPage<MintPageProps> = ({}) => {
    const router = useRouter();
    const suiClient = useSuiClient();
    const { packageId, objectFuMinter } = useNetworkVariables();
    const { connectionStatus } = useCurrentWallet();
    const [loading, setLoading] = useState(false);

    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
        async execute({ bytes, signature }) {
            return await suiClient.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                    // Raw effects are required so the effects can be reported back to the wallet
                    showRawEffects: true,
                    showEffects: true,
                }
            });
        },
    });

    const mint = () => {
        if (loading || connectionStatus === 'disconnected') {
            return;
        }

        setLoading(true);

        const tx = new Transaction();

        tx.moveCall({
            target: `${packageId}::fu::mint_to_sender`,
            arguments: [tx.object(objectFuMinter!), tx.object('0x8')]
        });

        signAndExecuteTransaction(
            {
                transaction: tx,
            },
            {
                onSuccess: (data) => {
                    console.log('Mint success');
                    console.log(data);
                    const objectId = data.effects?.created?.[0]?.reference.objectId;
                    if (objectId) {
                        router.push(`/my-collection?id=${objectId}`);
                    }
                },
                onError: (error) => {
                    console.log(`Error: ${error}`);
                },
                onSettled: () => {
                    setLoading(false);
                },
            }
        );
    };

    return (
        <>
            <section className="container flex gap-80px c-white px-50px pb-100px">
                <div className="flex-1">
                    <h1 className="text-4xl font-bold">Mint Your 福 Character NFT</h1>
                    <p className="text-lg mt-4">
                            Embrace Fortune and Blessings in the Digital Realm
                    </p>
                    <h3>Minting Information</h3>
                    <p className="text-lg mt-4">
                            Current Mint Price: Free
                    </p>
                    <p className="text-lg mt-4">
                            Total Supply: 10,000
                    </p>
                    <p className="text-lg mt-4">
                            Minted: 0
                    </p>
                    <Heading className="my-20px">Overview</Heading>
                    <p className="text-16px lh-24px mt-4">
                            The 福  character is one of the most auspicious and widely recognized symbols in Chinese culture, embodying happiness, good fortune, and blessings. Our unique NFT collection allows you to own a piece of this rich cultural heritage in a modern, digital form.
                    </p>
                    <p className="text-16px lh-24px mt-4">
                            The character 福 represents the collective hope for prosperity, health, and harmony. In Chinese tradition, it's often displayed upside down, as the word for "upside down" (倒, dào) sounds similar to the word for "arrive" (到, dào), thus implying that good fortune has arrived or is coming.
                    </p>
                    <p className="text-16px lh-24px mt-4">
                            Each 福 NFT in our collection is a distinct rendition of this powerful symbol, created through a combination of traditional calligraphy styles and modern digital art techniques. By minting a 福 NFT, you're not just acquiring a digital asset, but also embracing a symbol of positivity and cultural significance.
                    </p>
                </div>
                <div className="w-500px flex flex-col gap-10px">
                    <Card
                        variant="surface"
                        className="flex flex-col items-center justify-center gap-30px py-30px mb-20px"
                    >
                        <Image src="/fu-frame.svg" alt="" width="400" height="400" />
                        <FuButton
                            className="w-180px h-60px"
                            onClick={mint}
                        >
                            <Spinner loading={loading} />
                                Mint Now
                        </FuButton>
                        {connectionStatus === 'disconnected' && (
                            <Text>Please connect your wallet first</Text>
                        )}
                    </Card>
                    <Strong className="text-center">
                            The style of the 福 character you receive upon minting is randomly generated, making each NFT unique and surprising!
                    </Strong>
                </div>
            </section>
        </>
    );
};

export default MintPage;
