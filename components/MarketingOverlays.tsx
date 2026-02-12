"use client";

import { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { usePathname } from 'next/navigation';

export default function MarketingOverlays() {
    const { cart } = useShop();
    const pathname = usePathname();
    const [showAbandoned, setShowAbandoned] = useState(false);
    const [showPWA, setShowPWA] = useState(false);

    useEffect(() => {
        // Exit intent simulation
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && cart.length > 0 && !localStorage.getItem('abandoned_shown')) {
                setShowAbandoned(true);
                localStorage.setItem('abandoned_shown', 'true');
            }
        };

        // PWA prompt simulation after 10 seconds
        const pwaTimer = setTimeout(() => {
            if (!localStorage.getItem('pwa_prompted')) {
                setShowPWA(true);
                localStorage.setItem('pwa_prompted', 'true');
            }
        }, 10000);

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(pwaTimer);
        };
    }, [cart.length]);

    if (pathname === '/login' || pathname === '/signup') return null;

    return (
        <>
            {/* Abandoned Cart Modal */}
            {showAbandoned && (
                <div className="marketing-modal-bg" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="marketing-modal" style={{ background: 'white', maxWidth: '450px', width: '100%', borderRadius: '20px', padding: '40px', textAlign: 'center', position: 'relative' }}>
                        <button style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }} onClick={() => setShowAbandoned(false)}>&times;</button>
                        <div style={{ fontSize: '4rem', color: '#f59e0b', marginBottom: '20px' }}><i className="fas fa-shopping-basket"></i></div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Don't Leave Your Glow Behind!</h2>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '30px' }}>We've saved the items in your cart. Complete your purchase now and get **FREE EXPRESS SHIPPING**.</p>
                        <div style={{ background: '#fef3c7', padding: '15px', borderRadius: '10px', fontWeight: 'bold', color: '#92400e', marginBottom: '30px', border: '1px dashed #f59e0b' }}>
                            CODE: FLASH-SHIP
                        </div>
                        <button className="btn btn-primary rounded-full" style={{ width: '100%' }} onClick={() => setShowAbandoned(false)}>Back to Cart</button>
                    </div>
                </div>
            )}

            {/* PWA Prompt */}
            {showPWA && (
                <div className="pwa-prompt" style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', maxWidth: '400px', background: 'white', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '20px', zIndex: 999, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '15px', animation: 'slideUp 0.5s ease' }}>
                    <div style={{ width: '50px', height: '50px', background: 'var(--color-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>
                        <i className="fas fa-spa"></i>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', margin: 0 }}>Install Beauty Co.</h4>
                        <p style={{ fontSize: '12px', margin: '2px 0 0', color: 'var(--color-text-light)' }}>Shop faster and get exclusive App-only offers.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-light)' }} onClick={() => setShowPWA(false)}>Maybe later</button>
                        <button className="btn btn-primary btn-sm rounded-full" style={{ padding: '6px 12px' }} onClick={() => { alert('PWA Installed (Simulated)'); setShowPWA(false); }}>Install</button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </>
    );
}
