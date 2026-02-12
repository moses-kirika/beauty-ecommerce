import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
    title: "Curated Bundles | Luxury Value Sets",
    description: "Save up to 30% with our expertly paired routines. Curated beauty kits for every skin concern, designed for maximum efficacy and value.",
};

export default function BundlesPage() {
    const bundles = allProducts.filter(p => p.isBundle);

    return (
        <main className="pt-24 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-24">
                <Image
                    src="/images/products/unsplash-1556228578-f3d41e029475.jpg"
                    alt="Curated Beauty Kits"
                    fill
                    className="object-cover brightness-50 contrast-125"
                    priority
                />
                <div className="relative z-10 text-center text-white px-6 max-w-4xl">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-accent)] mb-6 block">Exclusive Savings</span>
                    <h1 className="text-6xl md:text-8xl font-heading font-medium mb-8 leading-none italic">
                        Beauty <span className="text-white/80">Kits.</span>
                    </h1>
                    <p className="text-white/80 font-light leading-relaxed text-lg md:text-xl max-w-2xl mx-auto italic">
                        Save up to 30% when you buy our expertly paired routines, curated for every skin concern.
                    </p>
                </div>
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {bundles.map(bundle => (
                            <div key={bundle.id} className="group cursor-pointer">
                                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-background-alt)] mb-8">
                                    <Image
                                        src={bundle.image}
                                        alt={bundle.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6 px-4 py-1 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-widest">
                                        Bundle Savings
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-heading font-medium text-[var(--color-primary-dark)] leading-tight">{bundle.name}</h3>
                                        <div className="text-right">
                                            <span className="text-lg font-bold text-[var(--color-primary)]">KSh {bundle.price.toLocaleString()}</span>
                                            {bundle.originalPrice && (
                                                <div className="text-xs text-[var(--color-text-light)] line-through decoration-[var(--color-accent)]">KSh {bundle.originalPrice.toLocaleString()}</div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed line-clamp-2">
                                        {bundle.ingredients}
                                    </p>

                                    <div className="pt-4 border-t border-[var(--color-border)]">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)] mb-4 block">Includes</span>
                                        <div className="flex gap-2">
                                            {bundle.bundleItems?.map(itemId => {
                                                const item = allProducts.find(p => p.id === itemId);
                                                return item ? (
                                                    <div key={itemId} className="w-10 h-10 rounded-full border border-[var(--color-border)] overflow-hidden relative" title={item.name}>
                                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>

                                    <Link href={`/product/${bundle.id}`} className="block w-full py-4 border border-[var(--color-primary)] text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-[0.2em] text-center hover:bg-[var(--color-primary)] hover:text-white transition-all duration-500 mt-6">
                                        Explore Kit Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Marketing Banner */}
                    <div className="relative mt-32 p-16 md:p-24 bg-[var(--color-primary-dark)] text-white overflow-hidden text-center rounded-2xl">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block text-[var(--color-accent)]">Winter Special</span>
                            <h2 className="text-4xl md:text-6xl font-heading mb-8 italic">Buy 2 Get 1 <span className="text-[var(--color-accent)]">Free.</span></h2>
                            <p className="text-white/60 text-lg font-light leading-relaxed mb-12 italic">Mix and match your favorite floral waters and skin refreshers for a complete winter glow up.</p>
                            <Link href="/shop?category=Cleansers" className="inline-block py-5 px-12 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[var(--color-primary-dark)] transition-all duration-500">
                                Shop Mists Now
                            </Link>
                        </div>
                        {/* Decorative Decorative elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                    </div>
                </div>
            </section>
        </main>
    );
}
