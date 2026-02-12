"use client";

import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

export default function WishlistClient() {
    const { wishlist } = useShop();

    return (
        <main className="bg-[#FAFAFA] min-h-screen pt-24 lg:pt-32 pb-16 lg:pb-24">
            <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">

                <div className="text-center mb-10 lg:mb-16">
                    <h1 className="text-3xl md:text-5xl font-heading text-[var(--color-primary-dark)] mb-3 lg:mb-4">Your Wishlist</h1>
                    <p className="text-[var(--color-text-secondary)] font-light">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/5 flex items-center justify-center mb-8 text-[var(--color-primary)]">
                            <i className="far fa-heart text-4xl"></i>
                        </div>
                        <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-4">Your wishlist is empty</h3>
                        <p className="text-[var(--color-text-secondary)] mb-8 max-w-md text-center font-light">
                            Save your favorite items here to keep track of what you love.
                        </p>
                        <Link
                            href="/shop"
                            className="px-8 py-4 bg-[var(--color-primary)] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[var(--color-primary-dark)] transition-all shadow-md hover:shadow-lg"
                        >
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {wishlist.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
