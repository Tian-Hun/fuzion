module futune::treasury {
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::coin::{Self, Coin};
    use sui::event;

    // ===== Events =====
    public struct DepositEvent has copy, drop {
        depositor: address,
        amount: u64,
    }

    // ===== Structs =====
    public struct Treasury has key {
        id: UID,
        balance: Balance<SUI>,
    }

    public struct TreasuryAdminCap has key, store {
        id: UID
    }

    // ===== Functions =====
    fun init(ctx: &mut TxContext) {
        let treasury = Treasury {
            id: object::new(ctx),
            balance: balance::zero(),
        };
        transfer::share_object(treasury);

        let admin_cap = TreasuryAdminCap {
            id: object::new(ctx)
        };
        transfer::transfer(admin_cap, ctx.sender());
    }

    public fun deposit(treasury: &mut Treasury, mut payment: Coin<SUI>, amount: u64, ctx: &mut TxContext): Coin<SUI> {
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
        coin::from_balance(treasury.balance.split(amount), ctx)
    }

    public fun balance(treasury: &Treasury): u64 {
        treasury.balance.value()
    }
}