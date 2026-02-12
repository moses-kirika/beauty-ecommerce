import { Metadata } from 'next';
import Link from 'next/link';
import { dealProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
    title: "Exclusive Offers | Limited Edition Deals",
    description: "Discover our latest deals and limited-time discounts on luxury skincare essentials. Handpicked offers to enhance your beauty ritual at exceptional value.",
};

export default function OffersPage() {
    return (
        <main className="pt-24 min-h-screen">
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 block">Limited Time</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-[var(--color-primary-dark)] mb-8 leading-none">
                            Exclusive <br /> <span className="italic text-[var(--color-accent)]">Offerings.</span>
                        </h1>
                        <p className="text-[var(--color-text-secondary)] font-light leading-relaxed text-lg italic">
                            Discover our latest deals and limited-time discounts on your favorite beauty essentials, curated for your unique glow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {dealProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="text-center mt-24">
                        <Link href="/shop" className="inline-block py-4 px-12 border border-[var(--color-primary)] text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-500">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
