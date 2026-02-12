"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-start lg:items-center bg-[#FDFCFB] pt-28 lg:pt-20 overflow-hidden" id="home">
            {/* Background Decorative Accents */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute inset-0 hero-gradient-overlay opacity-60"></div>
            </div>

            <div className="container mx-auto px-6 h-full relative z-10">
                <div className="flex flex-col items-center lg:flex-row lg:items-center h-full gap-12 lg:gap-24">

                    {/* Left Content */}
                    <div className="w-full lg:w-3/5 relative z-10 pt-4 lg:pt-0 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.3em] text-[var(--color-primary)] uppercase bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full backdrop-blur-sm"
                            >
                                Reimagining Skincare
                            </motion.span>

                            <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-heading text-[var(--color-primary-dark)] mb-8 leading-[1.05] tracking-tight">
                                Natural <br className="lg:hidden" />
                                <span className="font-light text-[var(--color-accent)]">Radiance</span>
                                <span className="hidden lg:inline text-[var(--color-accent)]">.</span>
                            </h1>

                            <p className="text-base sm:text-xl text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light lg:pr-20">
                                Discover our award-winning collection of organic skincare, designed to nourish and revitalize your skin from within. Luxury met with ethical sourcing.
                            </p>

                            <div className="flex flex-row justify-center lg:justify-start gap-3 sm:gap-6 mb-20 px-2 sm:px-0">
                                <Link
                                    href="/shop"
                                    className="flex-1 sm:flex-none px-8 sm:px-12 py-5 bg-[var(--color-primary)] text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[var(--color-primary-dark)] transition-all shadow-2xl hover:shadow-[var(--color-primary)]/20 hover:-translate-y-1 text-center whitespace-nowrap"
                                >
                                    Shop Collection
                                </Link>
                                <Link
                                    href="/about"
                                    className="flex-1 sm:flex-none px-8 sm:px-12 py-5 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[var(--color-primary)]/5 transition-all text-center whitespace-nowrap backdrop-blur-sm"
                                >
                                    Our Story
                                </Link>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-8 py-8 border-t border-[var(--color-border)]/60">
                                <div className="flex items-center gap-3 group">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/50 transition-colors">
                                        <i className="fas fa-leaf text-sm"></i>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">100% Organic</span>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/50 transition-colors">
                                        <i className="fas fa-shipping-fast text-sm"></i>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">Free Global Shipping</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Desktop-Only Image: Shifted to lg:w-2/5 */}
                    <div className="hidden lg:block relative w-full lg:w-2/5 z-0 h-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="relative h-full w-full"
                        >
                            <div className="absolute top-10 -right-10 w-full h-full bg-[var(--color-accent)]/5 rounded-tl-[100px] border border-[var(--color-accent)]/10 -z-10"></div>

                            <img
                                src="/images/products/unsplash-1571875257727-256c39da42af.jpg"
                                alt="Premium Skincare"
                                className="w-full h-full aspect-[4/5] object-cover rounded-tl-[100px] shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                            />

                            {/* Floating Stats or Element */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 shadow-2xl border border-[var(--color-border)] rounded-lg max-w-[180px]"
                            >
                                <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-accent)] uppercase mb-2">Editor's Pick</p>
                                <p className="font-heading text-lg text-[var(--color-primary-dark)] leading-tight">"The Purest Form of Luxury"</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Explorer (Mobile Centered) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            >
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[var(--color-text-light)]">Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-g from-[var(--color-accent)] to-transparent opacity-50 relative overflow-hidden">
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: '100%' }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 bg-[var(--color-accent)]"
                    />
                </div>
            </motion.div>
        </section>
    );
}
