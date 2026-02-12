import { Metadata } from 'next';
import TrackOrderClient from '@/components/TrackOrderClient';

export const metadata: Metadata = {
    title: "Track Your Order | Follow Your Beauty Ritual",
    description: "Trace your shipment in real-time. Stay updated on the delivery of your curated luxury skincare products from Beautify Hub.",
};

export default function TrackOrderPage() {
    return <TrackOrderClient />;
}
