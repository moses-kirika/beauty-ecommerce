import { Metadata } from 'next';
import CheckoutClient from '@/components/CheckoutClient';

export const metadata: Metadata = {
    title: "Secure Checkout | Complete Your Ritual",
    description: "Complete your purchase securely. Enter your shipping and payment details to receive your curated selection of luxury skincare from Beautify Hub.",
};

export default function CheckoutPage() {
    return <CheckoutClient />;
}
