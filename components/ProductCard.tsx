"use client";

import Link from 'next/link';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, toggleWishlist, isInWishlist } = useShop();
    const isWishlisted = isInWishlist(product.id);

    return (
        <div className="group relative border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-500 rounded-2xl overflow-hidden bg-white hover:shadow-2xl hover:shadow-[var(--color-primary)]/10">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-background-alt)]">
                <Link href={`/product/${product.id}`} className="block w-full h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
                        loading="lazy"
                    />
                </Link>

                {/* Badges */}
                {product.onSale && (
                    <span className="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-[9px] font-bold px-3 py-1.5 tracking-[0.2em] uppercase rounded-full shadow-lg">
                        Sale
                    </span>
                )}

                {/* Hover Actions (Always visible on mobile, hover on desktop) */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-8 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out flex gap-2 z-10">
                    <button
                        className="flex-1 bg-white/95 backdrop-blur-md text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-xl active:scale-95"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        Add to Bag
                    </button>
                    <button
                        className="w-12 bg-white/95 backdrop-blur-md flex items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-all duration-300 shadow-xl rounded-xl active:scale-95"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product);
                        }}
                    >
                        <i className={`${isWishlisted ? "fas fa-heart text-[var(--color-accent)]" : "far fa-heart"}`}></i>
                    </button>
                </div>

                {/* Gradient Overlay for better button visibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Product Info */}
            <div className="p-4 text-center transform transition-transform duration-500 group-hover:-translate-y-1">
                <Link
                    href={`/shop?brand=${product.brand}`}
                    className="block text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-[0.2em] mb-2 hover:text-[var(--color-primary)] transition-colors"
                >
                    {product.brand}
                </Link>

                <h3 className="text-[13px] font-medium text-[var(--color-text-primary)] leading-snug mb-3 font-heading min-h-[2.5rem] flex items-center justify-center">
                    <Link href={`/product/${product.id}`} className="hover:text-[var(--color-primary)] transition-colors">
                        {product.name}
                    </Link>
                </h3>

                <div className="flex items-baseline justify-center gap-3">
                    <span className="text-sm font-bold text-[var(--color-primary)] tracking-tight">
                        KSh {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice != null && (
                        <span className="text-[11px] text-[var(--color-text-light)] line-through decoration-1 opacity-60">
                            KSh {product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
