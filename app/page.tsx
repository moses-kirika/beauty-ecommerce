import Link from 'next/link';
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import PromoBanners from "@/components/PromoBanners";
import { popularProducts, dealProducts } from "@/data/products";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "Beautify Hub | Curated Luxury Skincare & Ethical Beauty"
  },
  description: "Experience a higher standard of self-care. Discover our curated collection of luxury skincare rituals, where scientific efficacy meets nature's wisdom.",
};

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />

      {/* Categories Section */}
      <section className="py-24" id="categories">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-4 block">Discover</span>
            <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary-dark)]">Shop by Category</h2>
          </div>

          <div className="relative group/scroll">
            <div className="flex overflow-x-auto pb-10 md:pb-0 md:flex-wrap justify-start md:justify-center gap-6 md:gap-12 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 snap-x touch-pan-x">
              {[
                { name: 'Moisturizer', href: "/shop?category=Moisturizers", img: "/images/products/unsplash-1556228720-195a672e8a03.jpg" },
                { name: 'Cleanser', href: "/shop?category=Cleansers", img: "/images/products/unsplash-1571875257727-256c39da42af.jpg" },
                { name: 'Serums', href: "/shop?category=Serums", img: "/images/products/unsplash-1611930022073-b7a4ba5fcccd.jpg" },
                { name: 'Sunscreen', href: "/shop?category=Sunscreen", img: "/images/products/unsplash-1556229010-6c3f2c9ca5f8.jpg" },
                { name: 'Sets', href: "/shop?category=Sets", img: "/images/products/unsplash-1608248543803-ba4f8c70ae0b.jpg" },
              ].map((cat) => (
                <Link key={cat.name} href={cat.href} className="group flex-shrink-0 w-[40%] md:w-auto flex flex-col items-center gap-4 md:gap-6 snap-center">
                  <div className="w-full aspect-square md:w-40 md:h-40 rounded-full overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-all duration-700 p-1.5 md:p-2">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>
                  </div>
                  <p className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] uppercase transition-colors text-center">{cat.name}</p>
                </Link>
              ))}
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="flex justify-center items-center gap-2 mt-2 md:hidden">
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-light)]">Swipe to explore</span>
              <div className="w-12 h-[1px] bg-[var(--color-border)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[var(--color-accent)] animate-scroll-hint"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 md:py-32 bg-[var(--color-background-alt)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2 relative group">
              <div className="aspect-[4/5] overflow-hidden relative rounded-2xl md:rounded-none">
                <img
                  src="/images/products/unsplash-1608571423902-eed4a5ad8108.jpg"
                  alt="Sustainable skincare products"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 bg-white p-6 lg:p-8 max-w-[240px] lg:max-w-xs shadow-xl rounded-lg lg:rounded-none">
                <p className="font-heading text-lg lg:text-2xl text-[var(--color-primary-dark)] leading-snug">"Beauty that cares for you and the planet."</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 pt-12 lg:pt-0 text-center lg:text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-accent)] uppercase mb-6 block">Our Commitment</span>
              <h3 className="text-3xl md:text-5xl font-heading text-[var(--color-primary-dark)] mb-8 leading-tight">
                Conscious Beauty <br className="hidden md:block" /> for Modern Living
              </h3>
              <div className="space-y-6 text-[var(--color-text-secondary)] font-light text-base lg:text-lg mb-10 leading-relaxed">
                <p>
                  We believe in creating products that are not only effective but also ethically sourced.
                  Every bottle tells a story of sustainability, from our biodegradable packaging to our cruelty-free formulas.
                </p>
              </div>
              <Link href="/about" className="inline-block px-10 py-4 bg-[var(--color-primary)] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-[var(--color-primary-dark)] transition-all shadow-lg hover:shadow-xl">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-24 bg-white" id="shop">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-6 mb-16">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-accent)] uppercase mb-4 block">Trending</span>
              <h3 className="text-3xl md:text-5xl font-heading text-[var(--color-primary-dark)]">
                Most Loved
              </h3>
            </div>
            <Link href="/shop" className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors uppercase border-b border-[var(--color-primary)] hover:border-[var(--color-accent)] pb-1">
              View All Collection
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-6 lg:gap-y-12">
            {popularProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <PromoBanners />

      {/* Best Deals */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-accent)] mb-4 block">Exclusive Offers</span>
            <h2 className="text-3xl md:text-5xl font-heading text-[var(--color-primary-dark)]">Limited Editions</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 lg:gap-6 lg:gap-y-12">
            {dealProducts.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
