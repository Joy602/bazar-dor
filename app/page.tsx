import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 60 },
      },
    );
    const data = await res.json();
    return data?.data || data || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // Top 6 Risers (দাম বেড়েছে)
  const risers = [...products]
    .filter((p) => (p.change ?? 0) > 0)
    .sort((a, b) => (b.change ?? 0) - (a.change ?? 0))
    .slice(0, 6);

  // Top 6 Fallers (দাম কমেছে)
  const fallers = [...products]
    .filter((p) => (p.change ?? 0) < 0)
    .sort((a, b) => (a.change ?? 0) - (b.change ?? 0))
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60">
      <Navbar />
      <main className="flex-grow space-y-12 pb-16">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Section A: আজ দাম বেড়েছে */}
          {risers.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-rose-600 text-xl font-bold">▲</span>
                <h2 className="text-2xl font-bold text-gray-900">
                  আজ দাম বেড়েছে
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {risers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Section B: আজ দাম কমেছে */}
          {fallers.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 text-xl font-bold">▼</span>
                <h2 className="text-2xl font-bold text-gray-900">
                  আজ দাম কমেছে
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {fallers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Section C: সব পণ্য */}
          <section id="সব-পণ্য" className="space-y-4 pt-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
              <p className="text-sm text-gray-500">
                বাজারের নিত্যপ্রয়োজনীয় পণ্যের বর্তমান তালিকা
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
