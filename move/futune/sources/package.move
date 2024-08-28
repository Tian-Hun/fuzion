module futune::package {
    use sui::event;

    // ===== Constants =====
    const VERSION: u64 = 1;

    // ===== Errors =====
    const EWrongVersion: u64 = 0;

    // ===== Events =====
    public struct MigrateEvent has copy, drop {
        old_version: u64,
        new_version: u64,
    }

    // ===== Structs =====
    public struct PackageAdminCap has key, store {
        id: UID
    }

    // ===== Functions =====
    fun init(ctx: &mut TxContext) {
        let admin_cap = PackageAdminCap {
            id: object::new(ctx)
        };
        transfer::transfer(admin_cap, ctx.sender());
    }

    public fun version(): u64 {
        VERSION
    }

    public fun check_version(version: u64) {
        assert!(version == VERSION, EWrongVersion);
    }

    public(package) fun emit_migrate_event() {
        event::emit(MigrateEvent {
            old_version: VERSION - 1,
            new_version: VERSION,
        });
    }
}