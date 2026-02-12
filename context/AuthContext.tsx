"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Address, PaymentMethod } from '@/types';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
    loyaltyPoints: number;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    socialLogin: (provider: 'google' | 'facebook') => Promise<boolean>;
    logout: () => void;
    updateUser: (data: Partial<User>) => Promise<boolean>;
    // Address Management
    addAddress: (address: Omit<Address, 'id'>) => Promise<boolean>;
    updateAddress: (id: string, address: Partial<Address>) => Promise<boolean>;
    deleteAddress: (id: string) => Promise<boolean>;
    // Payment Management
    addPaymentMethod: (payment: Omit<PaymentMethod, 'id'>) => Promise<boolean>;
    deletePaymentMethod: (id: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock session check
        const savedUser = localStorage.getItem('beautify_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (err) {
                console.error("AuthContext: Failed to parse user data", err);
                localStorage.removeItem('beautify_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockUser: User = {
            id: '1',
            name: email.split('@')[0],
            email: email,
            phone: '+254 700 000 000',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
            addresses: [
                { id: 'addr-1', type: 'Home', street: 'Riverside Drive', city: 'Nairobi', state: 'Nairobi', zip: '00100', country: 'Kenya', isDefault: true }
            ],
            paymentMethods: [
                { id: 'pay-1', type: 'Visa', last4: '4242', expiryDate: '12/26', isDefault: true }
            ],
            loyaltyPoints: 1250
        };

        setUser(mockUser);
        localStorage.setItem('beautify_user', JSON.stringify(mockUser));
        setIsLoading(false);
        return true;
    };

    const signup = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockUser: User = {
            id: '1',
            name: name,
            email: email,
            addresses: [],
            paymentMethods: [],
            loyaltyPoints: 0
        };

        setUser(mockUser);
        localStorage.setItem('beautify_user', JSON.stringify(mockUser));
        setIsLoading(false);
        return true;
    };

    const socialLogin = async (provider: 'google' | 'facebook') => {
        setIsLoading(true);
        // Simulate social Redirect/Auth
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockUser: User = {
            id: 'social-123',
            name: provider === 'google' ? 'Google User' : 'Facebook User',
            email: `social@${provider}.com`,
            avatar: provider === 'google'
                ? 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_\"G\"_logo.svg'
                : 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg',
            addresses: [],
            paymentMethods: [],
            loyaltyPoints: 0
        };

        setUser(mockUser);
        localStorage.setItem('beautify_user', JSON.stringify(mockUser));
        setIsLoading(false);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('beautify_user');
    };

    const updateUser = async (data: Partial<User>) => {
        if (!user) return false;
        await new Promise(resolve => setTimeout(resolve, 800));
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('beautify_user', JSON.stringify(updatedUser));
        return true;
    };

    const addAddress = async (address: Omit<Address, 'id'>) => {
        if (!user) return false;
        await new Promise(resolve => setTimeout(resolve, 800));
        const newAddress: Address = { ...address, id: `addr-${Date.now()}` };
        let updatedAddresses = [...user.addresses, newAddress];
        if (address.isDefault) {
            updatedAddresses = updatedAddresses.map(a =>
                a.id === newAddress.id ? a : { ...a, isDefault: false }
            );
        }
        return updateUser({ addresses: updatedAddresses });
    };

    const updateAddress = async (id: string, address: Partial<Address>) => {
        if (!user) return false;
        await new Promise(resolve => setTimeout(resolve, 800));
        let updatedAddresses = user.addresses.map(a =>
            a.id === id ? { ...a, ...address } : a
        );
        if (address.isDefault) {
            updatedAddresses = updatedAddresses.map(a =>
                a.id === id ? a : { ...a, isDefault: false }
            );
        }
        return updateUser({ addresses: updatedAddresses });
    };

    const deleteAddress = async (id: string) => {
        if (!user) return false;
        await new Promise(resolve => setTimeout(resolve, 800));
        return updateUser({ addresses: user.addresses.filter(a => a.id !== id) });
    };

    const addPaymentMethod = async (payment: Omit<PaymentMethod, 'id'>) => {
        if (!user) return false;
        await new Promise(resolve => setTimeout(resolve, 800));
        const newPayment: PaymentMethod = { ...payment, id: `pay-${Date.now()}` };
        let updatedPayments = [...user.paymentMethods, newPayment];
        if (payment.isDefault) {
            updatedPayments = updatedPayments.map(p =>
                p.id === newPayment.id ? p : { ...p, isDefault: false }
            );
        }
        return updateUser({ paymentMethods: updatedPayments });
    };

    const deletePaymentMethod = async (id: string) => {
        if (!user) return false;
        await new Promise(resolve => setTimeout(resolve, 800));
        return updateUser({ paymentMethods: user.paymentMethods.filter(p => p.id !== id) });
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            signup,
            socialLogin,
            logout,
            updateUser,
            addAddress,
            updateAddress,
            deleteAddress,
            addPaymentMethod,
            deletePaymentMethod
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
