import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

type Network = 'mainnet' | 'testnet' | 'devnet' | 'localnet';
const network: Network = process.env.DEFAULT_NETWORK as Network;
const rpcUrl = getFullnodeUrl(network);
const suiClient = new SuiClient({ url: rpcUrl });

export async function getObjectFields(id: string) {
    try {
        const { data, error } = await suiClient.getObject({
            id,
            options: {
                showContent: true,
                showOwner: true,
                showType: true,
            },
        });
        if (error) {
            throw new Error(error.code);
        }
        const fields = data?.content?.dataType === 'moveObject' ? data?.content?.fields as Record<string, any> : null;

        if (!fields) {
            throw new Error(`Failed to parse object data returned for ${id}`);
        }

        return fields;
    } catch (error) {
        throw error;
    }
}

export async function getFuCharacter(id: string) {
    try {
        const fields = await getObjectFields(id);

        await serializeTable(id);
        return {
            font: fields.font,
            synthesized: fields.synthesized,
            strokes: [],
        };
    } catch (error) {
        throw error;
    }
}

export async function getStroke(id: string) {
    try {
        const fields = await getObjectFields(id);

        return {
            font: fields.font,
            type: fields.type,
        };
    } catch (error) {
        throw error;
    }
}

export async function serializeTable(tableId: string) {
    try {
        const { data } = await suiClient.getDynamicFields({
            parentId: tableId,
        });
        console.log({data});
    } catch (error) {
        throw error;
    }
}
