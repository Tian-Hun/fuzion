module futune::fu {
    use std::string::{String ,utf8};
    use sui::package;
    use sui::display;
    use sui::event;
    use sui::object_table::{Self, ObjectTable};
    use sui::random::{Random, new_generator};
    use sui::table::{Self, Table};

    // Package dependencies
    use futune::stroke::{Self, Stroke};
    use futune::package::{version, check_version};

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
        required_strokes: u8,
    }

    public struct FuMinter has key {
        id: UID,
        counter: u64,
        version: u64,
    }

    public struct FuFontConfig has key {
        id: UID,
        max_fonts: u8,
        required_strokes_map: Table<u8, u8>,
        version: u64,
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
            utf8(b"https://fuzion-sui.vercel.app/my-collection/fu/{id}"),
            utf8(b"https://fuzion-sui.vercel.app/fu-characters/{id}/svg"),
            utf8(b"A customizable Fu character NFT with different fonts"),
            utf8(b"https://fuzion-sui.vercel.app"),
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
            version: version(),
        });

        let mut fu_font_config = FuFontConfig {
            id: object::new(ctx),
            max_fonts: 6,
            required_strokes_map: table::new(ctx),
            version: version(),
        };

        // Initialize the required strokes for each font
        fu_font_config.required_strokes_map.add(1, 5);
        fu_font_config.required_strokes_map.add(2, 6);
        fu_font_config.required_strokes_map.add(3, 7);
        fu_font_config.required_strokes_map.add(4, 5);
        fu_font_config.required_strokes_map.add(5, 5);
        fu_font_config.required_strokes_map.add(6, 7);

        transfer::share_object(fu_font_config);
    }

    entry fun mint_to_sender(minter: &mut FuMinter, font_config: &FuFontConfig, random: &Random, ctx: &mut TxContext) {
        // Check the version of the FuMinter
        check_version(minter.version);
        check_version(font_config.version);

        let id = object::new(ctx);
        minter.counter = minter.counter + 1;

        let mut generator = new_generator(random, ctx);
        let font = generator.generate_u8_in_range(1, font_config.max_fonts);
        let nft_id = minter.counter;
        // Generate a default name for the FuCharacter
        let name = utf8(b"Fu Character");
        // Get the required strokes for the font
        let required_strokes = *table::borrow(&font_config.required_strokes_map, font);

        let fu = FuCharacter {
            id,
            nft_id,
            name,
            font,
            strokes: object_table::new(ctx),
            synthesized: false,
            required_strokes,
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

    public entry fun add_stroke(fu: &mut FuCharacter, stroke: Stroke) {
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
        while (i <= fu.required_strokes) {
            let stroke= fu.strokes.remove(i);
            transfer::public_transfer(stroke, object::uid_to_address(&fu.id));
            i = i + 1;
        };

        fu.synthesized = true;
    }

    public fun is_complete(fu: &FuCharacter): bool {
        fu.strokes.length() == (fu.required_strokes as u64)
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

    public fun max_fonts(font_config: &FuFontConfig): u8 {
        font_config.max_fonts
    }

    public fun required_strokes(font_config: &FuFontConfig, font: u8, ): u8 {
        *table::borrow(&font_config.required_strokes_map, font)
    }

    public(package) fun migrate(
        fu_minter: &mut FuMinter,
        fu_font_config: &mut FuFontConfig,
    ) {
        fu_minter.version = version();
        fu_font_config.version = version();
    }
}