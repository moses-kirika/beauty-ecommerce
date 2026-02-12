import { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
    title: "Contact Us | Personalized Beauty Consultations",
    description: "Connect with Beautify for personalized product guidance, order assistance, or general inquiries. We are here to assist your glow.",
};

export default function ContactPage() {
    return <ContactClient />;
}
