import { NextRequest, NextResponse } from 'next/server';
import { FuCharacterImage } from '@/components/FuCharacterImage';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const ReactDOMServer = (await import('react-dom/server')).default;
    try {
        const SvgComponent = () => (
            <FuCharacterImage
                font={1}
                synthesized={false}
                strokes={[
                    { font: 1, type: 1 },
                    { font: 1, type: 5 },
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
