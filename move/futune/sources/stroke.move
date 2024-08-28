module futune::stroke {
    use std::string::utf8;
    use sui::display;
    use sui::package;

    // ===== Structs =====
    public struct Stroke has key, store {
        id: UID,
        stroke_type: u8,
        font: u8,
    }

    // ===== One-Time Witness =====
    public struct STROKE has drop {}

    // ===== Functions =====
    fun init(witness: STROKE, ctx: &mut TxContext) {
        let keys = vector[
            utf8(b"name"),
            utf8(b"description"),
            utf8(b"image_url"),
        ];
        let values = vector[
            utf8(b"Fu Stroke #{stroke_type}"),
            utf8(b"A unique stroke from the Fu collection"),
            utf8(b"https://fuzion-sui.vercel.app/fu-strokes/{font}/{stroke_type}/svg"),
        ];
        let publisher = package::claim(witness, ctx);
        let mut display = display::new_with_fields<Stroke>(
            &publisher, keys, values, ctx
        );
        display::update_version(&mut display);
        transfer::public_transfer(publisher, ctx.sender());
        transfer::public_transfer(display, ctx.sender());
    }

    public(package) fun create(font: u8, stroke_type: u8, ctx: &mut TxContext): Stroke {
        Stroke {
            id: object::new(ctx),
            stroke_type,
            font,
        }
    }

    public fun stroke_type(stroke: &Stroke): u8 {
        stroke.stroke_type
    }

    public fun font(stroke: &Stroke): u8 {
        stroke.font
    }
}