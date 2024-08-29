import { useSuiClientContext } from "@mysten/dapp-kit";
import { useToast } from "@/hooks/useToast";
import { Button, DropdownMenu } from "@radix-ui/themes";

export const NetworkSelector = () => {
    const { networks, network, selectNetwork } = useSuiClientContext();
    const { showToast } = useToast();

    const handleClick = () => {
        showToast('This is a success message');
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button radius="large" variant="outline" size="2">{network}</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {Object.keys(networks).map((network) => (
                    <DropdownMenu.Item key={network} onClick={() => selectNetwork(network)}>
                        {network}
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};
