"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, ShoppingBag } from "lucide-react";

interface MarketplaceClientProps {
  initialProducts: any[];
}

const categories = ["All", "Vegetables", "Fruits", "Grains & Legumes", "Livestock", "Fish & Seafood", "Processed", "Other"];

export default function MarketplaceClient({ initialProducts }: MarketplaceClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.farmerName && product.farmerName.toLowerCase().includes(search.toLowerCase())) ||
      (product.region && product.region.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-6 -mt-16 relative z-30">
      {/* Search and Filter Bar */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative w-full lg:flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by product, farmer, or region..."
              className="w-full bg-gray-50 border-gray-100 border-2 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary transition-colors text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
            <div className="flex items-center gap-2 shrink-0 mr-4 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Filter:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 border-2 ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-gray-500 border-gray-100 hover:border-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : initialProducts.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-white rounded-3xl shadow-sm border border-gray-100">
            <ShoppingBag className="w-10 h-10 mx-auto mb-4 text-gray-300" />
            <p className="text-xl font-bold text-gray-400">No listings yet</p>
            <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">
              Approved produce from cooperative members will appear here. Be the first to list yours.
            </p>
          </div>
        ) : (
          <div className="col-span-full py-32 text-center bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-xl font-bold text-gray-400">No products match your search.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-6 text-primary font-bold border-b border-primary"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {initialProducts.length > 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          Showing {filteredProducts.length} of {initialProducts.length} products
        </div>
      )}
    </div>
  );
}
