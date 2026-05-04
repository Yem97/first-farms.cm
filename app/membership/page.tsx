import { ShieldCheck, TrendingUp, Truck, Users, ChevronRight, CheckCircle, GraduationCap, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function MembershipPage() {
  const regions = [
    "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral", "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest"
  ];

  const benefits = [
    { title: "Direct Access to Markets", desc: "Sell your produce directly to city hubs and exporters without predatory middlemen.", icon: TrendingUp },
    { title: "Training & Resources", desc: "Weekly workshops on climate-smart farming and modern irrigation techniques.", icon: GraduationCap },
    { title: "Group Input Purchasing", desc: "Save up to 30% on high-quality seeds, fertilizers, and tools through bulk ordering.", icon: ShoppingBag },
    { title: "Logistics Support", desc: "Access to cooperative trucks and storage facilities in major regional hubs.", icon: Truck },
    { title: "Legal & Advocacy", desc: "We protect your rights as a farmer and represent your interests at national levels.", icon: ShieldCheck },
    { title: "Financial Aid", desc: "Access to cooperative micro-loans and credit schemes for facility upgrades.", icon: Users },
  ];

  const tiers = [
    {
      name: "Individual Farmer",
      price: "10,000 XAF / year",
      features: ["Access to marketplace", "Training access", "Cooperative voting rights", "Regional storage use"],
      cta: "Register Individually",
      highlight: false
    },
    {
      name: "Farmer Group",
      price: "50,000 XAF / year",
      features: ["Up to 10 members", "Reduced group logistics fees", "Dedicated coordinator", "Priority input access"],
      cta: "Register Your Group",
      highlight: true
    },
    {
      name: "Premium Partner",
      price: "Custom / Contact Us",
      features: ["Corporate sponsorship", "Large scale logisitics", "Priority sourcing", "Branding opportunities"],
      cta: "Contact Partnerships",
      highlight: false
    }
  ];

  const faq = [
    { q: "What are the requirements to join?", a: "You must be an active farmer in Cameroon, agree to our quality standards, and pay the annual membership fee." },
    { q: "Can I join if I only have a small garden?", a: "Yes! We support farmers of all scales, from backyard gardeners to massive estate owners." },
    { q: "How do I get my products to the marketplace?", a: "Once registered, we help you transport your goods to one of our regional collection points." },
    { q: "What regions do you cover?", a: "We currently have collection points in all 10 regions of Cameroon, with hubs in Douala and Yaoundé." },
    { q: "How are payments handled?", a: "Payments are made via Mobile Money (OM/MoMo) or direct bank transfer within 48 hours of sale." }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary/10 py-24 border-b border-secondary/20">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 inline-block">Strength in Numbers</span>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins text-primary mb-6">Join the Cooperative</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Take control of your agricultural future. Join over 500+ Cameroonian farmers growing together.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-16">Member Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 group hover:shadow-xl transition-all">
               <div className="bg-secondary/10 p-4 rounded-2xl text-secondary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <b.icon className="w-8 h-8" />
               </div>
               <div>
                  <h4 className="text-xl font-bold font-poppins text-primary mb-3">{b.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Join */}
      <section className="py-24 bg-primary text-white">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold font-poppins mb-16">Simple 4-Step Registration</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                 { step: "01", title: "Apply Online", desc: "Fill out the registration form below." },
                 { step: "02", title: "Face Verification", desc: "Visit your regional hub for a quick check." },
                 { step: "03", title: "Pay Dues", desc: "Pay your annual fee via Mobile Money." },
                 { step: "04", title: "Start Selling", desc: "List your products and join trainings!" },
               ].map((s, i) => (
                 <div key={i} className="relative">
                    <span className="text-8xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2">{s.step}</span>
                    <div className="relative z-10">
                       <h4 className="text-xl font-bold font-poppins text-secondary mb-3">{s.title}</h4>
                       <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                    {i < 3 && <div className="hidden md:block absolute top-10 -right-4 text-white/20"><ChevronRight /></div>}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-16">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {tiers.map((t, i) => (
             <div key={i} className={`p-10 rounded-[2.5rem] flex flex-col h-full border ${t.highlight ? "bg-accent text-white border-accent shadow-2xl scale-105 z-10" : "bg-white border-gray-100 shadow-md"}`}>
                <h3 className={`text-2xl font-bold font-poppins mb-2 ${t.highlight ? "text-secondary" : "text-primary"}`}>{t.name}</h3>
                <p className={`text-xl font-bold mb-8 ${t.highlight ? "text-white" : "text-gray-400"}`}>{t.price}</p>
                <ul className="space-y-4 mb-10 flex-grow">
                   {t.features.map((f, j) => (
                     <li key={j} className="flex gap-3 text-sm">
                        <CheckCircle className={`w-5 h-5 shrink-0 ${t.highlight ? "text-secondary" : "text-primary"}`} />
                        <span className={t.highlight ? "text-gray-300" : "text-gray-600"}>{f}</span>
                     </li>
                   ))}
                </ul>
                <Link 
                  href="#registration-form" 
                  className={`w-full py-4 rounded-2xl text-center font-bold transition-all active:scale-95 ${t.highlight ? "bg-secondary text-accent hover:bg-white" : "bg-primary text-white hover:bg-accent"}`}
                >
                   {t.cta}
                </Link>
             </div>
           ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-gray-50 scroll-mt-20" id="registration-form">
        <div className="container mx-auto px-6 max-w-3xl">
           <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-4">Registration Form</h2>
              <p className="text-center text-gray-400 mb-10">All fields are required. We will contact you within 2 business days.</p>
              
              <form 
                name="membership-registration" 
                method="POST" 
                data-netlify="true" 
                className="space-y-6"
              >
                 <input type="hidden" name="form-name" value="membership-registration" />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                       <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                       <input type="text" name="name" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                       <input type="tel" name="phone" required placeholder="e.g. 6XX XXX XXX" className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input type="email" name="email" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                       <label className="text-sm font-bold text-gray-700 ml-1">Region</label>
                       <select name="region" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none">
                          <option value="">Select Region</option>
                          {regions.map(r => <option key={r} value={r}>{r}</option>)}
                       </select>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-sm font-bold text-gray-700 ml-1">Type of Farming</label>
                       <select name="type" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none">
                          <option value="">Select Primary Type</option>
                          <option value="Vegetables">Vegetables</option>
                          <option value="Cocoa">Cocoa / Coffee</option>
                          <option value="Livestock">Livestock</option>
                          <option value="Grains">Grains & Legumes</option>
                          <option value="Fruit">Fruits</option>
                       </select>
                    </div>
                 </div>

                 <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-accent transition-all active:scale-95 pt-4">
                    Submit Membership Application
                 </button>
              </form>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 container mx-auto px-6 max-w-3xl">
         <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-16">Frequently Asked Questions</h2>
         <div className="space-y-6">
            {faq.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                 <h4 className="text-lg font-bold text-primary mb-3">{item.q}</h4>
                 <p className="text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}

function GraduationCap({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
    );
}

function ShoppingBag({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    );
}
