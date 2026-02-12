"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignupClient() {
    const { signup, socialLogin, isLoading } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!agree) {
            setError('Please agree to the Terms & Conditions');
            return;
        }

        try {
            const success = await signup(name, email, password);
            if (success) {
                router.push('/profile');
            }
        } catch (err) {
            setError('An error occurred during signup');
        }
    };

    const handleSocialAuth = async (provider: 'google' | 'facebook') => {
        try {
            const success = await socialLogin(provider);
            if (success) {
                router.push('/profile');
            }
        } catch (err) {
            setError(`Social signup with ${provider} failed`);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[var(--color-background-alt)] p-6 lg:p-12">
            <div className="max-w-[1100px] w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[650px]">

                {/* Left Column: Image Area */}
                <div className="hidden md:flex flex-1 p-6">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative border border-[var(--color-border)]">
                        <img
                            src="/images/products/unsplash-1570172619644-dfd03ed5d881.jpg"
                            alt="Natural Skincare Collection"
                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] scale-x-[-1]"
                        />
                        <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 right-10">
                            <h2 className="text-white text-3xl font-heading mb-4 italic">"Radiance begins with the first step."</h2>
                            <div className="w-12 h-1 bg-[var(--color-accent)]"></div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form Area */}
                <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
                                    <i className="fas fa-spa text-white text-xl"></i>
                                </div>
                                <span className="font-heading font-medium text-2xl tracking-tight text-[var(--color-primary-dark)] uppercase">BEAUTIFY</span>
                            </div>
                            <h1 className="text-3xl font-heading text-[var(--color-primary-dark)] mb-3">Join the Hub</h1>
                            <p className="text-sm text-[var(--color-text-secondary)] font-light font-primary">Become a member and unlock exclusive beauty rituals</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-xs text-center rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-primary)] ml-1 font-primary">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 outline-none transition-all duration-300 font-primary"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-primary)] ml-1 font-primary">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 outline-none transition-all duration-300 font-primary"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-primary)] ml-1 font-primary">Password</label>
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 outline-none transition-all duration-300 font-primary"
                                />
                            </div>

                            <div className="px-1 py-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={agree}
                                        onChange={(e) => setAgree(e.target.checked)}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                                    />
                                    <span className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed font-primary">
                                        I agree to the <Link href="/privacy" className="text-[var(--color-primary)] font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[var(--color-primary)] font-bold hover:underline">Privacy Policy</Link>.
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-dark)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:translate-y-0 font-primary"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fas fa-circle-notch animate-spin"></i> Initializing
                                    </span>
                                ) : 'Create Membership'}
                            </button>
                        </form>

                        <div className="relative my-8 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <span className="relative px-4 bg-white text-[10px] font-bold uppercase tracking-widest text-gray-400 font-primary">Or join with</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleSocialAuth('facebook')}
                                className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-full hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 active:scale-95"
                            >
                                <i className="fab fa-facebook text-[#1877F2] text-xl"></i>
                                <span className="text-[10px] font-bold uppercase tracking-widest font-primary">Facebook</span>
                            </button>
                            <button
                                onClick={() => handleSocialAuth('google')}
                                className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-full hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 active:scale-95"
                            >
                                <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest font-primary">Google</span>
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-[var(--color-text-secondary)] font-light font-primary">
                                Already have an account? {' '}
                                <Link href="/login" className="text-[var(--color-primary)] font-bold hover:text-[var(--color-accent)] transition-colors ml-1 underline underline-offset-4">
                                    Sign In Instead
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
