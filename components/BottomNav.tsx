"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';

export default function BottomNav() {
    const pathname = usePathname();
    const { cart, wishlist } = useShop();

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistCount = wishlist.length;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] px-6 py-3 flex justify-between items-center z-40 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Link
                href="/shop"
                className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-widest transition-colors ${pathname === '/shop' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
                    }`}
            >
                <i className="fas fa-store text-lg mb-0.5"></i>
                <span>SHOP</span>
            </Link>

            <Link
                href="/wishlist"
                className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-widest transition-colors relative ${pathname === '/wishlist' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
                    }`}
            >
                <div className="relative">
                    <i className="far fa-heart text-lg mb-0.5"></i>
                    {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-[var(--color-accent)] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                            {wishlistCount}
                        </span>
                    )}
                </div>
                <span>WISHLIST</span>
            </Link>

            <Link
                href="/cart"
                className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-widest transition-colors relative ${pathname === '/cart' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
                    }`}
            >
                <div className="relative">
                    <i className="fas fa-shopping-bag text-lg mb-0.5"></i>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-[var(--color-primary)] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    )}
                </div>
                <span>CART</span>
            </Link>

            <Link
                href="/profile"
                className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-widest transition-colors ${pathname === '/profile' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
                    }`}
            >
                <i className="far fa-user text-lg mb-0.5"></i>
                <span>ACCOUNT</span>
            </Link>
        </nav>
    );
}
