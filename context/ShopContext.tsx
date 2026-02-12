"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Product } from '@/types';
import Notification from '@/components/Notification';

interface CartItem extends Product {
    quantity: number;
}

export interface Coupon {
    code: string;
    discount: number; // Percentage
    type: 'percentage' | 'fixed';
}

export interface ShippingMethod {
    id: string;
    name: string;
    price: number;
    estimate: string;
}

interface ShopContextType {
    cart: CartItem[];
    wishlist: Product[];
    savedItems: CartItem[];
    coupon: Coupon | null;
    shippingMethod: ShippingMethod;
    loyaltyPoints: number;
    referralCode: string | null;
    giftCard: { code: string; balance: number } | null;
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    saveForLater: (productId: number) => void;
    moveToCart: (productId: number) => void;
    removeSavedItem: (productId: number) => void;
    applyCoupon: (code: string) => boolean;
    removeCoupon: () => void;
    applyReferralCode: (code: string) => boolean;
    applyGiftCard: (code: string) => boolean;
    setShippingMethod: (method: ShippingMethod) => void;
    getCartSubtotal: () => number;
    getDiscountAmount: () => number;
    getCartTotal: () => number;
    clearCart: () => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: number) => boolean;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
    { id: 'standard', name: 'Standard Shipping', price: 500, estimate: '3-5 business days' },
    { id: 'cbd', name: 'Nairobi CBD Delivery', price: 0, estimate: 'Same Day (Place before 1PM)' },
    { id: 'express', name: 'Express Delivery', price: 1200, estimate: '1-2 business days' },
    { id: 'pickup', name: 'Store Pickup', price: 0, estimate: 'Ready in 2 hours' }
];

const VALID_COUPONS: Coupon[] = [
    { code: 'WELCOME10', discount: 10, type: 'percentage' },
    { code: 'BEAUTY20', discount: 20, type: 'percentage' },
    { code: 'FREESHIP', discount: 500, type: 'fixed' }
];

const VALID_GIFT_CARDS: Record<string, number> = {
    'GIFT500': 500,
    'GIFT1000': 1000,
    'GIFT5000': 5000
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [savedItems, setSavedItems] = useState<CartItem[]>([]);
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const [shippingMethod, setShippingMethodState] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
    const [loyaltyPoints, setLoyaltyPoints] = useState(150); // Starting points for demo
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [giftCard, setGiftCard] = useState<{ code: string; balance: number } | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

    const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
        setNotification({ message, type });
    };

    const addToCart = (product: Product, quantity: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
        showNotification(`${product.name} added to cart!`);
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const saveForLater = (productId: number) => {
        const itemToSave = cart.find(item => item.id === productId);
        if (itemToSave) {
            setSavedItems(prev => [...prev, itemToSave]);
            setCart(prev => prev.filter(item => item.id !== productId));
            showNotification(`${itemToSave.name} saved for later`, 'info');
        }
    };

    const moveToCart = (productId: number) => {
        const itemToMove = savedItems.find(item => item.id === productId);
        if (itemToMove) {
            setCart(prev => [...prev, itemToMove]);
            setSavedItems(prev => prev.filter(item => item.id !== productId));
            showNotification(`${itemToMove.name} moved back to cart`);
        }
    };

    const removeSavedItem = (productId: number) => {
        setSavedItems(prev => prev.filter(item => item.id !== productId));
    };

    const applyCoupon = (code: string) => {
        const found = VALID_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
        if (found) {
            setCoupon(found);
            showNotification(`Coupon ${found.code} applied!`);
            return true;
        }
        showNotification('Invalid coupon code', 'warning');
        return false;
    };

    const removeCoupon = () => {
        setCoupon(null);
    };

    const applyReferralCode = (code: string) => {
        if (code.length > 5) {
            setReferralCode(code);
            showNotification(`Referral code ${code} applied! 5% extra discount added.`);
            return true;
        }
        return false;
    };

    const applyGiftCard = (code: string) => {
        const balance = VALID_GIFT_CARDS[code.toUpperCase()];
        if (balance) {
            setGiftCard({ code, balance });
            showNotification(`Gift card applied! Balance: KSh ${balance.toLocaleString()}`);
            return true;
        }
        showNotification('Invalid gift card code', 'warning');
        return false;
    };

    const setShippingMethod = (method: ShippingMethod) => {
        setShippingMethodState(method);
    };

    const clearCart = () => {
        setCart([]);
        setCoupon(null);
        setGiftCard(null);
    };

    const getCartSubtotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getDiscountAmount = () => {
        let discount = 0;
        const subtotal = getCartSubtotal();

        // 1. Coupon Discount
        if (coupon) {
            if (coupon.type === 'percentage') {
                discount += (subtotal * coupon.discount) / 100;
            } else {
                discount += coupon.discount;
            }
        }

        // 2. Buy 2 Get 1 Free (B2G1)
        cart.forEach(item => {
            if (item.hasB2G1 && item.quantity >= 3) {
                const freeItemsCount = Math.floor(item.quantity / 3);
                discount += freeItemsCount * item.price;
            }
        });

        // 3. Referral Discount (5% extra)
        if (referralCode) {
            discount += (subtotal * 5) / 100;
        }

        return discount;
    };

    const getCartTotal = () => {
        const subtotal = getCartSubtotal();
        const discount = getDiscountAmount();
        const shipping = subtotal > 5000 && shippingMethod.id === 'standard' ? 0 : shippingMethod.price;

        let total = subtotal - discount + shipping;

        // 4. Gift Card Deduction
        if (giftCard) {
            total = Math.max(0, total - giftCard.balance);
        }

        return Math.max(0, total);
    };

    const toggleWishlist = (product: Product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                showNotification(`${product.name} removed from wishlist`, 'info');
                return prev.filter(item => item.id !== product.id);
            } else {
                showNotification(`${product.name} added to wishlist!`);
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (productId: number) => {
        return wishlist.some(item => item.id === productId);
    };

    return (
        <ShopContext.Provider value={{
            cart,
            wishlist,
            savedItems,
            coupon,
            shippingMethod,
            loyaltyPoints,
            referralCode,
            giftCard,
            addToCart,
            removeFromCart,
            updateQuantity,
            saveForLater,
            moveToCart,
            removeSavedItem,
            applyCoupon,
            removeCoupon,
            applyReferralCode,
            applyGiftCard,
            setShippingMethod,
            clearCart,
            getCartSubtotal,
            getDiscountAmount,
            getCartTotal,
            toggleWishlist,
            isInWishlist
        }}>
            {children}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
}
