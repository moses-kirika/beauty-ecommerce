"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutClient() {
    const {
        cart,
        getCartSubtotal,
        getDiscountAmount,
        getCartTotal,
        shippingMethod,
        clearCart,
        applyReferralCode,
        giftCard,
        applyGiftCard
    } = useShop();

    const router = useRouter();
    const [isOrdered, setIsOrdered] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'mpesa', 'paypal', 'wallet'
    const [referralInput, setReferralInput] = useState('');
    const [giftCardInput, setGiftCardInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const subtotal = getCartSubtotal();
    const discount = getDiscountAmount();
    const total = getCartTotal();

    const handleApplyReferral = () => {
        applyReferralCode(referralInput);
        setReferralInput('');
    };

    const handleApplyGiftCard = () => {
        applyGiftCard(giftCardInput);
        setGiftCardInput('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate processing
        setTimeout(() => {
            setIsLoading(false);
            setIsOrdered(true);
            setTimeout(() => {
                clearCart();
                router.push('/');
            }, 3000);
        }, 2000);
    };

    if (isOrdered) {
        return (
            <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 flex items-center justify-center">
                <div className="container mx-auto px-6 max-w-[600px] text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 border border-[var(--color-border)] shadow-2xl rounded-3xl"
                    >
                        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8">
                            <i className="fas fa-check text-3xl text-green-600"></i>
                        </div>
                        <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-4">Order Placed Successfully!</h2>
                        <p className="text-[var(--color-text-secondary)] mb-6">
                            Thank you for your purchase. Your order <span className="font-bold text-[var(--color-primary)]">#BT-{Math.floor(Math.random() * 90000) + 10000}</span> has been confirmed.
                        </p>
                        <p className="text-sm text-[var(--color-text-light)] mb-8">
                            {paymentMethod === 'mpesa' ? 'Please check your phone for the M-PESA prompt to complete payment.' : 'A confirmation email has been sent to your inbox.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/track-order" className="px-8 py-3 bg-white border border-[var(--color-border)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-50 transition-colors text-center">
                                Track Order
                            </Link>
                            <Link href="/shop" className="px-8 py-3 bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[var(--color-primary-dark)] transition-colors text-center">
                                Continue Shopping
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-[var(--color-text-secondary)] mb-6">Your cart is empty. Please add items before checking out.</p>
                    <Link href="/shop" className="px-8 py-4 bg-[var(--color-primary)] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full">
                        Go to Shop
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#FAFAFA] min-h-screen pt-24 lg:pt-32 pb-16 lg:pb-24">
            <div className="container mx-auto px-4 lg:px-6 max-w-[1200px]">
                <h1 className="text-3xl lg:text-5xl font-heading text-[var(--color-primary)] mb-8 lg:mb-12 text-center">Checkout</h1>

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Forms */}
                    <div className="w-full lg:w-[65%] space-y-6 lg:space-y-8">

                        {/* Guest Checkout Badge */}
                        <div className="bg-blue-50 border border-blue-100 p-4 flex items-center gap-3 text-blue-800 text-sm">
                            <i className="fas fa-info-circle"></i>
                            <span>You are checking out as a <strong>Guest</strong>. <Link href="/login" className="underline hover:no-underline">Log in</Link> for a faster experience.</span>
                        </div>

                        {/* Shipping Info */}
                        <section className="bg-white p-6 lg:p-8 border border-[var(--color-border)] shadow-sm rounded-2xl">
                            <h3 className="text-xl font-heading text-[var(--color-primary)] mb-6 pb-4 border-b border-[var(--color-border)]">Shipping Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">First Name</label>
                                    <input type="text" required className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white text-base" placeholder="Jane" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Last Name</label>
                                    <input type="text" required className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white text-base" placeholder="Doe" />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Email Address</label>
                                    <input type="email" required className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white text-base" placeholder="jane@example.com" />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Street Address</label>
                                    <input type="text" required className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white text-base" placeholder="123 Fashion Ave, Apt 4B" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">City / Town</label>
                                    <input type="text" required className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white text-base" placeholder="Nairobi" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Postal Code</label>
                                    <input type="text" className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white text-base" placeholder="00100" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="bg-white p-8 border border-[var(--color-border)] shadow-sm rounded-2xl">
                            <h3 className="text-xl font-heading text-[var(--color-primary)] mb-6 pb-4 border-b border-[var(--color-border)]">Payment Method</h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {[
                                    { id: 'card', icon: 'fas fa-credit-card', label: 'Card' },
                                    { id: 'mpesa', icon: 'fas fa-mobile-alt', label: 'M-Pesa' },
                                    { id: 'paypal', icon: 'fab fa-paypal', label: 'PayPal' },
                                    { id: 'wallet', icon: 'fas fa-wallet', label: 'Wallet' }
                                ].map(method => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`flex flex-col items-center justify-center p-4 border transition-all rounded-xl ${paymentMethod === method.id
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] shadow-inner'
                                            : 'border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-secondary)]'}`}
                                    >
                                        <i className={`${method.icon} text-2xl mb-2`}></i>
                                        <span className="text-xs font-bold uppercase tracking-wider">{method.label}</span>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {paymentMethod === 'card' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-6 overflow-hidden"
                                    >
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Card Number</label>
                                            <input type="text" required placeholder="0000 0000 0000 0000" className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none bg-white" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Expiry Date</label>
                                                <input type="text" required placeholder="MM/YY" className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none bg-white" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">CVC</label>
                                                <input type="text" required placeholder="123" className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none bg-white" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {paymentMethod === 'mpesa' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-6 overflow-hidden"
                                    >
                                        <div className="bg-green-50 border border-green-100 p-4 rounded text-sm text-green-800 flex items-start gap-3">
                                            <i className="fas fa-info-circle mt-0.5"></i>
                                            <p>Enter your M-Pesa number below. You will receive an STK push on your phone to complete the payment.</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">M-Pesa Number</label>
                                            <input type="text" required placeholder="2547XXXXXXXX" pattern="^(2547|2541)\d{8}$" className="w-full h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none bg-white" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* Discounts */}
                        <section className="bg-white p-8 border border-[var(--color-border)] shadow-sm rounded-2xl">
                            <h3 className="text-xl font-heading text-[var(--color-primary)] mb-6 pb-4 border-b border-[var(--color-border)]">Discounts & Gift Cards</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Referral Code</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={referralInput}
                                            onChange={(e) => setReferralInput(e.target.value)}
                                            placeholder="REFERRAL123"
                                            className="flex-1 h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none bg-white border-r-0"
                                        />
                                        <button type="button" onClick={handleApplyReferral} className="h-12 px-6 border border-[var(--color-border)] border-l-0 bg-gray-50 hover:bg-gray-100 text-xs font-bold uppercase text-[var(--color-primary)] transition-colors rounded-r-full">Apply</button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Gift Card</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={giftCardInput}
                                            onChange={(e) => setGiftCardInput(e.target.value)}
                                            placeholder="GIFT-XXXX"
                                            className="flex-1 h-12 px-4 border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none bg-white border-r-0"
                                        />
                                        <button type="button" onClick={handleApplyGiftCard} className="h-12 px-6 border border-[var(--color-border)] border-l-0 bg-gray-50 hover:bg-gray-100 text-xs font-bold uppercase text-[var(--color-primary)] transition-colors">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="w-full lg:w-[35%]">
                        <div className="sticky top-32 bg-white p-8 border border-[var(--color-border)] shadow-2xl shadow-[var(--color-primary)]/5 rounded-3xl">
                            <h3 className="text-xl font-heading text-[var(--color-primary)] mb-6 pb-4 border-b border-[var(--color-border)]">Order Summary</h3>

                            {/* Items Preview */}
                            <div className="max-h-64 overflow-y-auto mb-6 pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-50 border border-[var(--color-border)] flex-shrink-0 rounded-lg overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-heading text-[var(--color-primary)] truncate">{item.name}</p>
                                            <p className="text-xs text-[var(--color-text-secondary)]">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="text-sm font-medium">KSh {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-[var(--color-primary)]">KSh {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-[var(--color-primary)]">
                                        {shippingMethod.price === 0 ? 'FREE' : `KSh ${shippingMethod.price.toLocaleString()}`}
                                    </span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>- KSh {discount.toLocaleString()}</span>
                                    </div>
                                )}
                                {giftCard && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Gift Card Balance</span>
                                        <span>- KSh {Math.min(giftCard.balance, subtotal - discount + shippingMethod.price).toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center py-4 border-t border-[var(--color-border)] mb-6">
                                <span className="text-lg font-heading text-[var(--color-primary)]">Total</span>
                                <span className="text-xl font-bold text-[var(--color-primary)]">KSh {total.toLocaleString()}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-[var(--color-primary)] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[var(--color-primary-dark)] transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Processing...
                                    </>
                                ) : (
                                    <>
                                        {paymentMethod === 'mpesa' ? 'Pay with M-Pesa' : 'Place Order'}
                                    </>
                                )}
                            </button>

                            <p className="text-center text-[10px] text-[var(--color-text-light)] mt-4 flex items-center justify-center gap-1">
                                <i className="fas fa-lock"></i> SSL Encrypted Payment
                            </p>
                        </div>
                    </div>

                </form>
            </div>
        </main>
    );
}
