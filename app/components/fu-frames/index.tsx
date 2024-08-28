import { FuFont } from '@/components/types';
import type { FrameFontProps } from './types';
import { FontCKTJGT } from './FontCKTJGT';
import { FontFPM } from './FontFPM';
import { FontPMZDCST } from './FontPMZDCST';
import { FontWDXLHYZ } from './FontWDXLHYZ';
import { FontWHZYKT } from './FontWHZYKT';
import { FontYFXY } from './FontYFXY';

interface FuFrameProps {
    font: FuFont;
    color?: string;
}

const frames: Record<FuFont, React.FC<FrameFontProps>> = {
    [FuFont.CKTJGT]: FontCKTJGT,
    [FuFont.FPM]: FontFPM,
    [FuFont.PMZDCST]: FontPMZDCST,
    [FuFont.WDXLHYZ]: FontWDXLHYZ,
    [FuFont.WHZYKT]: FontWHZYKT,
    [FuFont.YFXY]: FontYFXY,
};

const createFrameFontComponent = (FontComponent: React.FC<FrameFontProps>, props: FrameFontProps) => {
    return <FontComponent {...props} />;
};

export const FuFrame: React.FC<FuFrameProps> = ({ font, color = 'currentColor' }) => {
    return createFrameFontComponent(frames[font], { color });
};
