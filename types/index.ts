export interface Review {
    id: number;
    userName: string;
    rating: number;
    date: string;
    comment: string;
}

export interface Variant {
    type: 'shade' | 'size' | 'pack';
    name: string;
    value: string;
    inStock: boolean;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    reviewsCount: number;
    reviews: Review[];
    description?: string;
    image: string;
    images: string[];
    videoUrl?: string;
    category: string;
    onSale: boolean;
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    ingredients: string;
    usageInstructions: string;
    howToApply: string;
    variants?: Variant[];
    faqs?: FAQ[];
    // Care & Categorization
    skinType?: string[]; // e.g. ['Oily', 'Combination']
    concern?: string[]; // e.g. ['Acne', 'Anti-Aging']
    // Marketing & Growth Fields
    isBundle?: boolean;
    bundleItems?: number[]; // IDs of products in the bundle
    flashSale?: {
        endTime: string;
        discountedPrice: number;
    };
    hasB2G1?: boolean; // Buy 2 Get 1 Free offer
}

export interface Address {
    id: string;
    type: 'Home' | 'Work' | 'Other';
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    type: 'Visa' | 'Mastercard' | 'M-Pesa';
    cardNumber?: string;
    expiryDate?: string;
    phone?: string;
    last4?: string;
    isDefault: boolean;
}

