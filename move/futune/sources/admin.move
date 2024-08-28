module futune::admin {
    // Package dependencies
    use futune::package::{Self, PackageAdminCap};
    use futune::fu::{Self, FuMinter, FuFontConfig};
    use futune::treasury::{Self, Treasury, TreasuryAdminCap};
    use futune::lucky_bag::{Self, DrawConfig};

    // ===== Errors =====
    const EInsufficientBalance: u64 = 0;

    // ===== Admin Functions =====
    entry fun withdraw_from_treasury(
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

    entry fun set_draw_price(
        _: &TreasuryAdminCap,
        config: &mut DrawConfig,
        new_price: u64
    ) {
        lucky_bag::set_price(config, new_price);
    }

    // Function to view treasury balance (optional, for convenience)
    entry fun view_treasury_balance(treasury: &Treasury): u64 {
        treasury::balance(treasury)
    }

    entry fun migrate(
        _: &PackageAdminCap,
        draw_config: &mut DrawConfig,
        treasury: &mut Treasury,
        fu_minter: &mut FuMinter,
        fu_font_config: &mut FuFontConfig,
    ) {
        lucky_bag::migrate(draw_config);
        treasury::migrate(treasury);
        fu::migrate(fu_minter, fu_font_config);
        package::emit_migrate_event();
    }
}