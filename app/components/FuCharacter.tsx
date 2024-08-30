'use client';

import Image from "next/image";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useExtractSuiClientQueryData } from '@/hooks/useExtractSuiClientQueryData';
import { useEffect } from "react";
import { Skeleton } from "@radix-ui/themes";

interface FuCharacterProps {
    objectId: string | null;
}

export const FuCharacter: React.FC<FuCharacterProps> = ({ objectId }) => {
    const { getDisplayField } = useExtractSuiClientQueryData();

    const { data, isFetching, isRefetching, isError, refetch } = useSuiClientQuery('getObject', {
        id: objectId || '',
        options: {
            showContent: true,
            showDisplay: true,
        },
    }, {
        enabled: !!objectId,
    });

    useEffect(() => {
        if (!isFetching && !isRefetching && data?.error && data?.error?.code === 'notExists') {
            refetch();
        }
    }, [data, isFetching, isRefetching, refetch]);

    if (isError) {
        return (
            <p>Error loading object</p>
        );
    }

    return (
        !isFetching && !isRefetching && !!data?.data ? (
            <div className="flex flex-col items-center">
                <Image src={getDisplayField(data, 'image_url') || ''} alt="" width={400} height={400} />
                <p>{getDisplayField(data, 'name')}</p>
            </div>
        ) : (
            <Skeleton width="400" height="400"/>
        )
    );
};
