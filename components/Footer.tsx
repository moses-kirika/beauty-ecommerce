"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (isAuthPage) return null;


    return (
        <footer className="bg-[var(--color-primary-dark)] text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">

                    {/* Brand Column */}
                    <div className="max-w-md">
                        <Link href="/" className="block font-heading text-3xl font-medium tracking-tight mb-6">
                            Beautify.
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm font-light">
                            Elevating daily rituals with nature-inspired, scientifically-proven skincare.
                            Sustainability meets luxury in every bottle.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: 'fab fa-instagram', label: 'Instagram' },
                                { icon: 'fab fa-facebook-f', label: 'Facebook' },
                                { icon: 'fab fa-tiktok', label: 'TikTok' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href="#"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
                                >
                                    <i className={`${social.icon} text-sm`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
                        <div>
                            <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-[var(--color-accent)] font-heading">Collections</h5>
                            <ul className="flex flex-col gap-4">
                                <li><Link href="/shop?category=Skincare" className="text-sm text-white/60 hover:text-white transition-colors">Skincare</Link></li>
                                <li><Link href="/shop?category=Body" className="text-sm text-white/60 hover:text-white transition-colors">Body Care</Link></li>
                                <li><Link href="/shop?category=Sets" className="text-sm text-white/60 hover:text-white transition-colors">Gift Sets</Link></li>
                                <li><Link href="/shop?sort=new" className="text-sm text-white/60 hover:text-white transition-colors">New Arrivals</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-[var(--color-accent)] font-heading">Support</h5>
                            <ul className="flex flex-col gap-4">
                                <li><Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact Us</Link></li>
                                <li><Link href="/shipping" className="text-sm text-white/60 hover:text-white transition-colors">Shipping & Returns</Link></li>
                                <li><Link href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQs</Link></li>
                                <li><Link href="/track" className="text-sm text-white/60 hover:text-white transition-colors">Track Order</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-[var(--color-accent)] font-heading">Legal</h5>
                            <ul className="flex flex-col gap-4">
                                <li><Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-[10px] tracking-wide uppercase">
                        &copy; 2026 Beautify Kenya.
                    </p>
                    <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <i className="fab fa-cc-visa text-2xl"></i>
                        <i className="fab fa-cc-mastercard text-2xl"></i>
                        <i className="fas fa-money-bill-wave text-2xl" title="M-Pesa"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}
