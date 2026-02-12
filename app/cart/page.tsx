import { Metadata } from 'next';
import CartClient from '@/components/CartClient';

export const metadata: Metadata = {
    title: "Your Shopping Bag | Review Your Ritual",
    description: "Review the items in your shopping bag before proceeding to checkout. Ensure your curated selection of luxury skincare is ready for delivery.",
};

export default function CartPage() {
    return <CartClient />;
}
