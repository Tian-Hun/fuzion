import { FuFont } from '@/components/types';
import type { StrokeMetadata } from './types';
import { StrokeCKTJGT1, StrokeCKTJGT2, StrokeCKTJGT3, StrokeCKTJGT4, StrokeCKTJGT5 } from './CKTJGT';
import { StrokeFPM1, StrokeFPM2, StrokeFPM3, StrokeFPM4, StrokeFPM5, StrokeFPM6 } from './FPM';
import { StrokePMZDCST1, StrokePMZDCST2, StrokePMZDCST3, StrokePMZDCST4, StrokePMZDCST5, StrokePMZDCST6, StrokePMZDCST7 } from './PMZDCST';
import { StrokeWDXLHYZ1, StrokeWDXLHYZ2, StrokeWDXLHYZ3, StrokeWDXLHYZ4, StrokeWDXLHYZ5 } from './WDXLHYZ';
import { StrokeWHZYKT1, StrokeWHZYKT2, StrokeWHZYKT3, StrokeWHZYKT4, StrokeWHZYKT5 } from './WHZYKT';
import { StrokeYFXY1, StrokeYFXY2, StrokeYFXY3, StrokeYFXY4, StrokeYFXY5, StrokeYFXY6, StrokeYFXY7 } from './YFXY';

interface FuStrokesProps {
    strokes: StrokeMetadata[];
}

const validFonts = [FuFont.CKTJGT, FuFont.FPM, FuFont.PMZDCST, FuFont.WDXLHYZ, FuFont.WHZYKT, FuFont.YFXY] as const;
type ValidFont = typeof validFonts[number];

const strokeComponents: Record<ValidFont, Record<number, React.ComponentType>> = {
    [FuFont.CKTJGT]: { 1: StrokeCKTJGT1, 2: StrokeCKTJGT2, 3: StrokeCKTJGT3, 4: StrokeCKTJGT4, 5: StrokeCKTJGT5 },
    [FuFont.FPM]: { 1: StrokeFPM1, 2: StrokeFPM2, 3: StrokeFPM3, 4: StrokeFPM4, 5: StrokeFPM5, 6: StrokeFPM6 },
    [FuFont.PMZDCST]: { 1: StrokePMZDCST1, 2: StrokePMZDCST2, 3: StrokePMZDCST3, 4: StrokePMZDCST4, 5: StrokePMZDCST5, 6: StrokePMZDCST6, 7: StrokePMZDCST7 },
    [FuFont.WDXLHYZ]: { 1: StrokeWDXLHYZ1, 2: StrokeWDXLHYZ2, 3: StrokeWDXLHYZ3, 4: StrokeWDXLHYZ4, 5: StrokeWDXLHYZ5 },
    [FuFont.WHZYKT]: { 1: StrokeWHZYKT1, 2: StrokeWHZYKT2, 3: StrokeWHZYKT3, 4: StrokeWHZYKT4, 5: StrokeWHZYKT5 },
    [FuFont.YFXY]: { 1: StrokeYFXY1, 2: StrokeYFXY2, 3: StrokeYFXY3, 4: StrokeYFXY4, 5: StrokeYFXY5, 6: StrokeYFXY6, 7: StrokeYFXY7 },
};

export const FuStrokes: React.FC<FuStrokesProps> = ({ strokes }) => {
    return (
        <>
            {strokes.map(({font, type}, index) => {
                const StrokeComponent = strokeComponents[font as ValidFont][type];

                return <StrokeComponent key={`${font}-${type}-${index}`} />;
            })}
        </>
    );
};
