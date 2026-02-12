"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileClient() {
    const router = useRouter();
    const { user, logout, updateUser, addAddress, updateAddress, deleteAddress, addPaymentMethod, deletePaymentMethod } = useAuth();
    const [activeSection, setActiveSection] = useState('personal-info');
    const [isUpdating, setIsUpdating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    // Modal & Form States
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(null);
    const [addressFormData, setAddressFormData] = useState({
        type: 'Home' as 'Home' | 'Work' | 'Other',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'Kenya',
        isDefault: false
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentFormData, setPaymentFormData] = useState({
        type: 'Visa' as 'Visa' | 'Mastercard' | 'M-Pesa',
        last4: '',
        expiryDate: '',
        phone: '',
        isDefault: false
    });

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '+254 700 000 000',
    });

    // Sync form with user data
    useEffect(() => {
        if (user) {
            const nameParts = (user.name || '').split(' ');
            setFormData({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                email: user.email || '',
                phone: user.phone || formData.phone
            });
        }
    }, [user]);

    if (!hasMounted) return null;

    const sections = [
        { id: 'personal-info', label: 'Personal Details', icon: 'far fa-user' },
        { id: 'orders', label: 'Order History', icon: 'fas fa-history' },
        { id: 'loyalty', label: 'Loyalty Club', icon: 'fas fa-crown' },
        { id: 'address', label: 'Shipping Address', icon: 'far fa-map' },
        { id: 'payment', label: 'Payment Methods', icon: 'far fa-credit-card' },
        { id: 'security', label: 'Account Security', icon: 'fas fa-shield-alt' },
        { id: 'logout', label: 'Sign Out', icon: 'fas fa-sign-out-alt' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const success = await updateUser({
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone
            });
            if (success) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        } catch (err) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            let success = false;
            if (editingAddress) {
                success = await updateAddress(editingAddress.id, addressFormData);
            } else {
                success = await addAddress(addressFormData);
            }
            if (success) {
                setShowAddressModal(false);
                setAddressFormData({ type: 'Home', street: '', city: 'Nairobi', state: 'Nairobi', zip: '', country: 'Kenya', isDefault: false });
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        } catch (err) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const success = await addPaymentMethod(paymentFormData);
            if (success) {
                setShowPaymentModal(false);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        } catch (err) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <main className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header */}
                <header className="mb-16">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-accent)] mb-4 block">Dashboard</span>
                    <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-primary-dark)]">
                        My Account
                    </h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Sidebar Navigation */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="sticky top-32 space-y-1">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => section.id === 'logout' ? handleLogout() : setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-l-2 ${activeSection === section.id ? 'bg-[var(--color-background-alt)] border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-light)] hover:text-[var(--color-primary)] hover:bg-gray-50'}`}
                                >
                                    <i className={`${section.icon} w-5`}></i>
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1">

                        {/* Success Notification */}
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 text-sm flex items-center justify-center gap-3 rounded-lg"
                                >
                                    <i className="fas fa-check-circle"></i>
                                    Your profile has been successfully updated.
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-center gap-3 rounded-lg"
                                >
                                    <i className="fas fa-exclamation-circle"></i>
                                    Failed to save changes. Please ensure you are logged in.
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Views */}
                        <div className="bg-white">

                            {/* Personal Information */}
                            {activeSection === 'personal-info' && (
                                <section className="animate-fade-in">
                                    <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-8">Personal Details</h3>

                                    <div className="mb-12 flex items-center gap-8">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-full bg-[var(--color-background-alt)] overflow-hidden border border-[var(--color-border)]">
                                                {user?.avatar ? (
                                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[var(--color-text-light)]">
                                                        <i className="fas fa-user text-3xl"></i>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                                                <i className="fas fa-camera text-xs"></i>
                                            </button>
                                        </div>
                                        <div>
                                            <h4 className="font-heading text-xl">{user?.name || 'Guest User'}</h4>
                                            <p className="text-sm text-[var(--color-text-light)]">{user?.email || 'No email provided'}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">First Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                                    className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                    className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Email Address</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Phone Number</label>
                                            <input
                                                type="text"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                            />
                                        </div>

                                        <button
                                            disabled={isUpdating}
                                            className="px-10 py-4 bg-[var(--color-primary-dark)] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-primary)] transition-all disabled:opacity-50 mt-6"
                                        >
                                            {isUpdating ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </form>
                                </section>
                            )}

                            {/* Orders */}
                            {activeSection === 'orders' && (
                                <section className="animate-fade-in">
                                    <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-8">Order History</h3>
                                    <div className="space-y-4">
                                        {[
                                            { id: 'ORD-7590', date: 'Feb 02, 2026', total: 12450, status: 'Shipped' },
                                            { id: 'ORD-6124', date: 'Jan 15, 2026', total: 4500, status: 'Delivered' }
                                        ].map(order => (
                                            <div key={order.id} className="p-6 border border-[var(--color-border)] rounded-2xl flex flex-wrap items-center justify-between gap-6 hover:border-[var(--color-primary)]/30 transition-all hover:shadow-xl hover:shadow-[var(--color-primary)]/5 bg-white">
                                                <div>
                                                    <span className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-widest block mb-1">{order.date}</span>
                                                    <h4 className="text-lg font-heading text-[var(--color-primary-dark)]">Order #{order.id}</h4>
                                                </div>
                                                <div className="flex items-center gap-12">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-[var(--color-text-light)] uppercase tracking-widest block mb-1">Total</span>
                                                        <span className="font-bold">KSh {order.total.toLocaleString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-[var(--color-text-light)] uppercase tracking-widest block mb-1">Status</span>
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] hover:underline">
                                                        Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Loyalty */}
                            {activeSection === 'loyalty' && (
                                <section className="animate-fade-in space-y-12">
                                    <div className="relative p-10 bg-[var(--color-primary-dark)] text-white overflow-hidden rounded-3xl shadow-2xl">
                                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block text-[var(--color-accent)]">Loyalty Level</span>
                                                <h3 className="text-4xl font-heading mb-2">
                                                    {(user?.loyaltyPoints || 0) >= 2000 ? 'Gold Member' : (user?.loyaltyPoints || 0) >= 1000 ? 'Silver Member' : 'Member'}
                                                </h3>
                                                <p className="text-white/60 text-sm font-light">You have earned {(user?.loyaltyPoints || 0).toLocaleString()} points so far.</p>
                                            </div>
                                            <div className="text-center md:text-right">
                                                <span className="text-6xl font-heading mb-2 block text-[var(--color-accent)]">
                                                    {(user?.loyaltyPoints || 0) % 1000}
                                                </span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest block">Available Points</span>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-8 bg-[var(--color-background-alt)] rounded-2xl border border-[var(--color-border)] shadow-sm">
                                            <h4 className="font-heading text-xl mb-4">Next Reward</h4>
                                            <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">Reach 1,000 points and get KSh 2,000 OFF your next purchase.</p>
                                            <div className="h-2 w-full bg-white rounded-full overflow-hidden mb-2">
                                                <div
                                                    className="h-full bg-[var(--color-accent)] transition-all duration-1000"
                                                    style={{ width: `${Math.min(((user?.loyaltyPoints || 0) % 1000) / 10, 100)}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-[10px] font-bold text-[var(--color-text-light)] uppercase tracking-widest">
                                                {(user?.loyaltyPoints || 0) % 1000} / 1000 Points to next level
                                            </p>
                                        </div>
                                        <div className="p-8 bg-white rounded-2xl border border-[var(--color-border)] flex flex-col justify-between shadow-sm">
                                            <h4 className="font-heading text-xl mb-4 text-[var(--color-primary-dark)]">Refer a Friend</h4>
                                            <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">Get 500 bonus points for every friend who signs up.</p>
                                            <button className="w-full py-4 border border-[var(--color-primary)] text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all">
                                                Get Invitation Link
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Address Management */}
                            {activeSection === 'address' && (
                                <section className="animate-fade-in">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-heading text-[var(--color-primary-dark)]">Shipping Addresses</h3>
                                        <button
                                            onClick={() => {
                                                setEditingAddress(null);
                                                setAddressFormData({ type: 'Home', street: '', city: 'Nairobi', state: 'Nairobi', zip: '', country: 'Kenya', isDefault: false });
                                                setShowAddressModal(true);
                                            }}
                                            className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] hover:underline"
                                        >
                                            + Add New Address
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {user?.addresses.map((address: any) => (
                                            <div key={address.id} className="p-6 border border-[var(--color-border)] rounded-2xl relative group hover:border-[var(--color-primary)]/30 transition-all hover:shadow-xl hover:shadow-[var(--color-primary)]/5 bg-white">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-8 h-8 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center text-[var(--color-primary)] text-xs">
                                                            <i className={address.type === 'Home' ? 'fas fa-home' : address.type === 'Work' ? 'fas fa-briefcase' : 'fas fa-map-marker-alt'}></i>
                                                        </span>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">{address.type}</span>
                                                        {address.isDefault && (
                                                            <span className="px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[8px] font-bold uppercase tracking-widest rounded">Default</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => {
                                                                setEditingAddress(address);
                                                                setAddressFormData({ ...address });
                                                                setShowAddressModal(true);
                                                            }}
                                                            className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors"
                                                        >
                                                            <i className="far fa-edit text-xs"></i>
                                                        </button>
                                                        <button
                                                            onClick={async () => {
                                                                if (confirm('Delete this address?')) {
                                                                    await deleteAddress(address.id);
                                                                }
                                                            }}
                                                            className="text-[var(--color-text-light)] hover:text-red-500 transition-colors"
                                                        >
                                                            <i className="far fa-trash-alt text-xs"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-bold text-sm">{user.name}</p>
                                                    <p className="text-sm text-[var(--color-text-light)]">{address.street}</p>
                                                    <p className="text-sm text-[var(--color-text-light)]">{address.city}, {address.state} {address.zip}</p>
                                                    <p className="text-sm text-[var(--color-text-light)]">{address.country}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Address Modal */}
                                    <AnimatePresence>
                                        {showAddressModal && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    onClick={() => setShowAddressModal(false)}
                                                    className="absolute inset-0 bg-[var(--color-primary-dark)]/40 backdrop-blur-sm"
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                                    className="relative w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
                                                >
                                                    <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-8">
                                                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                                                    </h3>
                                                    <form onSubmit={handleAddressSubmit} className="space-y-5">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Address Type</label>
                                                            <div className="flex gap-4">
                                                                {['Home', 'Work', 'Other'].map(type => (
                                                                    <button
                                                                        key={type}
                                                                        type="button"
                                                                        onClick={() => setAddressFormData({ ...addressFormData, type: type as any })}
                                                                        className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all rounded-full ${addressFormData.type === type ? 'bg-[var(--color-primary-dark)] text-white border-[var(--color-primary-dark)]' : 'border-[var(--color-border)] text-[var(--color-text-light)] hover:border-[var(--color-primary)]'}`}
                                                                    >
                                                                        {type}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Street Address</label>
                                                            <input
                                                                required
                                                                type="text"
                                                                value={addressFormData.street}
                                                                onChange={e => setAddressFormData({ ...addressFormData, street: e.target.value })}
                                                                className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">City</label>
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    value={addressFormData.city}
                                                                    onChange={e => setAddressFormData({ ...addressFormData, city: e.target.value })}
                                                                    className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Postal Code</label>
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    value={addressFormData.zip}
                                                                    onChange={e => setAddressFormData({ ...addressFormData, zip: e.target.value })}
                                                                    className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 py-2">
                                                            <input
                                                                type="checkbox"
                                                                id="default-addr"
                                                                checked={addressFormData.isDefault}
                                                                onChange={e => setAddressFormData({ ...addressFormData, isDefault: e.target.checked })}
                                                                className="w-4 h-4 accent-[var(--color-primary)]"
                                                            />
                                                            <label htmlFor="default-addr" className="text-xs text-[var(--color-text-light)]">Set as default shipping address</label>
                                                        </div>
                                                        <div className="flex gap-4 pt-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowAddressModal(false)}
                                                                className="flex-1 py-4 border border-[var(--color-border)] text-[var(--color-primary-dark)] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 transition-all"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                disabled={isUpdating}
                                                                className="flex-1 py-4 bg-[var(--color-primary-dark)] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-primary)] transition-all disabled:opacity-50"
                                                            >
                                                                {isUpdating ? 'Saving...' : (editingAddress ? 'Save Changes' : 'Add Address')}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </motion.div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </section>
                            )}

                            {/* Payment Management */}
                            {activeSection === 'payment' && (
                                <section className="animate-fade-in">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-heading text-[var(--color-primary-dark)]">Payment Methods</h3>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => {
                                                    setPaymentFormData({ type: 'Visa', last4: '', expiryDate: '', phone: '', isDefault: false });
                                                    setShowPaymentModal(true);
                                                }}
                                                className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] hover:underline"
                                            >
                                                + Add Card
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setPaymentFormData({ type: 'M-Pesa', phone: '+254', last4: '', expiryDate: '', isDefault: false });
                                                    setShowPaymentModal(true);
                                                }}
                                                className="text-[10px] font-bold uppercase tracking-widest text-green-600 hover:underline"
                                            >
                                                + Add M-Pesa
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {user?.paymentMethods.map((payment: any) => (
                                            <div key={payment.id} className="p-6 border border-[var(--color-border)] rounded-2xl flex items-center justify-between group hover:border-[var(--color-primary)]/30 transition-all hover:shadow-xl hover:shadow-[var(--color-primary)]/5 bg-white">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-lg bg-[var(--color-background-alt)] flex items-center justify-center text-xl">
                                                        <i className={payment.type === 'Visa' ? 'fab fa-cc-visa text-blue-800' : payment.type === 'Mastercard' ? 'fab fa-cc-mastercard text-red-600' : 'fas fa-mobile-alt text-green-600'}></i>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3">
                                                            <h4 className="font-bold text-sm">
                                                                {payment.type === 'M-Pesa' ? `M-Pesa (${payment.phone})` : `${payment.type} ending in ${payment.last4}`}
                                                            </h4>
                                                            {payment.isDefault && (
                                                                <span className="px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[8px] font-bold uppercase tracking-widest rounded">Primary</span>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-[var(--color-text-light)] uppercase tracking-widest mt-1">
                                                            {payment.type === 'M-Pesa' ? 'Mobile Payment' : `Expires ${payment.expiryDate}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        if (confirm('Remove this payment method?')) {
                                                            await deletePaymentMethod(payment.id);
                                                        }
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text-light)] hover:text-red-500"
                                                >
                                                    <i className="far fa-trash-alt text-xs"></i>
                                                </button>
                                            </div>
                                        ))}

                                        {user?.paymentMethods.length === 0 && (
                                            <div className="py-20 text-center border border-dashed border-[var(--color-border)] rounded-xl">
                                                <i className="far fa-credit-card text-4xl text-[var(--color-text-light)]/20 mb-4 block"></i>
                                                <p className="text-sm text-[var(--color-text-light)]">No payment methods saved yet.</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Modal */}
                                    <AnimatePresence>
                                        {showPaymentModal && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    onClick={() => setShowPaymentModal(false)}
                                                    className="absolute inset-0 bg-[var(--color-primary-dark)]/40 backdrop-blur-sm"
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                                    className="relative w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl"
                                                >
                                                    <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-8">
                                                        Add {paymentFormData.type}
                                                    </h3>
                                                    <form onSubmit={handlePaymentSubmit} className="space-y-5">
                                                        {paymentFormData.type !== 'M-Pesa' ? (
                                                            <>
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Card Number</label>
                                                                    <input
                                                                        required
                                                                        type="text"
                                                                        placeholder="**** **** **** ****"
                                                                        className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                                        onChange={e => setPaymentFormData({ ...paymentFormData, last4: e.target.value.slice(-4) })}
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Expiry Date</label>
                                                                        <input
                                                                            required
                                                                            placeholder="MM/YY"
                                                                            type="text"
                                                                            value={paymentFormData.expiryDate}
                                                                            onChange={e => setPaymentFormData({ ...paymentFormData, expiryDate: e.target.value })}
                                                                            className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">CVC</label>
                                                                        <input
                                                                            required
                                                                            placeholder="***"
                                                                            type="password"
                                                                            className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Phone Number</label>
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    value={paymentFormData.phone}
                                                                    onChange={e => setPaymentFormData({ ...paymentFormData, phone: e.target.value })}
                                                                    className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-3 py-2">
                                                            <input
                                                                type="checkbox"
                                                                id="default-pay"
                                                                checked={paymentFormData.isDefault}
                                                                onChange={e => setPaymentFormData({ ...paymentFormData, isDefault: e.target.checked })}
                                                                className="w-4 h-4 accent-[var(--color-primary)]"
                                                            />
                                                            <label htmlFor="default-pay" className="text-xs text-[var(--color-text-light)]">Set as primary payment method</label>
                                                        </div>
                                                        <div className="flex gap-4 pt-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPaymentModal(false)}
                                                                className="flex-1 py-4 border border-[var(--color-border)] text-[var(--color-primary-dark)] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 transition-all"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                disabled={isUpdating}
                                                                className="flex-1 py-4 bg-[var(--color-primary-dark)] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-primary)] transition-all disabled:opacity-50"
                                                            >
                                                                {isUpdating ? 'Processing...' : 'Save Payment'}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </motion.div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </section>
                            )}

                            {/* Security Section */}
                            {activeSection === 'security' && (
                                <section className="animate-fade-in">
                                    <h3 className="text-2xl font-heading text-[var(--color-primary-dark)] mb-8">Account Security</h3>
                                    <div className="max-w-2xl space-y-10">

                                        <div className="p-8 border border-[var(--color-border)] rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-4 mb-6">
                                                <i className="fas fa-lock text-[var(--color-accent)]"></i>
                                                <h4 className="font-heading text-xl text-[var(--color-primary-dark)]">Change Password</h4>
                                            </div>
                                            <form onSubmit={(e) => { e.preventDefault(); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }} className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Current Password</label>
                                                    <input type="password" required className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">New Password</label>
                                                        <input type="password" required className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all bg-[var(--color-background-alt)]/30" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-light)]">Confirm Password</label>
                                                        <input type="password" required className="w-full px-5 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border(--color-primary)] transition-all bg-[var(--color-background-alt)]/30" />
                                                    </div>
                                                </div>
                                                <button className="px-8 py-3 bg-[var(--color-primary-dark)] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-primary)] transition-all mt-4">
                                                    Update Password
                                                </button>
                                            </form>
                                        </div>

                                        <div className="p-8 border border-[var(--color-border)] rounded-2xl bg-red-50/20 border-red-100 flex items-center justify-between gap-8 shadow-sm">
                                            <div>
                                                <h4 className="font-heading text-lg text-red-700 mb-2">Delete Account</h4>
                                                <p className="text-sm text-red-600/70 leading-relaxed">Once you delete your account, all your data, including order history and loyalty points, will be permanently removed.</p>
                                            </div>
                                            <button className="px-6 py-3 border border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-red-600 hover:text-white transition-all whitespace-nowrap">
                                                Close Account
                                            </button>
                                        </div>

                                    </div>
                                </section>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
