import { Metadata } from 'next';
import ProfileClient from '@/components/ProfileClient';

export const metadata: Metadata = {
    title: "My Account | Your Personalized Ritual",
    description: "Manage your profile, track orders, and view your loyalty status. Personalize your skincare journey with Beautify Hub.",
};

export default function ProfilePage() {
    return <ProfileClient />;
}
