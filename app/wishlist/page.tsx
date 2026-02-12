import { Metadata } from 'next';
import WishlistClient from '@/components/WishlistClient';

export const metadata: Metadata = {
    title: "Your Wishlist | Saved Luxury Rituals",
    description: "Keep track of your favorite luxury skincare products. Save items for later and build your perfect beauty ritual with Beautify Hub.",
};

export default function WishlistPage() {
    return <WishlistClient />;
}
