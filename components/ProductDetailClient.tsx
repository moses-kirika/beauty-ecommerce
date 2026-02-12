"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { popularProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart, toggleWishlist, isInWishlist } = useShop();

    const [activeTab, setActiveTab] = useState('Details');
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product.image);
    const [activeThumb, setActiveThumb] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);


    // Sync state when product changes (for client-side navigation)
    useEffect(() => {
        setMainImage(product.image);
        setActiveThumb(0);
        setQuantity(1);
        setActiveTab('Details');
    }, [product.id, product.image]);

    // Initialize variants when product loads
    useEffect(() => {
        if (product.variants && product.variants.length > 0) {
            const firstInStock = product.variants.find(v => v.inStock);
            if (firstInStock) {
                setSelectedVariant(firstInStock.value);
            }
        }
    }, [product]);

    const isWishlisted = isInWishlist(product.id);

    const handleThumbClick = (img: string, index: number) => {
        setMainImage(img);
        setActiveThumb(index);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    // Generate stars helper
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <div className="flex text-[var(--color-accent)] text-xs gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fas fa-star"></i>
                ))}
                {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="far fa-star text-gray-300"></i>
                ))}
            </div>
        );
    };

    return (
        <main className="bg-[#FAFAFA] min-h-screen pt-20 lg:pt-24 pb-12 lg:pb-20">
            <div className="container mx-auto px-4 lg:px-6 max-w-[1200px]">

                {/* Product Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 mb-12 lg:mb-24">

                    {/* Gallery (Left) */}
                    <div className="w-full lg:w-[55%] space-y-4 lg:space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="aspect-[4/5] bg-white overflow-hidden relative shadow-sm border border-[var(--color-border)]"
                        >
                            <img
                                src={mainImage || product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                            />
                            {product.stockStatus !== 'In Stock' && (
                                <span className="absolute top-4 left-4 bg-gray-900 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                    {product.stockStatus}
                                </span>
                            )}
                        </motion.div>

                        <div className="grid grid-cols-4 gap-3 lg:gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`aspect-square bg-white overflow-hidden border transition-all duration-300 ${activeThumb === idx ? 'border-[var(--color-primary)] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    onClick={() => handleThumbClick(img, idx)}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info (Right / Sticky) */}
                    <div className="w-full lg:w-[45%] lg:sticky lg:top-32 h-fit">
                        <div className="mb-2">
                            <Link href={`/shop?brand=${product.brand}`} className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-2 block hover:underline">
                                {product.brand}
                            </Link>
                            <h1 className="text-3xl lg:text-5xl font-heading font-medium text-[var(--color-primary-dark)] mb-3 lg:mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    {renderStars(product.rating)}
                                    <span className="text-xs font-medium text-[var(--color-text-secondary)] underline decoration-gray-300 underline-offset-4">
                                        {product.reviewsCount} Reviews
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-4 mb-8 border-b border-[var(--color-border)] pb-8">
                                <span className="text-2xl font-medium text-[var(--color-primary)]">
                                    KSh {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-sm text-[var(--color-text-light)] line-through">
                                            KSh {product.originalPrice.toLocaleString()}
                                        </span>
                                        <span className="text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-1 uppercase tracking-wider">
                                            Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-8 font-light">
                            {product.description || "Our advanced formula is designed to nourish and rejuvenate your skin, leaving it feeling soft, hydrated, and glowing. Perfect for daily use."}
                        </p>

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="mb-8">
                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] block mb-3">
                                    Select {product.variants[0].type}: <span className="text-[var(--color-text-secondary)] font-normal capitalize">{product.variants.find(v => v.value === selectedVariant)?.name}</span>
                                </span>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((v, idx) => (
                                        <button
                                            key={idx}
                                            className={`px-4 py-2 text-xs border transition-all duration-200 rounded-full ${selectedVariant === v.value
                                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                                                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'
                                                } ${!v.inStock ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
                                            disabled={!v.inStock}
                                            onClick={() => setSelectedVariant(v.value)}
                                        >
                                            {v.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4 mb-10">
                            <div className="flex items-center border border-[var(--color-border)] h-12 w-32 rounded-full overflow-hidden">
                                <button
                                    className="w-10 h-full flex items-center justify-center text-[var(--color-primary)] hover:bg-gray-50 transition-colors"
                                    onClick={() => handleQuantityChange(-1)}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-full h-full text-center text-sm font-medium text-[var(--color-primary)] outline-none bg-transparent"
                                />
                                <button
                                    className="w-10 h-full flex items-center justify-center text-[var(--color-primary)] hover:bg-gray-50 transition-colors"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="flex-1 bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-[0.2em] h-12 rounded-full hover:bg-[var(--color-primary-dark)] transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
                                onClick={() => addToCart(product, quantity)}
                            >
                                Add to Bag
                            </button>
                            <button
                                className={`w-12 h-12 flex items-center justify-center border transition-all rounded-full ${isWishlisted
                                    ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10'
                                    : 'border-[var(--color-border)] text-[var(--color-primary)] hover:border-[var(--color-primary)]'
                                    }`}
                                onClick={() => toggleWishlist(product)}
                            >
                                <i className={isWishlisted ? "fas fa-heart" : "far fa-heart"}></i>
                            </button>
                        </div>

                        {/* Tabs / Accordion */}
                        <div className="border-t border-[var(--color-border)]">
                            {['Details', 'Ingredients', 'How to Use', 'Delivery'].map((tab) => (
                                <div key={tab} className="border-b border-[var(--color-border)]">
                                    <button
                                        className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                                        onClick={() => setActiveTab(activeTab === tab ? '' : tab)}
                                    >
                                        {tab}
                                        <i className={`fas fa-plus transition-transform duration-300 ${activeTab === tab ? 'rotate-45' : ''}`}></i>
                                    </button>
                                    <AnimatePresence>
                                        {activeTab === tab && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-6 text-sm leading-relaxed text-[var(--color-text-secondary)] font-light">
                                                    {tab === 'Details' && (
                                                        <>
                                                            <p className="mb-4">{product.howToApply}</p>
                                                            <ul className="list-disc list-inside space-y-1 pl-2 marker:text-[var(--color-accent)]">
                                                                <li>Clinically tested formula</li>
                                                                <li>Vegan and Cruelty-Free</li>
                                                                <li>Paraben and Sulfate-Free</li>
                                                                <li>Designed for maximum efficacy</li>
                                                            </ul>
                                                        </>
                                                    )}
                                                    {tab === 'Ingredients' && <p>{product.ingredients}</p>}
                                                    {tab === 'How to Use' && <p>{product.usageInstructions}</p>}
                                                    {tab === 'Delivery' && <p>Free shipping on orders over KSh 5,000. Returns accepted within 14 days of delivery.</p>}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mb-24 pt-16 border-t border-[var(--color-border)]">
                    <h3 className="text-3xl font-heading font-medium text-[var(--color-primary)] mb-12 text-center">Customer Reviews</h3>

                    <div className="grid md:grid-cols-12 gap-12">
                        {/* Summary */}
                        <div className="md:col-span-4 bg-white p-8 border border-[var(--color-border)] h-fit">
                            <div className="text-center mb-6">
                                <span className="text-6xl font-heading font-bold text-[var(--color-primary)] block mb-2">{product.rating}</span>
                                <div className="flex justify-center mb-2 text-[var(--color-accent)] text-sm">
                                    {renderStars(product.rating)}
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Based on {product.reviewsCount} reviews</p>
                            </div>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map(num => (
                                    <div key={num} className="flex items-center gap-3 text-xs">
                                        <span className="w-4 font-medium text-right">{num}</span>
                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[var(--color-primary)]"
                                                style={{ width: num === 5 ? '70%' : num === 4 ? '20%' : '5%' }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                                Write a Review
                            </button>
                        </div>

                        {/* Recent Reviews */}
                        <div className="md:col-span-8 space-y-8">
                            {product.reviews.map(review => (
                                <div key={review.id} className="border-b border-[var(--color-border)] pb-8 last:border-0">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="block font-bold text-[var(--color-primary)] text-sm mb-1">{review.userName}</span>
                                            <div className="flex text-[var(--color-accent)] text-[10px]">
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>
                                        <span className="text-xs text-[var(--color-text-light)]">{review.date}</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-2">Verified Purchase</h4>
                                    <p className="text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Complete the Routine */}
                <section>
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-2xl md:text-3xl font-heading text-[var(--color-primary)]">Complete the Routine</h3>
                        <Link href="/shop" className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest border-b border-[var(--color-primary)] pb-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors">
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
                        {popularProducts.slice(0, 4).map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
