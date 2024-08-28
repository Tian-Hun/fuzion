import type { StrokeMetadata } from './fu-strokes/types';

import { FuFrame } from './fu-frames';
import { FuStrokes } from './fu-strokes';
import { FuFont } from './types';

interface FuCharacterImageProps {
    font: FuFont;
    synthesized: boolean;
    strokes: StrokeMetadata[];
}

export const FuCharacterImage: React.FC<FuCharacterImageProps> = ({ font, strokes, synthesized }) => {
    let fuCharacterImageContent: React.ReactNode = null;

    if (!synthesized) {
        fuCharacterImageContent = (
            <FuFrame font={font} color="red" />
        );
    }

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 3000 3000"
        >
            {fuCharacterImageContent}
            <FuStrokes strokes={strokes} />
        </svg>
    );
};
