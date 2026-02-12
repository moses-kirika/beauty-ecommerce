"use client";

import { useState } from 'react';
import Link from 'next/link';

interface OrderStatus {
    id: string;
    status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
    date: string;
    items: number;
    total: number;
}

export default function TrackOrderClient() {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [result, setResult] = useState<OrderStatus | null>(null);
    const [searching, setSearching] = useState(false);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setSearching(true);

        // Simulate API call
        setTimeout(() => {
            setResult({
                id: orderId.toUpperCase(),
                status: 'Shipped',
                date: 'FedEx: Expected by Feb 10, 2026',
                items: 3,
                total: 12500
            });
            setSearching(false);
        }, 1500);
    };

    return (
        <main className="pt-24 min-h-screen">
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-2xl">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 block">Parcel Status</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-medium text-[var(--color-primary-dark)] leading-none">
                            Trace Your <br /> <span className="text-[var(--color-primary-dark)]/60">Glow.</span>
                        </h1>
                    </div>

                    <div className="bg-[var(--color-background-alt)] p-10 md:p-16 rounded-3xl border border-[var(--color-border)] shadow-xl shadow-[var(--color-primary)]/5">
                        <form onSubmit={handleTrack} className="space-y-12">
                            <div className="space-y-2 border-b border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors pb-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Order ID</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[var(--color-primary-dark)] font-light"
                                    placeholder="e.g. #BT-123456"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 border-b border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors pb-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[var(--color-primary-dark)] font-light"
                                    placeholder="The email used for checkout"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={searching}
                                className="w-full py-5 bg-[var(--color-primary-dark)] text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[var(--color-accent)] transition-all duration-500 disabled:opacity-50"
                            >
                                {searching ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fas fa-spinner fa-spin"></i> Locating Order
                                    </span>
                                ) : 'Track Order'}
                            </button>
                        </form>

                        {result && (
                            <div className="mt-20 pt-12 border-t border-[var(--color-border)] space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)] block mb-2">Current Status</span>
                                        <h3 className="text-3xl font-heading text-[var(--color-primary)]">{result.status}</h3>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)] block mb-2">Delivery Estimate</span>
                                        <p className="text-[var(--color-primary-dark)] font-medium">{result.date}</p>
                                    </div>
                                </div>

                                {/* Tracking Progress Bar */}
                                <div className="relative pt-10 pb-8 px-4">
                                    <div className="absolute top-12 left-0 right-0 h-0.5 bg-[var(--color-border)]"></div>
                                    <div className="absolute top-12 left-0 w-2/3 h-0.5 bg-[var(--color-accent)] transition-all duration-1000"></div>

                                    <div className="relative flex justify-between">
                                        {[
                                            { label: 'Ordered', active: true },
                                            { label: 'Processing', active: true },
                                            { label: 'Shipped', active: true },
                                            { label: 'Delivered', active: false }
                                        ].map((step, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-4">
                                                <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-500 ${step.active ? 'bg-[var(--color-accent)] border-[var(--color-accent)]' : 'bg-white border-[var(--color-border)]'}`}></div>
                                                <span className={`text-[9px] font-bold uppercase tracking-widest ${step.active ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text-light)]'}`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-white rounded-lg flex flex-col md:flex-row justify-between gap-4 border border-[var(--color-border)]">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)] block mb-1">Order Details</span>
                                        <p className="text-sm font-medium text-[var(--color-primary-dark)]">ID: {result.id}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)] block mb-1">Summary</span>
                                        <p className="text-sm text-[var(--color-text-secondary)] font-light">{result.items} items — KSh {result.total.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="text-center pt-8">
                                    <Link href="/contact" className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] border-b border-[var(--color-accent)] pb-1 hover:text-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)] transition-all">
                                        Need help with this order?
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 text-center text-[var(--color-text-light)] text-sm font-light">
                        Missing your tracking number? Check your SMS or <Link href="/contact" className="underline decoration-[var(--color-accent)] hover:text-[var(--color-primary-dark)] transition-colors">contact us</Link>.
                    </div>
                </div>
            </section>
        </main>
    );
}
