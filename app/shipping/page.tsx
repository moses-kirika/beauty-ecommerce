import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Shipping Information | Global Delivery Details",
    description: "Discover our delivery philosophy. We offer free shipping within Nairobi CBD and nationwide delivery via G4S for your luxury skincare curated rituals.",
};

export default function ShippingPage() {
    return (
        <main className="pt-24 min-h-screen">
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-24">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 block">Logistics & Care</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-[var(--color-primary-dark)] leading-tight italic">
                            Delivery <br /> <span className="text-[var(--color-primary-dark)]/60">Philosophy.</span>
                        </h1>
                        <p className="mt-8 text-xl font-light text-[var(--color-text-secondary)] leading-relaxed italic max-w-2xl">
                            We strive to get your favorite skincare products to you as quickly as possible, ensuring every parcel arrives with the same care we put into our formulations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        <div className="lg:col-span-8 space-y-20">
                            <div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-8">Nairobi & Environs</h3>
                                <div className="space-y-6 text-[var(--color-text-secondary)] font-light leading-relaxed">
                                    <div className="flex justify-between border-b border-[var(--color-border)] pb-4 italic">
                                        <span>Nairobi CBD (Same-day before 1 PM)</span>
                                        <span className="font-bold text-[var(--color-accent)] uppercase text-[10px]">Free</span>
                                    </div>
                                    <div className="flex justify-between border-b border-[var(--color-border)] pb-4">
                                        <span>Westlands, Kilimani, Upperhill</span>
                                        <span className="font-medium text-[var(--color-primary-dark)]">KSh 300</span>
                                    </div>
                                    <div className="flex justify-between border-b border-[var(--color-border)] pb-4">
                                        <span>Other Environs (Next-day)</span>
                                        <span className="font-medium text-[var(--color-primary-dark)]">KSh 500</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-8">Rest of Kenya</h3>
                                <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-6">
                                    Nationwide delivery via G4S and Wells Fargo. Major towns (Mombasa, Kisumu, Nakuru, Eldoret) usually receive their glow within 48 hours.
                                </p>
                                <div className="p-6 bg-[var(--color-background-alt)] rounded-lg flex justify-between items-center italic">
                                    <span className="text-sm">Standard Nationwide Delivery</span>
                                    <span className="font-bold text-[var(--color-primary-dark)]">KSh 500 - 800</span>
                                </div>
                            </div>

                            <div className="p-12 border-2 border-[var(--color-accent)]/20 rounded-2xl bg-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] mb-4 block">Complimentary Shipping</span>
                                    <h4 className="text-3xl font-heading text-[var(--color-primary-dark)] mb-6 leading-none italic">An editorial <span className="text-[var(--color-accent)]">gift.</span></h4>
                                    <p className="text-[var(--color-text-secondary)] font-light leading-relaxed italic">
                                        Enjoy <strong>FREE Standard Shipping</strong> on all orders above <strong>KSh 5,000</strong> nationwide. Our way of saying thank you.
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-8">Global Reach</h3>
                                <p className="text-[var(--color-text-secondary)] font-light leading-relaxed italic">
                                    Currently shipping within East Africa (Uganda, Tanzania, Rwanda). International rates are calculated at checkout with refined precision.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
                            <div className="p-8 bg-[var(--color-primary-dark)] text-white rounded-2xl">
                                <h4 className="text-xl font-heading mb-6 italic">Where is my order?</h4>
                                <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
                                    Use your unique tracking number to follow your parcel's journey from our atelier to your doorstep.
                                </p>
                                <Link href="/track-order" className="inline-block w-full py-4 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-[0.2em] text-center hover:bg-white hover:text-[var(--color-primary-dark)] transition-all duration-500">
                                    Trace Now
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <h5 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Need assistance?</h5>
                                <p className="text-sm text-[var(--color-text-secondary)] font-light italic">
                                    Our logistics team is available Mon-Fri, 9am - 6pm EAT.
                                </p>
                                <Link href="/contact" className="text-sm border-b border-[var(--color-accent)] text-[var(--color-primary-dark)] font-medium">
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
