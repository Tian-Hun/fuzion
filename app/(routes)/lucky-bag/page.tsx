'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { Card, Heading, Spinner, Text } from '@radix-ui/themes';
import { useCurrentAccount, useCurrentWallet, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { FuButton } from '@/components/FuButton';
import { useNetworkVariables } from '@/providers/sui/config';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';

interface LuckyBagPageProps {}

const LuckyBagPage: NextPage<LuckyBagPageProps> = ({}) => {
    const suiClient = useSuiClient();
    const account = useCurrentAccount();
    const sender = account?.address;
    const { packageId, objectDrawConfig, objectTreasury } = useNetworkVariables();
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

    const draw = async () => {
        if (loading || connectionStatus === 'disconnected') {
            return;
        }

        setLoading(true);

        const tx = new Transaction();

        const paymentAmount = 1_000_000_000n;

        const coins = await getCoins();
        const coinToUse = coins.data.find(coin => BigInt(coin.balance) >= paymentAmount);
        console.log(coinToUse);
        if (!coinToUse) {
            throw new Error('Insufficient balance');
        }

        const [paymentCoin] = tx.splitCoins(tx.object(coinToUse.coinObjectId), [paymentAmount]);

        tx.moveCall({
            target: `${packageId}::lucky_bag::draw_and_transfer`,
            arguments: [
                tx.object(objectDrawConfig!),
                tx.object(objectTreasury!),
                paymentCoin,
                tx.object('0x8'),
            ],
        });

        signAndExecuteTransaction(
            {
                transaction: tx,
            },
            {
                onSuccess: (data) => {
                    console.log('Mint success');
                    console.log(data);
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

    /**
   * Retrieves coin objects based on the specified coin type.
   * @param coinType - The coin type to retrieve coin objects for. Defaults to "0x2::sui::SUI".
   * @returns A Promise that resolves to the retrieved coin objects.
   */
    async function getCoins(coinType: any = "0x2::sui::SUI") {
        const coinAddress = coinType.address ? coinType.address : coinType;

        const coinDetails = await suiClient.getCoins({
            owner: sender!,
            coinType: coinAddress
        });
        return coinDetails;
    }

    return (
        <>
            <section className="container w-full flex flex-col gap-20px c-white px-50px pb-100px">
                <Heading size="7">Lucky Bag</Heading>
                <Heading size="3" mb="2">
                    Draw a Lucky Bag to get started.
                </Heading>
                <Card
                    variant="surface"
                    className="flex flex-col items-center justify-center gap-30px py-30px mb-20px"
                >
                    <Image src="/lucky-bag.png" alt="" width="300" height="300" />
                    <FuButton
                        className="w-280px h-60px"
                        onClick={draw}
                    >
                        <Spinner loading={loading} />
                        <Text>Draw Lucky Bag</Text>
                    </FuButton>
                    {connectionStatus === 'disconnected' && (
                        <Text>Please connect your wallet first</Text>
                    )}
                </Card>
            </section>
        </>
    );
};

export default LuckyBagPage;
