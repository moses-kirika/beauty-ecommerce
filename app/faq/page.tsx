import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Skincare Guidance & Support",
    description: "Find answers to common questions about shipping, product authenticity, and our luxury skincare rituals. Your beauty journey, simplified.",
};

export default function FAQPage() {
    const faqs = [
        {
            category: "Orders & Shipping",
            items: [
                {
                    q: "How long does delivery take?",
                    a: "Delivery within Nairobi typically takes 24 hours. Nationwide delivery via G4S takes 2-3 business days."
                },
                {
                    q: "Do you offer free shipping?",
                    a: "Yes! Delivery within Nairobi CBD is absolutely FREE. We also offer free standard shipping on all orders above KSh 5,000 nationwide."
                },
                {
                    q: "Can I track my order?",
                    a: "Absolutely. Once your order is dispatched, you'll receive a tracking number via SMS/Email. Use it on our tracking page."
                }
            ]
        },
        {
            category: "Products & Skin Concerns",
            items: [
                {
                    q: "Are your products 100% authentic?",
                    a: "Yes, we source all our products directly from authorized distributors and manufacturers to ensure 100% authenticity."
                },
                {
                    q: "How do I know which product is right for my skin type?",
                    a: "Each product page has a 'Skin Type' indicator. You can also contact our skincare consultants via WhatsApp for a personalized recommendation."
                },
                {
                    q: "Are your products cruelty-free?",
                    a: "Many of our brands are certified cruelty-free. Look for the 'Vegan' or 'Organic' badges on the product pages."
                }
            ]
        },
        {
            category: "Payments",
            items: [
                {
                    q: "Do you accept M-Pesa?",
                    a: "Yes, M-Pesa is our primary payment method. We support STK Push for a seamless checkout experience."
                },
                {
                    q: "Can I pay on delivery?",
                    a: "Currently, we only accept pre-payments via M-Pesa, Card, or PayPal to ensure secure and contactless delivery."
                }
            ]
        }
    ];

    return (
        <main className="pt-24 min-h-screen">
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-32">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 block">Common Inquiries</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-[var(--color-primary-dark)] leading-none italic">
                            Your Questions, <br /> <span className="text-[var(--color-primary-dark)]/60">Resolved.</span>
                        </h1>
                    </div>

                    <div className="space-y-32">
                        {faqs.map((group, idx) => (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-4">
                                    <h3 className="text-2xl font-heading font-medium text-[var(--color-primary-dark)] sticky top-32">{group.category}</h3>
                                    <div className="w-12 h-px bg-[var(--color-accent)] mt-4 hidden lg:block"></div>
                                </div>
                                <div className="lg:col-span-8 space-y-12">
                                    {group.items.map((item, i) => (
                                        <div key={i} className="group pb-12 border-b border-[var(--color-border)] last:border-none last:pb-0">
                                            <h4 className="text-lg font-heading text-[var(--color-primary-dark)] mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300 flex items-start gap-4">
                                                <span className="text-[10px] font-bold text-[var(--color-accent)] mt-2">Q.</span>
                                                {item.q}
                                            </h4>
                                            <p className="text-[var(--color-text-secondary)] font-light leading-relaxed pl-8">
                                                {item.a}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-40 p-12 md:p-24 bg-[var(--color-background-alt)] text-center rounded-2xl relative overflow-hidden">
                        <div className="relative z-10 max-w-xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary-dark)] mb-6 italic">Still seeking answers?</h2>
                            <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-10 italic">
                                Our skincare atelier is open for personalized consultations via WhatsApp or traditional mail.
                            </p>
                            <div className="flex flex-col md:flex-row gap-6 justify-center">
                                <Link href="/contact" className="py-4 px-12 bg-[var(--color-primary-dark)] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition-all duration-500">
                                    Send an Inquiry
                                </Link>
                                <a href="https://wa.me/254700123456" className="py-4 px-12 border border-[var(--color-primary-dark)] text-[var(--color-primary-dark)] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-primary-dark)] hover:text-white transition-all duration-500" target="_blank" rel="noopener noreferrer">
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                        {/* Subtle Background Elements */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    </div>
                </div>
            </section>
        </main>
    );
}
