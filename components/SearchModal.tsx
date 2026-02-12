"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
    onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => inputRef.current?.focus(), 100);

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            clearTimeout(timer);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleSearch = (term: string) => {
        if (!term.trim()) return;
        handleClose();
        router.push(`/shop?q=${encodeURIComponent(term)}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(e.currentTarget.value);
        }
    };

    return (
        <div className={`fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4 transition-all duration-300 ${isVisible ? 'bg-white/95 backdrop-blur-md opacity-100' : 'bg-transparent opacity-0 pointer-events-none'}`}>
            <button
                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-background-alt)] transition-colors"
                onClick={handleClose}
                aria-label="Close search"
            >
                <i className="fas fa-times text-xl text-[var(--color-text-primary)]"></i>
            </button>

            <div className={`w-full max-w-2xl transform transition-all duration-500 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="relative mb-12">
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent border-b-2 border-[var(--color-border)] text-3xl md:text-5xl font-heading font-medium text-[var(--color-primary-dark)] py-4 pl-0 pr-12 focus:outline-none focus:border-[var(--color-primary)] placeholder:text-[var(--color-text-light)] placeholder:opacity-50 transition-colors"
                        placeholder="Search..."
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                        onClick={() => inputRef.current && handleSearch(inputRef.current.value)}
                    >
                        <i className="fas fa-arrow-right text-2xl"></i>
                    </button>
                </div>

                <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-text-light)] mb-6">Popular Searches</p>
                    <div className="flex flex-wrap gap-3">
                        {['Vitamin C Serum', 'Moisturizer', 'Sunscreen', 'Anti-aging', 'Cleanser'].map(tag => (
                            <button
                                key={tag}
                                className="px-6 py-2 rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300"
                                onClick={() => handleSearch(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
