module futune::stroke {
    use std::string::utf8;
    use sui::display;
    use sui::package;
    use sui::random::{Random, new_generator};

    // ===== Constants =====
    const MAX_STROKES: u8 = 13;
    const MAX_FONTS: u8 = 5;

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
            utf8(b"Futune Stroke #{stroke_type}"),
            utf8(b"A unique stroke from the Futune collection"),
            utf8(b"https://example.com/stroke/{stroke_type}/{font}.png"),
        ];
        let publisher = package::claim(witness, ctx);
        let mut display = display::new_with_fields<Stroke>(
            &publisher, keys, values, ctx
        );
        display::update_version(&mut display);
        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(display, tx_context::sender(ctx));
    }

    public(package) fun create(random: &Random, ctx: &mut TxContext): Stroke {
        let mut generator = new_generator(random, ctx);
        let stroke_type = generator.generate_u8_in_range(1, MAX_STROKES);  // 1-5种字体样式
        let font = generator.generate_u8_in_range(1, MAX_FONTS);  // 1-13笔画索引

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