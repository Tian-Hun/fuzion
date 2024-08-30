import { NextPage } from 'next';
import Image from 'next/image';
import Spline from '@splinetool/react-spline/next';

import { MouseScroll } from '@/components/MouseScroll';
import { FuButton } from '@/components/FuButton';
import Link from 'next/link';

interface RootPageProps {}

const RootPage: NextPage<RootPageProps> = ({}) => {
    return (
        <>
            <main className="mt--120px">
                <section className="h-screen w-full relative flex justify-center">
                    <Spline
                        scene="https://prod.spline.design/TOLbRiRoJPyhIEtN/scene.splinecode"
                    />
                    <MouseScroll className="absolute bottom-20px" />
                </section>
                <section
                    className="w-full flex flex-col gap-150px items-center justify-center py-100px"
                    style={{ backgroundImage: 'linear-gradient(325deg, #130f40 0%, #070707 40%)'}}
                >
                    <Link href="/">
                        <FuButton className="w-260px h-80px">Mint Your 福</FuButton>
                    </Link>
                    <div className="container flex items-center justify-center gap-100px px-50px">
                        <div className="flex-1">
                            <h1 className="text-66px text-white font-bold">Gather A Hundred 福 (fú)</h1>
                            <p className="text-white mt-8 lh-relaxed text-28px">
                                The Chinese character &quot;福&quot; (fú) is a potent symbol of good fortune, happiness, and blessings. It encapsulates the ideals of prosperity and well-being, frequently associated with auspicious events and the pursuit of a fulfilling life.
                            </p>
                            <p className="text-white mt-8 lh-relaxed text-28px">
                                This character is commonly displayed during Chinese New Year as a symbol of seeking blessings of happiness, health, and prosperity in the year ahead.
                            </p>
                        </div>
                        <div className="w-500px h-500px overflow-visible relative">
                            <div className="absolute inset--50px">
                                <Spline scene="https://prod.spline.design/auNcNqDatcZiW1c0/scene.splinecode"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="w-full flex items-center justify-center"
                    style={{ backgroundImage: 'linear-gradient(90deg, #070707 30%, #130f40 100%)'}}
                >
                    <div className="container flex flex-col gap-150px items-center px-50px text-center">
                        <h2 className="c-white text-60px">Unveiling The 福 Journey</h2>
                        <div className="flex justify-between gap-80px">
                            <div className="flex-1 flex flex-col items-center">
                                <Image src="/fu-frame.svg" alt="" width="200" height="200" />
                                <h3 className="c-white text-32px mt-4">Start Your Collection</h3>
                                <p className="c-white text-20px mt-4 text-center">Begin your journey by collecting the 福 character in various forms and designs. Each piece is unique and carries its own blessings.</p>
                                <p className="c-white text-20px mt-4 text-center">福 characters in different styles will randomly appear. Mint one to receive a Fu character frame.</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <Image src="/lucky-bag.png" alt="" width="200" height="200" className="op-80" />
                                <h3 className="c-white text-32px mt-4">Lucky Bag Drawings</h3>
                                <p className="c-white text-20px mt-4 text-center">With your 福 frame, you can draw from Lucky Bags to obtain character strokes. Each bag contains a random assortment of stroke types and quantities.</p>
                                <div className="c-white text-20px mt-4 text-center">Collect all the strokes to complete your 福 character.</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <Image src="/fu-strokes.png" alt="" width="200" height="200" className="op-80" />
                                <h3 className="c-white text-32px mt-4">Craft Your Fu</h3>
                                <p className="c-white text-20px mt-4 text-center">Each Fu character consists of multiple strokes. Collect the right combination to complete your character and unlock the power of 福.</p>
                                <p className="c-white text-20px mt-4 text-center">Bringing good fortune and blessings to your digital realm!</p>
                            </div>
                        </div>
                        <div className="flex justify-between gap-80px">
                            <div className="flex-1 flex flex-col items-center">
                                <Image src="/sui-nft.svg" alt="" width="200" height="200" className="op-70" />
                                <h3 className="c-white text-32px mt-4">Surprise Bonus</h3>
                                <p className="c-white text-20px mt-4 text-center">Assemble all five distinct 福 characters to create a mysterious ultimate NFT!</p>
                                <p className="c-white text-20px mt-4 text-center">This exclusive NFT represents the pinnacle of your collection and is a testament to your dedication.</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <Image src="/share-joy.svg" alt="" width="200" height="200" />
                                <h3 className="c-white text-32px mt-4">Share the Joy</h3>
                                <p className="c-white text-20px mt-4 text-center">Display your collection of 福 characters in your digital wallet or on social media to share your blessings with others.</p>
                                <p className="c-white text-20px mt-4 text-center">You can even create custom lucky bags to share with your community. Spread good fortune and happiness to your friends and family!</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <Image src="/leaderboard.svg" alt="" width="200" height="200"/>
                                <h3 className="c-white text-32px mt-4">Climb the Leaderboard</h3>
                                <p className="c-white text-20px mt-4 text-center">Compete with other collectors to see who can complete their 福 characters first.</p>
                                <p className="c-white text-20px mt-4 text-center">Are you up for the challenge?</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="w-full flex flex-col items-center justify-center"
                    style={{ backgroundImage: 'linear-gradient(90deg, #070707 30%, #130f40 100%)'}}
                >
                    <div className="container flex flex-col items-center gap-50px py-200px px-50px">
                        <h2 className="c-white text-60px">The 福 Journey Continues</h2>
                        <p className="c-white text-30px mt-4 text-center">The 福 journey is just beginning. Stay tuned for future updates and events that will expand your collection and bring new blessings to your life.</p>
                        <p className="c-white text-30px mt-4 text-center">May your collection of 福 characters grow and your blessings multiply!</p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default RootPage;
