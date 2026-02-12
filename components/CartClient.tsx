"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useShop, SHIPPING_METHODS } from '@/context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartClient() {
    const {
        cart,
        savedItems,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCart,
        removeSavedItem,
        getCartSubtotal,
        coupon,
        applyCoupon,
        removeCoupon,
        shippingMethod,
        setShippingMethod,
        getDiscountAmount,
        getCartTotal
    } = useShop();

    const [couponCode, setCouponCode] = useState('');

    const subtotal = getCartSubtotal();
    const discount = getDiscountAmount();
    const finalTotal = getCartTotal();

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        applyCoupon(couponCode);
        setCouponCode('');
    };

    if (cart.length === 0 && savedItems.length === 0) {
        return (
            <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 flex items-center justify-center">
                <div className="container mx-auto px-6 max-w-[1200px] text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-16 border border-[var(--color-border)] inline-block shadow-2xl rounded-3xl"
                    >
                        <i className="fas fa-shopping-bag text-5xl text-[var(--color-primary)] mb-8 block"></i>
                        <h2 className="text-3xl font-heading text-[var(--color-primary)] mb-4">Your Cart is Empty</h2>
                        <p className="text-[var(--color-text-secondary)] mb-8 font-light">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/shop" className="px-8 py-4 bg-[var(--color-primary)] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[var(--color-primary-dark)] transition-all inline-block">
                            Start Shopping
                        </Link>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#FAFAFA] min-h-screen pt-24 lg:pt-32 pb-16 lg:pb-24">
            <div className="container mx-auto px-4 lg:px-6 max-w-[1200px]">
                <h1 className="text-3xl lg:text-5xl font-heading text-[var(--color-primary)] mb-8 lg:mb-12 text-center">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Cart Items */}
                    <div className="w-full lg:w-[65%] space-y-12">
                        {cart.length > 0 ? (
                            <div className="space-y-6">
                                <div className="border-b border-[var(--color-border)] pb-4 hidden md:flex text-xs font-bold tracking-widest uppercase text-[var(--color-text-secondary)]">
                                    <span className="flex-1">Product</span>
                                    <span className="w-24 text-center">Qty</span>
                                    <span className="w-24 text-right">Total</span>
                                </div>
                                <AnimatePresence>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col md:flex-row gap-6 py-6 border-b border-[var(--color-border)] first:pt-0"
                                        >
                                            {/* Image */}
                                            <div className="w-24 h-24 bg-white border border-[var(--color-border)] flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-heading text-lg text-[var(--color-primary)] truncate pr-4">{item.name}</h4>
                                                        <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">{item.brand}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-[var(--color-text-light)] hover:text-red-500 transition-colors md:hidden"
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                                <p className="text-sm font-medium mb-4">KSh {item.price.toLocaleString()}</p>

                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => saveForLater(item.id)}
                                                        className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] underline decoration-gray-300 underline-offset-4"
                                                    >
                                                        Save for later
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-xs text-[var(--color-text-secondary)] hover:text-red-500 underline decoration-gray-300 underline-offset-4 hidden md:inline-block"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Qty & Price (Desktop) */}
                                            <div className="flex items-center justify-between md:flex-col md:items-end md:justify-start gap-4 md:w-24">
                                                <div className="flex items-center border border-[var(--color-border)] h-8 w-24">
                                                    <button
                                                        className="w-8 h-full flex items-center justify-center text-[var(--color-primary)] hover:bg-gray-50 text-xs"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >-</button>
                                                    <span className="flex-1 text-center text-xs font-medium">{item.quantity}</span>
                                                    <button
                                                        className="w-8 h-full flex items-center justify-center text-[var(--color-primary)] hover:bg-gray-50 text-xs"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >+</button>
                                                </div>
                                                <span className="font-bold text-[var(--color-primary)] md:text-right w-24">
                                                    KSh {(item.price * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="bg-white p-8 border border-[var(--color-border)] text-center rounded-2xl shadow-sm">
                                <p className="text-[var(--color-text-secondary)]">Your shopping cart is currently empty.</p>
                            </div>
                        )}

                        {/* Saved for Later */}
                        {savedItems.length > 0 && (
                            <div className="pt-12 border-t border-[var(--color-border)]">
                                <h3 className="text-xl font-heading text-[var(--color-primary)] mb-6">Saved For Later ({savedItems.length})</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {savedItems.map(item => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-white border border-[var(--color-border)] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-gray-50 border border-[var(--color-border)] flex-shrink-0 rounded-lg overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-heading text-sm text-[var(--color-primary)] truncate">{item.name}</h4>
                                                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">KSh {item.price.toLocaleString()}</p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <button
                                                        onClick={() => moveToCart(item.id)}
                                                        className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                                                    >
                                                        Move to Cart
                                                    </button>
                                                    <button
                                                        onClick={() => removeSavedItem(item.id)}
                                                        className="text-[10px] text-[var(--color-text-light)] hover:text-red-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary (Sticky) */}
                    <div className="w-full lg:w-[35%]">
                        <div className="sticky top-32 bg-white p-8 border border-[var(--color-border)] shadow-2xl shadow-[var(--color-primary)]/5 rounded-3xl">
                            <h3 className="text-xl font-heading text-[var(--color-primary)] mb-6 pb-4 border-b border-[var(--color-border)]">Order Summary</h3>

                            {/* B2G1 Notification */}
                            {cart.some(item => item.hasB2G1) && (
                                <div className="bg-purple-50 border border-purple-100 p-3 mb-6 flex items-start gap-3">
                                    <i className="fas fa-magic text-purple-600 mt-0.5"></i>
                                    <p className="text-xs text-purple-700 leading-snug">
                                        {cart.some(item => item.hasB2G1 && item.quantity >= 3)
                                            ? "B2G1 Free applied to Mist products!"
                                            : "Add 2+ Mists to get 1 FREE!"}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-4 mb-6 text-sm text-[var(--color-text-secondary)]">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-[var(--color-primary)]">KSh {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-[var(--color-primary)]">
                                        {subtotal > 5000 && shippingMethod.id === 'standard' ? 'FREE' : `KSh ${shippingMethod.price.toLocaleString()}`}
                                    </span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>- KSh {discount.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Shipping Options */}
                            <div className="mb-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-3">Shipping Method</span>
                                <div className="space-y-2">
                                    {SHIPPING_METHODS.map(method => (
                                        <button
                                            key={method.id}
                                            className={`w-full flex items-center justify-between p-3 border text-left transition-all rounded-xl ${shippingMethod.id === method.id
                                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                                : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                                                }`}
                                            onClick={() => setShippingMethod(method)}
                                        >
                                            <div>
                                                <span className="text-xs font-bold block text-[var(--color-primary)]">{method.name}</span>
                                                <span className="text-[10px] text-[var(--color-text-light)]">{method.estimate}</span>
                                            </div>
                                            <span className="text-xs font-medium">
                                                {subtotal > 5000 && method.id === 'standard' ? 'FREE' : `KSh ${method.price.toLocaleString()}`}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Coupon */}
                            <div className="mb-8">
                                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] block mb-3">Promo Code</span>
                                {coupon ? (
                                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100">
                                        <span className="text-xs font-bold text-green-700 flex items-center gap-2">
                                            <i className="fas fa-tag"></i> {coupon.code}
                                        </span>
                                        <button onClick={removeCoupon} className="text-[10px] text-red-500 hover:underline">Remove</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="flex-1 h-10 border border-[var(--color-border)] px-3 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-transparent"
                                        />
                                        <button type="submit" className="h-10 px-6 bg-[var(--color-primary)] border border-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[var(--color-primary-dark)] transition-colors">
                                            Apply
                                        </button>
                                    </form>
                                )}
                            </div>

                            <div className="flex justify-between items-center py-4 border-t border-[var(--color-border)] mb-6">
                                <span className="text-lg font-heading text-[var(--color-primary)]">Total</span>
                                <span className="text-xl font-bold text-[var(--color-primary)]">KSh {finalTotal.toLocaleString()}</span>
                            </div>

                            <Link
                                href="/checkout"
                                className={`w-full block text-center py-4 bg-[var(--color-primary)] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[var(--color-primary-dark)] transition-all shadow-md hover:shadow-lg ${cart.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                Proceed to Checkout
                            </Link>

                            <p className="text-center mt-4">
                                <Link href="/shop" className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] underline decoration-gray-300 underline-offset-4">
                                    Continue Shopping
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
