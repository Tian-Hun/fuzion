module futune::treasury {
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::coin::{Self, Coin};
    use sui::event;

    // Package dependencies
    use futune::package::{version, check_version};

    // ===== Errors =====
    const EInsufficientBalance: u64 = 0;

    // ===== Events =====
    public struct DepositEvent has copy, drop {
        depositor: address,
        amount: u64,
    }

    // ===== Structs =====
    public struct Treasury has key {
        id: UID,
        balance: Balance<SUI>,
        version: u64,
    }

    public struct TreasuryAdminCap has key, store {
        id: UID
    }

    // ===== Functions =====
    fun init(ctx: &mut TxContext) {
        let treasury = Treasury {
            id: object::new(ctx),
            balance: balance::zero(),
            version: version(),
        };
        transfer::share_object(treasury);

        let admin_cap = TreasuryAdminCap {
            id: object::new(ctx)
        };
        transfer::transfer(admin_cap, ctx.sender());
    }

    public fun deposit(treasury: &mut Treasury, mut payment: Coin<SUI>, amount: u64, ctx: &mut TxContext): Coin<SUI> {
        check_version(treasury.version);

        let paid = payment.split(amount, ctx);
        treasury.balance.join(coin::into_balance(paid));

        // Emit a deposit event
        event::emit(DepositEvent {
            depositor: ctx.sender(),
            amount,
        });

        // Return the remaining payment
        payment
    }

    public fun withdraw(_: &TreasuryAdminCap, treasury: &mut Treasury, amount: u64, ctx: &mut TxContext): Coin<SUI> {
        check_version(treasury.version);
        assert!(treasury.balance.value() >= amount, EInsufficientBalance);
        coin::from_balance(treasury.balance.split(amount), ctx)
    }

    public fun balance(treasury: &Treasury): u64 {
        check_version(treasury.version);
        treasury.balance.value()
    }

    public(package) fun migrate(treasury: &mut Treasury) {
        treasury.version = version();
    }
}