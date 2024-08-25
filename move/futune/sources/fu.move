module futune::fu {
    use std::string::{String ,utf8};
    use sui::package;
    use sui::display;
    use sui::event;
    use sui::object_table::{Self, ObjectTable};
    use sui::random::{Random, new_generator};
    use futune::stroke::{Self, Stroke};

    // ===== Constants =====
    const MAX_STROKES: u8 = 13;
    const MAX_FONTS: u8 = 5;

    // ===== Errors =====
    const EInvalidFont: u64 = 0;
    const EInvalidStroke: u64 = 1;
    const EFuAlreadyComplete: u64 = 2;
    const EFuNotComplete: u64 = 3;

    // ===== Events =====
    public struct FuMintedEvent has copy, drop {
        fu_id: ID,
        nft_id: u64,
        name: String,
        font: u8,
        minter: address,
    }

    // ===== Structs =====
    public struct FU has drop {}

    public struct FuCharacter has key, store {
        id: UID,
        nft_id: u64,
        name: String,
        font: u8,
        strokes: ObjectTable<u8, Stroke>,
        synthesized: bool,
    }

    public struct FuMinter has key {
        id: UID,
        counter: u64,
    }

    // ===== Functions =====
    fun init(witness: FU, ctx: &mut TxContext) {
        let keys = vector[
            utf8(b"name"),
            utf8(b"link"),
            utf8(b"image_url"),
            utf8(b"description"),
            utf8(b"project_url"),
            utf8(b"creator"),
        ];

        let values = vector[
            utf8(b"{name} #{nft_id}"),
            utf8(b"https://example.com/fu/{id}"),
            utf8(b"https://example.com/fu/{id}.png"),
            utf8(b"A customizable Fu character NFT with different fonts"),
            utf8(b"https://example.com"),
            utf8(b"Fu Character Team"),
        ];

        let publisher = package::claim(witness, ctx);

        let mut display = display::new_with_fields<FuCharacter>(
            &publisher, keys, values, ctx
        );

        display::update_version(&mut display);

        transfer::public_transfer(publisher, ctx.sender());
        transfer::public_transfer(display, ctx.sender());

        transfer::share_object(FuMinter {
            id: object::new(ctx),
            counter: 0,
        });
    }

    entry fun mint_to_sender(minter: &mut FuMinter, random: &Random, ctx: &mut TxContext) {
        let id = object::new(ctx);
        minter.counter = minter.counter + 1;

        let mut generator = new_generator(random, ctx);
        let font = generator.generate_u8_in_range(1, MAX_FONTS);
        let nft_id = minter.counter;
        // Generate a default name for the FuCharacter
        let name = utf8(b"Fu Character");

        let fu = FuCharacter {
            id,
            nft_id,
            name,
            font,
            strokes: object_table::new(ctx),
            synthesized: false,
        };

        // Emit the FuMintedEvent
        event::emit(FuMintedEvent {
            fu_id: object::uid_to_inner(&fu.id),
            nft_id,
            name,
            font,
            minter: ctx.sender(),
        });

        transfer::transfer(fu, ctx.sender());
    }

    public fun add_stroke(fu: &mut FuCharacter, stroke: Stroke) {
        assert!(!is_complete(fu), EFuAlreadyComplete);
        assert!(fu.font == stroke::font(&stroke), EInvalidFont);

        let stroke_type = stroke::stroke_type(&stroke);
        assert!(!object_table::contains(&fu.strokes, stroke_type), EInvalidStroke);

        fu.strokes.add(stroke_type, stroke);
    }

    public entry fun remove_stroke(fu: &mut FuCharacter, stroke_type: u8, ctx: &mut TxContext) {
        assert!(!is_complete(fu), EFuAlreadyComplete);
        assert!(object_table::contains(&fu.strokes, stroke_type), EInvalidStroke);
        let stroke = fu.strokes.remove(stroke_type);
        transfer::public_transfer(stroke, ctx.sender());
    }

    public entry fun synthesize(fu: &mut FuCharacter) {
        assert!(is_complete(fu), EFuNotComplete);

        // Transfer all strokes to the Fu character owner
        let mut i: u8 = 1;
        while (i <= MAX_STROKES) {
            let stroke= fu.strokes.remove(i);
            transfer::public_transfer(stroke, object::uid_to_address(&fu.id));
            i = i + 1;
        };

        fu.synthesized = true;
    }

    public fun is_complete(fu: &FuCharacter): bool {
        fu.strokes.length() == (MAX_STROKES as u64)
    }

    // ===== Public view functions =====
    public fun font(fu: &FuCharacter): u8 {
        fu.font
    }

    public fun name(fu: &FuCharacter): &String {
        &fu.name
    }

    public fun stroke_count(fu: &FuCharacter): u64 {
        fu.strokes.length()
    }
}