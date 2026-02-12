import { Metadata } from 'next';
import LoginClient from '@/components/LoginClient';

export const metadata: Metadata = {
    title: {
        absolute: "Sign In | Access Your Beauty Hub Profile"
    },
    description: "Welcome back to Beautify Hub. Sign in to your account to manage your curated wishlist, track orders, and view your personalized beauty rituals.",
};

export default function LoginPage() {
    return <LoginClient />;
}
