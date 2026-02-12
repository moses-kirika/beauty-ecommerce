import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Privacy Policy | Security & Data Protection",
    description: "Learn how Beautify protects your personal data. Our commitment to privacy ensures your curated beauty journey remains secure.",
};

export default function PrivacyPage() {
    return (
        <main className="pt-24 min-h-screen">
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-24 text-center">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 block">Refined Security</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-[var(--color-primary-dark)] leading-tight italic">
                            Privacy <br /> <span className="text-[var(--color-primary-dark)]/60">Policy.</span>
                        </h1>
                        <p className="mt-8 text-sm font-light text-[var(--color-text-light)] italic">
                            Last Updated: February 10, 2026
                        </p>
                    </div>

                    <div className="prose prose-stone max-w-none">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20 items-start">
                            <div className="md:col-span-4">
                                <h2 className="text-2xl font-heading text-[var(--color-primary-dark)] italic leading-none">01 Collection.</h2>
                                <div className="w-8 h-px bg-[var(--color-accent)] mt-4"></div>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-[var(--color-text-secondary)] font-light leading-relaxed italic">
                                    We collect information you provide directly to us—when you create an account, curate your wishlist, or complete an order. This includes your name, email address, phone number, and delivery essence.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20 items-start">
                            <div className="md:col-span-4">
                                <h2 className="text-2xl font-heading text-[var(--color-primary-dark)] italic leading-none">02 Usage.</h2>
                                <div className="w-8 h-px bg-[var(--color-accent)] mt-4"></div>
                            </div>
                            <div className="md:col-span-8">
                                <ul className="space-y-4 text-[var(--color-text-secondary)] font-light italic">
                                    <li className="flex items-center gap-3">
                                        <span className="w-1 h-1 bg-[var(--color-accent)] rounded-full"></span>
                                        Processing and fulfilling your curated orders.
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1 h-1 bg-[var(--color-accent)] rounded-full"></span>
                                        Sending shipping updates and confirmations.
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1 h-1 bg-[var(--color-accent)] rounded-full"></span>
                                        Providing premium customer concierge.
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1 h-1 bg-[var(--color-accent)] rounded-full"></span>
                                        Improving our digital atelier experience.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20 items-start">
                            <div className="md:col-span-4">
                                <h2 className="text-2xl font-heading text-[var(--color-primary-dark)] italic leading-none">03 Security.</h2>
                                <div className="w-8 h-px bg-[var(--color-accent)] mt-4"></div>
                            </div>
                            <div className="md:col-span-8 space-y-6 text-[var(--color-text-secondary)] font-light leading-relaxed italic">
                                <p>
                                    We implement a variety of security measures to maintain the safety of your personal information. Your data is contained behind secured networks and is only accessible by a limited number of persons.
                                </p>
                                <div className="p-8 bg-[var(--color-background-alt)] rounded-xl border border-[var(--color-border)]">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-dark)] mb-4 block">Payment Assurance</h4>
                                    <p className="text-sm">
                                        We do not store your payment details. All transactions are handled through secure gateways (M-Pesa, Card) adhering to PCI-DSS standards.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-32 p-12 bg-[var(--color-primary-dark)] text-white text-center rounded-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-heading mb-6 italic">Questions on Privacy?</h2>
                                <p className="text-white/60 font-light leading-relaxed mb-8 max-w-sm mx-auto italic">
                                    If you seek further clarity on our data practices, reach out to our privacy officer.
                                </p>
                                <div className="space-y-2 text-sm italic">
                                    <p>Email: privacy@beautify.co.ke</p>
                                    <p>Phone: +254 700 123 456</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
