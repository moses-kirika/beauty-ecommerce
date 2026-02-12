"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginClient() {
    const { login, socialLogin, isLoading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const success = await login(email, password);
            if (success) {
                router.push('/profile');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    const handleSocialAuth = async (provider: 'google' | 'facebook' | 'apple') => {
        try {
            const success = await socialLogin(provider === 'apple' ? 'google' : provider as any);
            if (success) {
                router.push('/profile');
            }
        } catch (err) {
            setError(`Social login with ${provider} failed`);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[var(--color-background-alt)] p-6 lg:p-12">
            <div className="max-w-[1100px] w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[650px]">

                {/* Left Column: Image Area */}
                <div className="hidden md:flex flex-1 p-6">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative border border-[var(--color-border)]">
                        <img
                            src="/images/auth-image.jpg"
                            alt="Luxury Skincare"
                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
                        />
                        <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 right-10">
                            <h2 className="text-white text-3xl font-heading mb-4 italic">"True beauty is an act of self-care."</h2>
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
                            <h1 className="text-3xl font-heading text-[var(--color-primary-dark)] mb-3">Welcome Back</h1>
                            <p className="text-sm text-[var(--color-text-secondary)] font-light font-primary">Enter your details and continue your ritual</p>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 text-xs text-center rounded-lg animate-fade-in">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-primary)] ml-1 font-primary">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 outline-none transition-all duration-300 font-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-primary)] ml-1 font-primary">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 outline-none transition-all duration-300 font-primary"
                                />
                            </div>

                            <div className="flex items-center justify-between px-1 mb-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                                    />
                                    <span className="text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors font-primary">Remember login</span>
                                </label>
                                <Link href="#" className="text-xs font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors font-primary">Forgot password?</Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-dark)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:translate-y-0 font-primary"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fas fa-circle-notch animate-spin"></i> Processing
                                    </span>
                                ) : 'Sign In To Rituals'}
                            </button>
                        </form>

                        <div className="relative my-10 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <span className="relative px-4 bg-white text-[10px] font-bold uppercase tracking-widest text-gray-400 font-primary">Or continue with</span>
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

                        <div className="mt-12 text-center">
                            <p className="text-sm text-[var(--color-text-secondary)] font-light font-primary">
                                New to Beauty Hub? {' '}
                                <Link href="/signup" className="text-[var(--color-primary)] font-bold hover:text-[var(--color-accent)] transition-colors ml-1 underline underline-offset-4">
                                    Create Membership
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
