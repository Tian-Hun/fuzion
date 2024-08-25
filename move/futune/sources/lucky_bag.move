module futune::lucky_bag {
    use sui::coin::{Coin};
    use sui::event;
    use sui::sui::SUI;
    use sui::random::{Random, new_generator};
    use futune::stroke::{Self, Stroke};
    use futune::treasury::{Self, Treasury};

    // ===== Errors =====
    const EInsufficientPayment: u64 = 0;

    // ===== Events =====
    public struct LuckyBagDrawnEvent has copy, drop {
        drawer: address,
        stroke_count: u8
    }

    // ===== Structs =====
    public struct DrawConfig has key {
        id: UID,
        price: u64,
    }

    // ===== Functions =====
    fun init(ctx: &mut TxContext) {
        let config = DrawConfig {
            id: object::new(ctx),
            price: 1000000000, // set the default price
        };
        transfer::share_object(config);
    }

    public(package) fun set_price(config: &mut DrawConfig, new_price: u64) {
        config.price = new_price;
    }

    fun draw(
        random: &Random,
        ctx: &mut TxContext
    ): vector<Stroke> {
        let mut generator = new_generator(random, ctx);
        let stroke_count = generator.generate_u8_in_range(1, 3);
        let mut strokes = vector::empty<Stroke>();

        let mut i = 0;
        while (i < stroke_count) {
            let stroke = stroke::create(random, ctx);
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
        treasury: &mut Treasury,
        payment: Coin<SUI>,
        random: &Random,
        ctx: &mut TxContext,
    ) {
        assert!(payment.value() >= config.price, EInsufficientPayment);

        let change = treasury::deposit(treasury, payment, config.price, ctx);
        transfer::public_transfer(change, ctx.sender());

        let mut strokes = draw(random, ctx);
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
}