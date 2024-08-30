import { NextRequest, NextResponse } from 'next/server';
import { FuCharacterImage } from '@/components/FuCharacterImage';
import { getStroke } from '@/services/sui.service';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const ReactDOMServer = (await import('react-dom/server')).default;

    try {
        const stroke = await getStroke(params.id);

        const SvgComponent = () => (
            <FuCharacterImage
                font={stroke.font}
                synthesized={false}
                strokes={[
                    { font: stroke.font, type: stroke.type },
                ]}
            />
        );

        const svgString = ReactDOMServer.renderToStaticMarkup(<SvgComponent />);

        const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>${svgString}`;

        return new NextResponse(fullSvg, {
            status: 200,
            headers: {
                'Content-Type': 'image/svg+xml',
            },
        });
    } catch (e: any) {
        if (e.message.includes('404') || e.message === "deleted" || e.message === "notExists") {
            return new NextResponse(null, { status: 404 });
        }

        return new NextResponse(null, { status: 500 });
    }
}
