'use client';

import { createStyles } from "antd-style";

interface FuButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const FuButton: React.FC<FuButtonProps> = ({ className, children, onClick }) => {
    const { styles } = useStyles();

    return (
        <button
            className={`${styles.glowEffect} ${className} relative overflow-hidden text-white rounded-lg hover:scale-110 transition-transform duration-250`}
            onClick={onClick}
        >
            <span className="absolute inset-0 flex items-center justify-center z-10 text-26px">
                {children}
            </span>
            <div className={`${styles.fuBg} absolute inset-0 z-0`}></div>
        </button>
    );
};

const useStyles = createStyles(({ css, prefixCls, cx }) => ({
    glowEffect: css`
        cursor: pointer;
        filter: drop-shadow(2px 2px 5px rgba(255, 255, 255, 0.3));
    `,
    fuBg: css`
        background-image: url('/fu-bg.jpg');
        background-size: 200%;
        background-position: 0 0;
        animation: move-fu 10s linear infinite;

        @keyframes move-fu {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 900px 360px;
            }
        }
    `,
}));
