'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@mysten/dapp-kit';

export const NavigationBar: React.FC = () => {
    return (
        <nav
            className="fixed top-0 z-10 w-full flex flex-row place-content-center h-min px-64px py-24px"
        >
            <div className="container w-max flex flex-row gap-50px items-center place-content-center px-24px py-12px backdrop-blur-10px bg-#0D0D0D/10% c-white rd-12px">
                <Link href="/">
                    <div className="flex items-center gap-10px mr-100px">
                        <Image src="/logo.svg" alt="Logo" width="30" height="30" />
                        <span className="font-700 text-32px">FuZion</span>
                    </div>
                </Link>

                <Link href="/mint">Mint</Link>
                <Link href="/lucky-bag">Lucky Bag</Link>
                <Link href="/my-collection">My Collection</Link>
                <Link href="/rankings">Rankings →</Link>

                <ConnectButton />
            </div>
        </nav>
    );
};
