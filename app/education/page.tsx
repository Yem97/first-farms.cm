import { client } from "@/sanity/lib/client";
import { trainingEventsQuery } from "@/sanity/lib/queries";
import TrainingCard from "@/components/TrainingCard";
import { BookOpen, Leaf, BarChart3, Database, Smartphone, Info } from "lucide-react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function EducationPage() {
  const events = await client.fetch(trainingEventsQuery);

  const categories = [
    { title: "Soil Management", desc: "Understanding soil health, pH balance, and organic fertilization.", icon: Leaf },
    { title: "Crop Rotation", desc: "Maximizing yield and preventing pests through strategic planting.", icon: BookOpen },
    { title: "Post-Harvest", desc: "Techniques for reducing waste and proper storage for export.", icon: Database },
    { title: "Business Skills", desc: "Financial literacy, accounting, and market analysis for small farms.", icon: BarChart3 },
    { title: "Digital Farming", desc: "Using smartphone apps for weather tracking and direct selling.", icon: Smartphone },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Farmer Education Program</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10">
              Equipping Cameroonian farmers with the knowledge and tools to double their productivity through sustainable science.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 hidden md:block">
           <Image src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80" alt="Training" fill className="object-cover" />
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
           <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold font-poppins text-primary">Roots of Knowledge</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                 Traditional farming methods in Cameroon are rich in wisdom, but facing new challenges from climate change and global competition. Our education program bridges this gap by introducing modern, climate-smart technologies that respect local traditions.
              </p>
              <div className="p-6 bg-secondary/10 rounded-2xl flex gap-4">
                 <Info className="w-6 h-6 text-secondary shrink-0" />
                 <p className="text-accent text-sm font-medium">
                    Members of the First Farms Cameroon Cooperative get 100% free access to all physical and digital training materials.
                 </p>
              </div>
           </div>
           <div className="w-full lg:w-1/2 bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-8 text-center">
                 <div>
                    <h3 className="text-4xl font-bold text-primary font-poppins mb-2">5,000+</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Farmers Trained</p>
                 </div>
                 <div>
                    <h3 className="text-4xl font-bold text-primary font-poppins mb-2">24</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Active Trainers</p>
                 </div>
                 <div>
                    <h3 className="text-4xl font-bold text-primary font-poppins mb-2">100%</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Practical Focus</p>
                 </div>
                 <div>
                    <h3 className="text-4xl font-bold text-primary font-poppins mb-2">08</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Field Stations</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-16">Training Categories</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {categories.map((c, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
                   <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
                      <c.icon className="w-8 h-8" />
                   </div>
                   <h4 className="text-lg font-bold font-poppins text-primary mb-3 leading-tight">{c.title}</h4>
                   <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold font-poppins text-primary text-center mb-4">Upcoming Workshops</h2>
        <p className="text-center text-gray-500 mb-16">Physical and virtual sessions across Cameroon.</p>
        
        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          {events.length > 0 ? (
            events.map((event: any) => (
              <TrainingCard key={event._id} event={event} />
            ))
          ) : (
            <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
               <p className="text-gray-400 italic">New training sessions being scheduled. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Highlights */}
      <section className="py-24 bg-accent text-white">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold font-poppins mb-16">Program Impact</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-3xl overflow-hidden group">
                   <Image 
                      src={`https://images.unsplash.com/photo-${1510000000000 + i}?auto=format&fit=crop&w=400&q=80`} 
                      alt="Impact" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-all duration-700 opacity-60"
                   />
                   <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-bold text-left italic">Farmer Training in {['Ebolowa', 'Bafoussam', 'Garoua', 'Buea'][i-1]}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Newsletter / Interest Form */}
      <section className="py-24 container mx-auto px-6 max-w-3xl">
         <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold font-poppins text-primary text-center mb-10">Register Your Interest</h2>
            <form name="training-interest" method="POST" data-netlify="true" className="space-y-6">
               <input type="hidden" name="form-name" value="training-interest" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                     <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                     <input type="text" name="name" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                     <input type="tel" name="phone" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                  </div>
               </div>
               <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 ml-1">Preferred Topic of Interest</label>
                  <select name="topic" required className="w-full bg-gray-50 border-gray-100 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none">
                     <option value="">Select Topic</option>
                     {categories.map(c => <option key={c.title} value={c.title}>{c.title}</option>)}
                     <option value="Other">Other</option>
                  </select>
               </div>
               <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-md hover:bg-secondary hover:text-accent transition-all active:scale-95">
                  Notify Me of Next session
               </button>
            </form>
         </div>
      </section>
    </div>
  );
}
