"use client";

import Link from 'next/link';

export default function PromoBanners() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Banner 1 */}
                    <div className="group relative h-[400px] md:h-[500px] overflow-hidden bg-[var(--color-background-alt)] rounded-2xl border border-[var(--color-border)] hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 transition-all duration-500">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/images/products/unsplash-1556228578-f3d41e029475.jpg"
                                alt="Glass Skin Duo"
                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500"></div>
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 md:p-12">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-4">Limited Edition</span>
                            <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-8">
                                Glass Skin Duo
                            </h3>
                            <Link
                                href="/product/24"
                                className="inline-block px-10 py-4 bg-white text-[var(--color-primary-dark)] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>

                    {/* Banner 2 */}
                    <div className="group relative h-[400px] md:h-[500px] overflow-hidden bg-[var(--color-background-alt)] rounded-2xl border border-[var(--color-border)] hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 transition-all duration-500">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/images/products/unsplash-1571875257727-256c39da42af.jpg"
                                alt="Snail Mucin Set"
                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500"></div>
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 md:p-12">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-4">Best Seller</span>
                            <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-8">
                                Snail Mucin Power
                            </h3>
                            <Link
                                href="/product/2"
                                className="inline-block px-10 py-4 bg-white text-[var(--color-primary-dark)] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
