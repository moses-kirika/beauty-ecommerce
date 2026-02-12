"use client";

import { useState } from 'react';

export default function ContactClient() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <main className="pt-24 min-h-screen">
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Info & Branding */}
                        <div className="lg:w-5/12">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 block">Connect With Us</span>
                            <h1 className="text-5xl md:text-7xl font-heading font-medium text-[var(--color-primary-dark)] mb-12 leading-none">
                                Pure beauty, <br /> <span className="text-[var(--color-accent)]">within reach.</span>
                            </h1>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)] mb-4">Our Atelier</h3>
                                    <p className="text-[var(--color-text-secondary)] font-light leading-relaxed">
                                        Riverside Office Park, Suite 100<br />
                                        Riverside Drive, Nairobi, Kenya
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)] mb-4">Inquiries</h3>
                                    <p className="text-[var(--color-text-secondary)] font-light leading-relaxed">
                                        hello@beautify.co.ke<br />
                                        +254 700 123 456
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)] mb-4">Social</h3>
                                    <div className="flex gap-6 text-[var(--color-primary-dark)]">
                                        <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Instagram</a>
                                        <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Pinterest</a>
                                        <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Twitter</a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-20 hidden lg:block">
                                <div className="aspect-square relative overflow-hidden bg-[var(--color-background-alt)] rounded-2xl shadow-lg border border-[var(--color-border)]">
                                    <img
                                        src="/images/products/unsplash-1505944270255-bd2b68af6422.jpg"
                                        alt="Product Essence"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:w-7/12 bg-[var(--color-background-alt)] p-10 md:p-20 border border-[var(--color-border)] rounded-3xl shadow-xl shadow-[var(--color-primary)]/5">
                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-3xl">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <h2 className="text-3xl font-heading text-[var(--color-primary-dark)]">Message Received.</h2>
                                    <p className="text-[var(--color-text-secondary)] font-light max-w-sm mx-auto">
                                        Thank you for reaching out. An editorial consultant will contact you shortly.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] border-b border-[var(--color-accent)] pb-1 pt-10"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-2 border-b border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors pb-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Your Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-transparent border-none p-0 focus:ring-0 text-[var(--color-primary-dark)] font-light"
                                                placeholder="e.g. Jane Doe"
                                            />
                                        </div>
                                        <div className="space-y-2 border-b border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors pb-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-transparent border-none p-0 focus:ring-0 text-[var(--color-primary-dark)] font-light"
                                                placeholder="jane@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 border-b border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors pb-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Subject</label>
                                        <select className="w-full bg-transparent border-none p-0 focus:ring-0 text-[var(--color-primary-dark)] font-light appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Order Assistance</option>
                                            <option>Product Guidance</option>
                                            <option>Wholesale Partnerships</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 border-b border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors pb-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Message</label>
                                        <textarea
                                            required
                                            rows={6}
                                            className="w-full bg-transparent border-none p-0 focus:ring-0 text-[var(--color-primary-dark)] font-light resize-none"
                                            placeholder="How can we assist your glow today?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-[var(--color-primary-dark)] text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[var(--color-accent)] transition-all duration-500"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
