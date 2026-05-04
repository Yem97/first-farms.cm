import { client } from "@/sanity/lib/client";
import { advertPackagesQuery } from "@/sanity/lib/queries";
import { CheckCircle, BarChart3, TrendingUp, Users, Sprout, MessageSquare } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdvertisePage() {
  const packages = await client.fetch(advertPackagesQuery);

  const benefits = [
    { title: "Targeted Audience", desc: "Reach active farmers, wholesalers, and agricultural investors directly across 10 regions.", icon: Users },
    { title: "Brand Legitimacy", desc: "Associated your brand with Cameroon's most trusted agricultural cooperative.", icon: Sprout },
    { title: "Analytics Support", desc: "Monthly reports on impression counts and lead generation from your listings.", icon: BarChart3 },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Grow Your Agri-Business</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Market your tools, seeds, fertilizers, or services to the largest network of professional farmers in Cameroon.
          </p>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {benefits.map((b, i) => (
             <div key={i} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-secondary/10 rounded-[2rem] flex items-center justify-center text-secondary mb-8">
                   <b.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-poppins text-primary mb-4">{b.title}</h3>
                <p className="text-gray-500 leading-relaxed">{b.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold font-poppins text-primary mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
               {[
                 { step: "1", title: "Pick a Package", desc: "Choose the level of visibility that matches your budget." },
                 { step: "2", title: "Submit Assets", desc: "Send us your banner artwork or product descriptions." },
                 { step: "3", title: "Go Live", desc: "Your ads appear on our Marketplace and Newsletter." },
               ].map((s, i) => (
                 <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 h-full">
                    <span className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-6 mx-auto">{s.step}</span>
                    <h4 className="text-xl font-bold font-poppins text-primary mb-3">{s.title}</h4>
                    <p className="text-gray-500 text-sm">{s.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-16">Advertising Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.length > 0 ? (
            packages.map((pkg: any) => (
              <div key={pkg._id} className={`p-10 rounded-[2.5rem] flex flex-col h-full border transition-all hover:-translate-y-2 ${pkg.highlighted ? "bg-accent text-white shadow-2xl scale-105 z-10" : "bg-white border-gray-100 shadow-md"}`}>
                <h3 className={`text-2xl font-bold font-poppins mb-2 ${pkg.highlighted ? "text-secondary" : "text-primary"}`}>{pkg.name}</h3>
                <div className="mb-8">
                   <p className={`text-3xl font-bold ${pkg.highlighted ? "text-white" : "text-primary"}`}>{pkg.price}</p>
                   <p className={`text-sm font-medium ${pkg.highlighted ? "text-gray-400" : "text-gray-400"}`}>for {pkg.duration}</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                   {pkg.features?.map((f: string, j: number) => (
                     <li key={j} className="flex gap-3 text-sm">
                        <CheckCircle className={`w-5 h-5 shrink-0 ${pkg.highlighted ? "text-secondary" : "text-primary"}`} />
                        <span className={pkg.highlighted ? "text-gray-200" : "text-gray-600"}>{f}</span>
                     </li>
                   ))}
                </ul>
                <Link 
                   href="#inquiry-form" 
                   className={`w-full py-4 rounded-2xl text-center font-bold transition-all ${pkg.highlighted ? "bg-secondary text-accent hover:bg-white" : "bg-primary text-white hover:bg-accent"}`}
                >
                   Select {pkg.name}
                </Link>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center py-24 bg-gray-50 rounded-3xl">
                <p className="text-gray-400 italic">Self-service advertisement packages coming soon. Contact us for custom quotes.</p>
             </div>
          )}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-24 bg-primary/5 scroll-mt-20" id="inquiry-form">
         <div className="container mx-auto px-6 max-w-3xl">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
               <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-10">Advertisement Inquiry</h2>
               <form name="advertise-inquiry" method="POST" data-netlify="true" className="space-y-6">
                  <input type="hidden" name="form-name" value="advertise-inquiry" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 ml-1 text-left block">Contact Name</label>
                        <input type="text" name="name" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 ml-1 text-left block">Business Name</label>
                        <input type="text" name="business" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 ml-1 text-left block">Email Address</label>
                        <input type="email" name="email" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 ml-1 text-left block">Phone Number</label>
                        <input type="tel" name="phone" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                     </div>
                  </div>
                  <div className="space-y-1.5 text-left block">
                     <label className="text-sm font-bold text-gray-700 ml-1">Interested Package</label>
                     <select name="package" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none font-medium">
                        <option value="">Select Package</option>
                        {packages?.map((p:any) => <option key={p.name} value={p.name}>{p.name}</option>)}
                        <option value="Custom">Custom Quote / Other</option>
                     </select>
                  </div>
                  <div className="space-y-1.5 text-left block">
                     <label className="text-sm font-bold text-gray-700 ml-1">Your Message</label>
                     <textarea name="message" rows={4} className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-accent transition-all active:scale-95">
                     Send Advertising Inquiry
                  </button>
               </form>
            </div>
         </div>
      </section>
    </div>
  );
}
