import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import ProductCard from "@/components/ProductCard";
import MarketplaceClient from "./MarketplaceClient";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function MarketplacePage() {
  const products = await client.fetch(productsQuery);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-primary pt-24 pb-32">
        <div className="container mx-auto px-6 text-center text-white">
          <span className="bg-secondary/20 text-secondary border border-secondary/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">Direct From Source</span>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Cameroonian Farmer's Market</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Support local livelihoods. Purchase fresh, high-quality produce directly from our cooperative members across all 10 regions.
          </p>
        </div>
      </section>

      {/* Client Marketplace Logic */}
      <MarketplaceClient initialProducts={products} />

      {/* CTA Footer */}
      <section className="py-24 container mx-auto px-6 text-center">
         <div className="bg-secondary p-12 md:p-20 rounded-[3rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold font-poppins text-accent mb-6">Are you a Cooperative Member?</h2>
               <p className="text-accent/80 text-lg mb-10">List your seasonal harvests here and reach thousands of buyers in Douala and Yaoundé instantly.</p>
               <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg active:scale-95"
               >
                  Get Listed Today
                  <ShoppingBag className="w-5 h-5" />
               </Link>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-1000"></div>
         </div>
      </section>
    </div>
  );
}
