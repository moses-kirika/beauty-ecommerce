import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Our Story | Nature's Wisdom & Scientific Efficacy",
    description: "Discover the philosophy behind Beautify. We prioritize transparency, efficacy, and sustainability in every luxury skincare ritual we curate.",
};

export default function AboutPage() {
    return (
        <main className="pt-24 pb-20">
            {/* Story Section */}
            <section className="container mx-auto px-6 mb-32">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <img
                                src="/images/products/unsplash-1594744803329-e58b31de8bf5.jpg"
                                alt="Our Heritage"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 block">Our Essence</span>
                        <h1 className="text-5xl md:text-6xl font-heading font-medium text-[var(--color-primary-dark)] mb-8 leading-none">
                            Nature's <br /> <span className="italic text-[var(--color-accent)]">Wisdom.</span>
                        </h1>
                        <div className="space-y-6 text-[var(--color-text-secondary)] font-light leading-relaxed text-lg">
                            <p>
                                Beautify began with a simple idea: that skincare shouldn't be complicated. Frustrated by long
                                lists of unpronounceable ingredients, our founder set out to create effective products using the
                                power of nature.
                            </p>
                            <p>
                                What started in a small kitchen has grown into a community of skincare enthusiasts who value
                                transparency, efficacy, and sustainability. We're challenging the industry standards one bottle
                                at a time.
                            </p>
                        </div>
                        <div className="mt-12">
                            <img src="/images/products/unsplash-1556228720-195a672e8a03.jpg"
                                alt="Product Detail" className="h-24 opacity-60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-[var(--color-background-alt)] py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary-dark)] mb-6">Our Philosophy</h2>
                        <div className="w-20 h-px bg-[var(--color-accent)] mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center text-3xl text-[var(--color-accent)] shadow-sm group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500">
                                <i className="fas fa-leaf"></i>
                            </div>
                            <h3 className="text-xl font-heading text-[var(--color-primary-dark)] mb-4">100% Natural</h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed font-light">
                                We use only the finest natural ingredients, sourced responsibly from around the globe.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center text-3xl text-[var(--color-accent)] shadow-sm group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500">
                                <i className="fas fa-paw"></i>
                            </div>
                            <h3 className="text-xl font-heading text-[var(--color-primary-dark)] mb-4">Cruelty Free</h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed font-light">
                                None of our products or ingredients are ever tested on animals. We are proudly Leaping Bunny certified.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center text-3xl text-[var(--color-accent)] shadow-sm group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500">
                                <i className="fas fa-recycle"></i>
                            </div>
                            <h3 className="text-xl font-heading text-[var(--color-primary-dark)] mb-4">Sustainable</h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed font-light">
                                Our packaging is 100% recyclable and we offset our carbon footprint for every shipment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
