import { Theme } from '@radix-ui/themes';

import { ToastProvider } from './toast/provider';

export const RadixUIProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Theme appearance="dark">
            <ToastProvider>
                {children}
            </ToastProvider>
        </Theme>
    );
};
