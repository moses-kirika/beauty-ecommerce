import { allProducts } from '@/data/products';
import ProductDetailClient from '@/components/ProductDetailClient';
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const product = allProducts.find(p => p.id === id);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: `${product.name} | ${product.brand}`,
        description: `Explore ${product.name} by ${product.brand}. A premium choice for your skincare ritual. ${product.stockStatus === 'In Stock' ? 'Order now while stocks last.' : 'Check availability.'}`,
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const product = allProducts.find(p => p.id === id);

    if (!product) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-heading mb-4">Product not found</h2>
                <Link href="/shop" className="text-sm underline hover:text-[var(--color-primary)] transition-colors">Return to Shop</Link>
            </div>
        );
    }

    return <ProductDetailClient product={product} />;
}
