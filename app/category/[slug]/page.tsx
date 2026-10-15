import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryClient from "./CategoryClient";

async function getCategoryProducts(slug: string) {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`,
      { next: { revalidate: 60 } },
    );
    const data = await res.json();
    return data?.data || data || [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getCategoryProducts(slug);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60">
      <Navbar />
      <main className="flex-grow">
        <CategoryClient slug={slug} initialProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
