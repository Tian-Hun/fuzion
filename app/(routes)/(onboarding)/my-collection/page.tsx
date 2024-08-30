'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { Box, Card, Dialog, Grid, Heading, Link, Tabs } from '@radix-ui/themes';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { useNetworkVariable } from '@/providers/sui/config';

interface MyCollectionProps {}

const MyCollection: NextPage<MyCollectionProps> = ({}) => {
    const currentAccount = useCurrentAccount();
    const packageId = useNetworkVariable('packageId');
    console.log(packageId);

    const { data: fuCharactersData } = useSuiClientQuery('getOwnedObjects', {
        owner: currentAccount?.address as string,
        limit: 20,
        filter: {
            StructType: `${packageId}::fu::FuCharacter`,
        },
        options: {
            showDisplay: true,
            showType: true,
        },
    });

    const { data: strokesData } = useSuiClientQuery('getOwnedObjects', {
        owner: currentAccount?.address as string,
        limit: 20,
        filter: {
            StructType: `${packageId}::stroke::Stroke`,
        },
        options: {
            showDisplay: true,
        },
    });

    return (
        <>
            <section className="container w-full flex flex-col gap-20px c-white px-50px pb-100px">
                <Heading mb="2" size="7">My Collection</Heading>
                <Tabs.Root defaultValue="fu">
                    <Tabs.List>
                        <Tabs.Trigger value="fu" className="text-18px">福 Characters</Tabs.Trigger>
                        <Tabs.Trigger value="strokes" className="text-18px">Strokes</Tabs.Trigger>
                    </Tabs.List>
                    <Box pt="5">
                        <Tabs.Content value="fu">
                            {fuCharactersData?.data.length === 0 ? (
                                <div className="flex flex-col items-center pt-100px gap-50px">
                                    <Heading size="5" mb="2" className="text-center">
                                        Looks like you don&apos;t have any 福. <br />
                                        Head over to the mint page to get started.
                                    </Heading>
                                    <Link href="/mint" size="5">
                                        Mint Your First 福 Character
                                    </Link>
                                </div>
                            ) : (
                                <Grid columns="4" gap="3" width="auto">
                                    {fuCharactersData?.data.map(({ data }) => (
                                        <Card key={data?.objectId} variant="classic">
                                            <Image src={data?.display?.data?.image_url!} alt="" width="380" height="380" unoptimized />
                                            <Heading size="5" mt="10px">{data?.display?.data?.name}</Heading>
                                        </Card>
                                    ))}
                                </Grid>
                            )}
                        </Tabs.Content>
                        <Tabs.Content value="strokes">
                            {strokesData?.data.length === 0 ? (
                                <div className="flex flex-col items-center pt-100px gap-50px">
                                    <Heading size="5" mb="2" className="text-center">
                                        Looks like you don&apos;t have any strokes. <br />
                                        Head over to the lucky bag page to get started.
                                    </Heading>
                                    <Link href="/lucky-bag" size="5">
                                        Draw a Lucky Bag
                                    </Link>
                                </div>
                            ) : (
                                <Grid columns="4" gap="3" width="auto">
                                    {strokesData?.data.map(({ data }) => (
                                        <Card key={data?.objectId} variant="surface">
                                            <Image src={data?.display?.data?.image_url!} alt="" width="380" height="380" />
                                            <Heading size="5">{data?.display?.data?.name}</Heading>
                                        </Card>
                                    ))}
                                </Grid>
                            )}
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </section>
            <Dialog.Root open={false}>
                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Make changes to your profile.
                    </Dialog.Description>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default MyCollection;
