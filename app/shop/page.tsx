import { Suspense } from 'react';
import { Metadata } from 'next';
import ShopClient from '@/components/ShopClient';

export const metadata: Metadata = {
    title: "Shop All Collections | Luxury Skincare & Body Care",
    description: "Browse our curated selection of premium skincare products. From moisturizers to serums, find the perfect addition to your daily ritual. Sustainability meets luxury.",
};

export default function ShopPage() {
    return (
        <main>
            <Suspense fallback={<div className="container py-24 text-center font-heading text-xl text-[var(--color-primary)]">Loading our collections...</div>}>
                <ShopClient />
            </Suspense>
        </main>
    );
}
