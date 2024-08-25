'use client';

import { createStyles } from "antd-style";

interface Props {
    className?: string;
}

export const MouseScroll: React.FC<Props> = ({ className }) => {
    const { styles } = useStyles();
    return (
        <div className={className}>
            <div className={styles.root} />
        </div>
    );
};

const useStyles = createStyles(({ css, prefixCls, cx }) => ({
    root: css`
        width: 50px;
        height: 90px;
        border: 3px solid #fff;
        border-radius: 60px;
        position: relative;

        &::before {
            content: '';
            width: 12px;
            height: 12px;
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #fff;
            border-radius: 50%;
            opacity: 1;
            animation: wheel 2s infinite;
        }

        @keyframes wheel {
            to {
                opacity: 0;
                top: 60px;
            }
        }
    `,
}));
