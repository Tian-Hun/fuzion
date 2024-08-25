import { SuiProvider } from "./sui/provider";
import { RadixUIProvider } from "./radix-ui/provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <RadixUIProvider>
            <SuiProvider>
                {children}
            </SuiProvider>
        </RadixUIProvider>
    );
};
