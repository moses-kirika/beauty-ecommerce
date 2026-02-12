import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Returns & Exchanges | Hassle-Free Policy",
    description: "Our returns process is designed for ease and transparency. Learn about our 14-day editorial window and return eligibility for luxury skincare.",
};

export default function ReturnsPage() {
    return (
        <main className="pt-24 min-h-screen">
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-24">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 block">Satisfaction & Care</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-[var(--color-primary-dark)] leading-tight italic">
                            Returns <br /> <span className="text-[var(--color-primary-dark)]/60">Assurance.</span>
                        </h1>
                        <p className="mt-8 text-xl font-light text-[var(--color-text-secondary)] leading-relaxed italic max-w-2xl">
                            At Beautify, we want you to be completely satisfied with your purchase. If a product doesn't meet your expectations, our returns process is designed for ease and transparency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        <div className="lg:col-span-8 space-y-24">
                            {/* Return Window */}
                            <div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-6">14-Day Editorial Window</h3>
                                <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-8">
                                    Items can be returned within 14 days of delivery. To ensure the integrity of our curated products, eligibility requires:
                                </p>
                                <ul className="space-y-6 text-[var(--color-text-secondary)] font-light">
                                    <li className="flex gap-4 items-start">
                                        <span className="text-[var(--color-accent)] font-bold">01.</span>
                                        <span>Items must be unused and in original, pristine condition.</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <span className="text-[var(--color-accent)] font-bold">02.</span>
                                        <span>Original, unopened packaging with seals completely intact.</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <span className="text-[var(--color-accent)] font-bold">03.</span>
                                        <span>Accompanied by the original receipt or digital order confirmation.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Caution Section */}
                            <div className="p-10 bg-red-50 border-l-4 border-red-200 rounded-r-2xl">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-4 block">Safety & Hygiene</h4>
                                <h3 className="text-2xl font-heading text-red-900 mb-4 italic">Non-Returnable Items.</h3>
                                <p className="text-red-800/70 font-light leading-relaxed italic">
                                    For safety reasons, we cannot accept returns on products that have been **opened, used, or have a broken seal**, unless the product is defective upon arrival.
                                </p>
                            </div>

                            {/* How to Initiate */}
                            <div>
                                <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-12">The Process</h3>
                                <div className="space-y-16">
                                    {[
                                        {
                                            title: 'Contact Support',
                                            desc: 'Email returns@beautify.co.ke with your order number and intention.'
                                        },
                                        {
                                            title: 'Pack Securely',
                                            desc: 'Ensure the item is well-protected in its original packaging for its journey back.'
                                        },
                                        {
                                            title: 'Refund Processing',
                                            desc: 'Once inspected, refunds are issued via your original payment method in 3-5 days.'
                                        }
                                    ].map((step, idx) => (
                                        <div key={idx} className="relative pl-16">
                                            <span className="absolute left-0 top-0 text-5xl font-heading text-[var(--color-accent)]/20 leading-none">{idx + 1}</span>
                                            <h4 className="text-lg font-heading text-[var(--color-primary-dark)] mb-2 italic">{step.title}</h4>
                                            <p className="text-[var(--color-text-secondary)] font-light leading-relaxed">{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 h-fit p-10 bg-[var(--color-background-alt)] rounded-2xl space-y-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] block mb-4">Need help?</h4>
                            <p className="text-sm text-[var(--color-text-secondary)] font-light italic leading-relaxed">
                                Our editorial concierge is here to assist with your return or provide alternative product guidance.
                            </p>
                            <Link href="/contact" className="inline-block w-full py-4 bg-[var(--color-primary-dark)] text-white text-[10px] font-bold uppercase tracking-[0.2em] text-center hover:bg-[var(--color-accent)] transition-all duration-500">
                                Contact Concierge
                            </Link>
                            <div className="pt-6 border-t border-[var(--color-border)] text-xs text-[var(--color-text-light)] italic">
                                * Shipping costs for returns are the responsibility of the client unless the item is flawed.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
