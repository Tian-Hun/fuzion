module futune::admin {
    use futune::treasury::{Self, Treasury, TreasuryAdminCap};
    use futune::lucky_bag::{Self, DrawConfig};

    // ===== Errors =====
    const EInsufficientBalance: u64 = 0;

    // ===== Admin Functions =====
    public entry fun withdraw_from_treasury(
        admin_cap: &TreasuryAdminCap,
        treasury: &mut Treasury,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        assert!(treasury::balance(treasury) >= amount, EInsufficientBalance);
        let withdrawn_coin = treasury::withdraw(admin_cap, treasury, amount, ctx);
        transfer::public_transfer(withdrawn_coin, recipient);
    }

    public entry fun set_draw_price(
        _: &TreasuryAdminCap,
        config: &mut DrawConfig,
        new_price: u64
    ) {
        lucky_bag::set_price(config, new_price);
    }

    // Function to view treasury balance (optional, for convenience)
    public entry fun view_treasury_balance(treasury: &Treasury): u64 {
        treasury::balance(treasury)
    }
}