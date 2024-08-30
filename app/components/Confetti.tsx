'use client';

import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export const Confetti = () => {
    useEffect(() => {
        confetti();
    }, []);

    return null;
};
