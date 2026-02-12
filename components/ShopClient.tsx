"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import PromoBanners from '@/components/PromoBanners';
import { allProducts } from '@/data/products';

export default function ShopClient() {
    const searchParams = useSearchParams();

    // Extract unique brands
    const brands = useMemo(() => {
        const unique = new Set(allProducts.map(p => p.brand));
        return Array.from(unique).sort();
    }, []);

    const categories = ['Moisturizers', 'Cleansers', 'Serums', 'Sunscreen', 'Sets & Bundles', 'Essence', 'Eye Care', 'Masks', 'Body Care', 'Treatments', 'Hair Care', 'Lip Care'].sort();
    const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal', 'Mature', 'All Skin Types'];
    const concerns = ['Acne / Breakouts', 'Anti-Aging', 'Dryness / Hydration', 'Brightening / Glow', 'Barrier Repair', 'Sensitivity', 'Dark Spots', 'Dark Circles', 'Redness', 'Oil Control / Pores', 'Fine Lines'];

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
    const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState(10000);
    const [sortOption, setSortOption] = useState('popular');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // Initialize from URL
    useEffect(() => {
        const catParam = searchParams.get('category');
        const brandParam = searchParams.get('brand');
        const qParam = searchParams.get('q');
        const priceParam = searchParams.get('price');
        const skinTypeParam = searchParams.get('skinType');
        const concernParam = searchParams.get('concern');

        // Reset page on URL change implies new filter/search
        setCurrentPage(1);

        if (catParam) {
            // Broad category mapping
            if (catParam === 'Skincare') {
                setSelectedCategories(['Serums', 'Moisturizers', 'Cleansers', 'Sunscreen', 'Treatments', 'Eye Care', 'Essence', 'Masks']);
            } else if (catParam === 'Body') {
                setSelectedCategories(['Body Care']);
            } else if (catParam === 'Sets') {
                setSelectedCategories(['Sets & Bundles']);
            } else {
                setSelectedCategories([catParam]);
            }
        }
        if (brandParam) setSelectedBrands([brandParam]);
        if (qParam) setSearchQuery(qParam);
        if (priceParam) setPriceRange(Number(priceParam));
        if (skinTypeParam) setSelectedSkinTypes([skinTypeParam]);
        if (concernParam) {
            const matchedConcern = concerns.find(c => c.includes(concernParam));
            if (matchedConcern) setSelectedConcerns([matchedConcern]);
        }
    }, [searchParams]);

    const toggleCategory = (category: string) => {
        setCurrentPage(1);
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    const toggleBrand = (brand: string) => {
        setCurrentPage(1);
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };

    const toggleSkinType = (type: string) => {
        setCurrentPage(1);
        setSelectedSkinTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };

    const toggleConcern = (concern: string) => {
        setCurrentPage(1);
        setSelectedConcerns(prev => prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]);
    };

    const clearAllFilters = () => {
        setCurrentPage(1);
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedSkinTypes([]);
        setSelectedConcerns([]);
        setSearchQuery('');
        setPriceRange(10000);
    }

    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // Filter by Search Query
        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerQ) ||
                p.brand.toLowerCase().includes(lowerQ) ||
                p.category.toLowerCase().includes(lowerQ)
            );
        }

        // Filter by Category
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        // Filter by Brand
        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand));
        }

        // Filter by Skin Type (Array Intersection)
        if (selectedSkinTypes.length > 0) {
            result = result.filter(p =>
                p.skinType && p.skinType.some(type => selectedSkinTypes.includes(type) || type === 'All Skin Types')
            );
        }

        // Filter by Concern (Array Intersection)
        if (selectedConcerns.length > 0) {
            result = result.filter(p =>
                p.concern && p.concern.some(c => selectedConcerns.includes(c))
            );
        }

        // Filter by Price
        result = result.filter(p => p.price <= priceRange);

        // Sort
        switch (sortOption) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => b.id - a.id);
                break;
            case 'alphabetical':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return result;
    }, [selectedCategories, selectedBrands, selectedSkinTypes, selectedConcerns, priceRange, sortOption, searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Filter UI Renderer (Reusable for Desktop & Mobile)
    const renderFilters = () => (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-primary-dark)] font-heading">Filters</h3>
                <button
                    onClick={clearAllFilters}
                    className="text-[10px] uppercase tracking-widest text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors underline font-primary"
                >
                    Clear All
                </button>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-4 font-heading">Category</h4>
                <ul className="space-y-2">
                    {categories.map(cat => (
                        <li key={cat}>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 border border-[var(--color-border)] flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'group-hover:border-[var(--color-primary)]'}`}>
                                    {selectedCategories.includes(cat) && <i className="fas fa-check text-white text-[8px]"></i>}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                />
                                <span className={`text-sm transition-colors font-primary ${selectedCategories.includes(cat) ? 'text-[var(--color-primary)] font-medium' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]'}`}>
                                    {cat}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-4 font-heading">Price</h4>
                <div className="px-2">
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-[var(--color-text-secondary)] font-primary uppercase tracking-wider">
                        <span>KSh 0</span>
                        <span>KSh {priceRange.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Brands */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-4 font-heading">Brand</h4>
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {brands.map(brand => (
                        <li key={brand}>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 border border-[var(--color-border)] flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'group-hover:border-[var(--color-primary)]'}`}>
                                    {selectedBrands.includes(brand) && <i className="fas fa-check text-white text-[8px]"></i>}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                />
                                <span className={`text-sm transition-colors font-primary ${selectedBrands.includes(brand) ? 'text-[var(--color-primary)] font-medium' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]'}`}>
                                    {brand}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <section className="pt-24 lg:pt-32 pb-24 min-h-screen bg-white">
            <div className="container mx-auto px-4 lg:px-6">

                {/* Mobile Filter Drawer */}
                <div className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileFilterOpen(false)} />

                <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-8 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-heading font-medium text-[var(--color-primary-dark)]">Filters</h3>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-8 h-8 flex items-center justify-center border border-[var(--color-border)] rounded-full text-[var(--color-text-secondary)]"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {renderFilters()}
                        </div>
                        <div className="pt-6 mt-4 border-t border-[var(--color-border)]">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full py-4 bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full font-primary"
                            >
                                Show {filteredProducts.length} Results
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Desktop Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
                        <div className="sticky top-32">
                            {renderFilters()}
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        {/* Top Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 lg:mb-12 pb-6 border-b border-[var(--color-border)]">

                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl font-heading font-medium text-[var(--color-primary-dark)]">
                                    {searchQuery ? `Search: ${searchQuery}` : selectedCategories.length === 1 ? selectedCategories[0] : 'Shop All'}
                                </h1>
                                <p className="text-[10px] text-[var(--color-text-secondary)] font-primary uppercase tracking-[0.2em]">
                                    {filteredProducts.length} curated essentials
                                </p>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <button
                                    className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-border)] text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] rounded-full font-primary"
                                    onClick={() => setIsMobileFilterOpen(true)}
                                >
                                    <i className="fas fa-filter"></i> Filters
                                </button>

                                <div className="relative flex-1 md:w-48 group">
                                    <select
                                        className="w-full appearance-none bg-transparent border-b border-[var(--color-border)] py-2 pr-8 pl-0 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer font-primary"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="alphabetical">Alphabetical</option>
                                    </select>
                                    <i className="fas fa-chevron-down absolute right-0 top-1/2 -translate-y-1/2 text-[8px] text-[var(--color-text-light)] pointer-events-none"></i>
                                </div>
                            </div>
                        </div>

                        {paginatedProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
                                    {paginatedProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-16 lg:mt-24 flex justify-center items-center gap-6">
                                        <button
                                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] disabled:opacity-20 hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 font-primary"
                                            disabled={currentPage === 1}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            <i className="fas fa-arrow-left text-[8px]"></i> Previous
                                        </button>

                                        <div className="flex items-center gap-3">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-bold transition-all ${currentPage === page ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-gray-100'}`}
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] disabled:opacity-20 hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 font-primary"
                                            disabled={currentPage === totalPages}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            Next <i className="fas fa-arrow-right text-[8px]"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-32 text-center max-w-sm mx-auto">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fas fa-search text-gray-300 text-xl"></i>
                                </div>
                                <h3 className="text-xl font-heading text-[var(--color-primary-dark)] mb-3">No Results Found</h3>
                                <p className="text-sm text-[var(--color-text-secondary)] font-light mb-8 font-primary">We couldn't find any products matching your current filters. Try refining your selection.</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-8 py-4 bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[var(--color-primary-dark)] transition-colors font-primary"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        <div className="mt-24">
                            <PromoBanners />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
