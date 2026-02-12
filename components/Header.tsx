"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';
import SearchModal from '@/components/SearchModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const { cart, wishlist } = useShop();
    const { user } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (isAuthPage) return null;

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistCount = wishlist.length;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { label: 'Shop', href: '/shop' },
        { label: 'Skincare', href: '/shop?category=Skincare' },
        { label: 'Body', href: '/shop?category=Body' },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md py-3 border-[var(--color-border)]/50' : 'bg-transparent py-6 border-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="flex items-center justify-between">
                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--color-primary)]"
                            aria-label="Menu"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>

                        {/* Logo */}
                        <div className="flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 text-center">
                            <Link href="/" className="group block">
                                <h1 className={`font-heading font-bold tracking-tight transition-all duration-500 ${isScrolled ? 'text-2xl text-[var(--color-primary)]' : 'text-3xl lg:text-4xl text-[var(--color-primary)]'}`}>
                                    BEAUTY HUB
                                </h1>
                            </Link>
                        </div>

                        {/* Desktop Nav - Left Side */}
                        <nav className="hidden lg:flex items-center gap-10 absolute left-8 top-1/2 -translate-y-1/2">
                            {navLinks.slice(0, 3).map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-xs font-bold tracking-[0.15em] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors uppercase relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop Nav - Right Side (Extra Links) */}
                        <nav className="hidden lg:flex items-center gap-10 absolute right-40 top-1/2 -translate-y-1/2">
                            {navLinks.slice(3).map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-xs font-bold tracking-[0.15em] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors uppercase relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Icons */}
                        <div className="flex items-center gap-2 lg:ml-auto">
                            <button
                                className="w-10 h-10 flex items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors rounded-full hover:bg-[var(--color-background-alt)]"
                                aria-label="Search"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <i className="fas fa-search text-lg"></i>
                            </button>

                            <Link href="/wishlist" className="hidden sm:flex w-10 h-10 items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors relative rounded-full hover:bg-[var(--color-background-alt)]">
                                <i className="far fa-heart text-lg"></i>
                                {wishlistCount > 0 && (
                                    <span className="absolute top-2 right-1 bg-[var(--color-accent)] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            <Link href="/profile" className="hidden sm:flex w-10 h-10 items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors rounded-full hover:bg-[var(--color-background-alt)]">
                                <i className="far fa-user text-lg"></i>
                            </Link>

                            <Link href="/cart" className="flex w-10 h-10 items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors relative rounded-full hover:bg-[var(--color-background-alt)]">
                                <i className="fas fa-shopping-bag text-lg"></i>
                                {cartCount > 0 && (
                                    <span className="absolute top-2 right-1 bg-[var(--color-primary)] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 w-full max-w-[300px] h-full bg-white z-[70] lg:hidden shadow-2xl flex flex-col border-r border-[var(--color-border)]"
                        >
                            <div className="p-8 flex items-center justify-between border-b border-[var(--color-border)]">
                                <h2 className="font-heading text-xl font-bold tracking-widest text-[var(--color-primary)] uppercase">Menu</h2>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <div className="px-8 py-10 flex-1 overflow-y-auto">
                                <nav className="space-y-8">
                                    {navLinks.map((item, index) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className="block text-2xl font-heading font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <div className="w-12 h-[1px] bg-[var(--color-border)] my-10"></div>

                                <div className="space-y-6">
                                    <Link href="/orders" className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                                        Order History
                                    </Link>
                                    <Link href="/wishlist" className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                                        Wishlist ({wishlistCount})
                                    </Link>
                                    <Link href="/faq" className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                                        Help & FAQs
                                    </Link>
                                </div>
                            </div>

                            <div className="p-8 border-t border-[var(--color-border)] bg-[var(--color-background-alt)]">
                                <Link
                                    href="/login"
                                    className="block w-full py-4 border border-[var(--color-primary)] text-[var(--color-primary)] text-center text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {user ? 'My Account' : 'Sign In'}
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
        </>
    );
}
