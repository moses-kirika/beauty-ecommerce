import { Metadata } from 'next';
import SignupClient from '@/components/SignupClient';

export const metadata: Metadata = {
    title: {
        absolute: "Join Us | Create Your Beautify Account"
    },
    description: "Start your journey with Beautify. Create an account to personalized your skincare rituals, save your favorites to your wishlist, and enjoy exclusive member benefits.",
};

export default function SignupPage() {
    return <SignupClient />;
}
