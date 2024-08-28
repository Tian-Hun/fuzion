module futune::lucky_bag {
    use sui::coin::{Coin};
    use sui::event;
    use sui::sui::SUI;
    use sui::random::{Random, new_generator};

    // Package dependencies
    use futune::package::{version, check_version};
    use futune::fu::{Self, FuFontConfig};
    use futune::stroke::{Self, Stroke};
    use futune::treasury::{Self, Treasury};

    // ===== Errors =====
    const EInsufficientPayment: u64 = 0;

    // ===== Events =====
    public struct LuckyBagDrawnEvent has copy, drop {
        drawer: address,
        stroke_count: u8,
    }

    // ===== Structs =====
    public struct DrawConfig has key {
        id: UID,
        price: u64,
        version: u64,
    }

    // ===== Functions =====
    fun init(ctx: &mut TxContext) {
        let config = DrawConfig {
            id: object::new(ctx),
            price: 1000000000, // set the default price
            version: version(),
        };
        transfer::share_object(config);
    }

    public(package) fun set_price(config: &mut DrawConfig, new_price: u64) {
        check_version(config.version);

        config.price = new_price;
    }

    fun draw(
        fu_font_config: &FuFontConfig,
        random: &Random,
        ctx: &mut TxContext
    ): vector<Stroke> {
        let mut generator = new_generator(random, ctx);
        let stroke_count = generator.generate_u8_in_range(1, 3);
        let mut strokes = vector::empty<Stroke>();

        let max_fonts = fu::max_fonts(fu_font_config);
        let font = generator.generate_u8_in_range(1, max_fonts);
        let max_strokes = fu::required_strokes(fu_font_config, font);

        let mut generator = new_generator(random, ctx);
        let stroke_type = generator.generate_u8_in_range(1, max_strokes);

        let mut i = 0;
        while (i < stroke_count) {
            let stroke = stroke::create(font, stroke_type, ctx);
            vector::push_back(&mut strokes, stroke);
            i = i + 1;
        };

        event::emit(LuckyBagDrawnEvent {
            drawer: ctx.sender(),
            stroke_count
        });

        strokes
    }

    entry fun draw_and_transfer(
        config: &DrawConfig,
        font_config: &FuFontConfig,
        treasury: &mut Treasury,
        payment: Coin<SUI>,
        random: &Random,
        ctx: &mut TxContext,
    ) {
        check_version(config.version);
        assert!(payment.value() >= config.price, EInsufficientPayment);

        let change = treasury::deposit(treasury, payment, config.price, ctx);
        transfer::public_transfer(change, ctx.sender());

        let mut strokes = draw(font_config, random, ctx);
        let sender = ctx.sender();

        while (!vector::is_empty(&strokes)) {
            let stroke = vector::pop_back(&mut strokes);
            transfer::public_transfer(stroke, sender);
        };

        // Ensure the vector is empty before it goes out of scope
        vector::destroy_empty(strokes);
    }

    // ===== Public view functions =====
    public fun price(config: &DrawConfig): u64 {
        config.price
    }

    public(package) fun migrate(
        draw_config: &mut DrawConfig,
    ) {
        draw_config.version = version();
    }
}