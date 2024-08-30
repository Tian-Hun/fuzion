import { MoveStruct, SuiObjectResponse } from '@mysten/sui/client';
import { isValidSuiObjectId } from '@mysten/sui/utils';

export const useExtractSuiClientQueryData = () => {
    const getObjectId = (
        response: SuiObjectResponse | null | undefined,
    ) => {
        if (
            response == null ||
            response.data == null ||
            response.data?.objectId == null
        ) {
            return null;
        }

        const objectId = response.data.objectId;

        if (!isValidSuiObjectId(objectId)) {
            return null;
        }

        return objectId;
    };

    const getContentField = (
        response: SuiObjectResponse | null | undefined,
        field: string,
    ) => {
        if (
            response == null ||
            response.data == null ||
            response.data?.content == null
        ) {
            return null;
        }

        if (response.data.content?.dataType !== 'moveObject') {
            return null;
        }

        const content = response.data.content;

        if (content?.fields == null) {
            return null;
        }

        return (content.fields as Record<string, string | number | boolean | object>)[field];
    };

    const getDisplayField = <T extends MoveStruct, K extends keyof T>(
        response: SuiObjectResponse | null | undefined,
        field: string,
    ) => {
        if (
            response == null ||
            response.data == null ||
            response.data?.display == null
        ) {
            return null;
        }

        const display = response.data.display;

        if (display?.data == null) {
            return null;
        }
        return display.data[field];
    };

    return {
        getObjectId,
        getContentField,
        getDisplayField,
    };
};
