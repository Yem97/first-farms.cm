import { client } from "@/sanity/lib/client";
import { featuredProductsQuery, upcomingTrainingsQuery, testimonialsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import TrainingCard from "@/components/TrainingCard";
import { Users, MapPin, ShoppingBag, GraduationCap, ChevronRight, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

interface Testimonial {
  _id?: string;
  quote: string;
  farmerName: string;
  region: string;
  photo?: { asset: { _ref: string } };
  localPhoto?: string;
}

interface Product {
  _id: string;
  name: string;
  price: string;
  farmerName?: string;
  region?: string;
  category?: string;
  image?: { asset: { _ref: string } };
  localImage?: string;
  whatsappNumber?: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'ft1',
    quote: "Since joining First Farms, I have doubled my income by selling directly to buyers in Douala. No more middlemen taking our profits.",
    farmerName: "Celestin Bakam",
    region: "Adamaoua",
    localPhoto: "/images/avatars/testimonial-1.svg",
  },
  {
    _id: 'ft2',
    quote: "The training on soil management completely changed how I grow my tomatoes. My harvest is now three times bigger and healthier. A true blessing.",
    farmerName: "Beatrice Ngono",
    region: "Littoral",
    localPhoto: "/images/avatars/testimonial-2.svg",
  },
  {
    _id: 'ft3',
    quote: "First Farms gave me access to tools, storage, and markets I never thought I could reach as a small farmer in the North.",
    farmerName: "Ibrahim Yaya",
    region: "Nord",
    localPhoto: "/images/avatars/testimonial-3.svg",
  },
];

const fallbackProducts: Product[] = [
  { _id: 'fp1', name: 'Premium Plantains', price: '5,000 XAF / bunch', farmerName: 'Celestin Bakam', region: 'Littoral', category: 'Fruits' },
  { _id: 'fp2', name: 'Fresh Tomatoes (25 kg)', price: '15,000 XAF', farmerName: 'Fatima Aboubakar', region: 'Adamaoua', category: 'Vegetables' },
  { _id: 'fp3', name: 'Moringa Powder (500 g)', price: '8,000 XAF', farmerName: 'Green Valley Farm', region: 'Sud-Ouest', category: 'Processed' },
  { _id: 'fp4', name: 'Organic Maize (50 kg)', price: '20,000 XAF', farmerName: 'Jean-Baptiste Mbo', region: 'Ouest', category: 'Grains' },
];

const partners = [
  { name: 'AgroTech Littoral', initial: 'AT', color: '#1B5E20' },
  { name: 'GreenGrow Fund', initial: 'GG', color: '#00695C' },
  { name: 'SeedFirst CM', initial: 'SF', color: '#F9A825' },
  { name: 'FarmLink Network', initial: 'FL', color: '#0277BD' },
  { name: 'EcoHarvest Africa', initial: 'EH', color: '#2E7D32' },
  { name: 'NourishCM', initial: 'NC', color: '#E65100' },
];

export default async function Home() {
  let featuredProducts: Product[] = [];
  let upcomingTrainings: unknown[] = [];
  let testimonials: Testimonial[] = [];

  try {
    [featuredProducts, upcomingTrainings, testimonials] = await Promise.all([
      client.fetch(featuredProductsQuery),
      client.fetch(upcomingTrainingsQuery),
      client.fetch(testimonialsQuery),
    ]);
  } catch {
    // Sanity not yet configured — fallback content used below
  }

  const displayProducts = featuredProducts.length > 0 ? featuredProducts : fallbackProducts;
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  const stats = [
    { label: "Members", value: "500+", icon: Users },
    { label: "Regions", value: "12", icon: MapPin },
    { label: "Products", value: "200+", icon: ShoppingBag },
    { label: "Training Sessions", value: "50+", icon: GraduationCap },
  ];

  return (
    <div>
      <HeroSection />

      {/* Stats Bar */}
      <section className="bg-white py-12 shadow-sm relative z-20 mx-4 md:mx-auto max-w-6xl -mt-10 rounded-2xl border border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <stat.icon className="w-8 h-8 text-secondary mb-3" />
                <span className="text-3xl font-bold text-primary font-poppins">{stat.value}</span>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Cameroonian Farmers"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary p-8 rounded-3xl shadow-xl hidden md:block max-w-[240px]">
              <p className="text-accent font-bold text-lg leading-tight">&ldquo;Stronger Together, Producing Excellence.&rdquo;</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8 text-left">
            <span className="text-primary font-bold uppercase tracking-widest text-xs py-1 px-3 bg-primary/10 rounded-full">Our Vision</span>
            <h2 className="text-4xl font-bold font-poppins text-primary leading-tight">Connecting Cameroonian Farmers to Global Opportunities.</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              First Farms Cameroon is more than just a cooperative; we are a community of innovators. We believe that by pooling our resources and knowledge, we can transform North to South, East to West of Cameroon into an agricultural powerhouse.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We provide our members with the tools, training, and direct market links needed to thrive in a modern economy while preserving our rich agricultural heritage.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-bold border-b-2 border-secondary pb-1 hover:text-secondary transition-colors"
            >
              Discover Our Full Story <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary mb-16">Cooperative Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Direct Marketplace", desc: "Sell your harvest directly to consumers and businesses without middleman fees.", icon: ShoppingBag, color: "bg-green-100 text-green-700" },
              { title: "Farmer Education", desc: "Regular workshops on soil management, business skills, and modern farming techniques.", icon: GraduationCap, color: "bg-blue-100 text-blue-700" },
              { title: "Group Synergy", desc: "Collective bargaining power for seeds, equipment, and logistics across all 12 regions.", icon: Users, color: "bg-orange-100 text-orange-700" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col items-center">
                <div className={`p-5 rounded-2xl mb-8 ${feature.color}`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold font-poppins text-primary mb-4">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
            <span className="text-secondary font-bold uppercase tracking-widest text-xs">Fresh From Farmers</span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary mt-4">Top Harvests This Season</h2>
          </div>
          <Link href="/marketplace" className="bg-primary/5 text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
            View Marketplace <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Upcoming Training */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl text-left">
              <span className="text-secondary font-bold uppercase tracking-widest text-xs">Knowledge is Power</span>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mt-4">Grow Your Agricultural Skills</h2>
            </div>
            <Link href="/education" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-white/20">
              Full Program <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {upcomingTrainings.length > 0 ? (
              upcomingTrainings.map((event) => (
                <div key={(event as { _id: string })._id} className="text-text">
                  <TrainingCard event={event as Parameters<typeof TrainingCard>[0]['event']} />
                </div>
              ))
            ) : (
              <div className="bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
                <GraduationCap className="w-12 h-12 text-secondary mx-auto mb-4 opacity-60" />
                <p className="text-gray-300 font-medium">New training sessions being scheduled.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon or <Link href="/education" className="text-secondary underline">visit the Education page</Link> to register your interest.</p>
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none transform rotate-12">
          <Sprout className="w-64 h-64" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-primary">Voices from the Field</h2>
          <p className="text-gray-500 mt-4">Hear from the farmers who make our cooperative what it is today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayTestimonials.map((t, idx) => {
            const photoSrc = t.localPhoto
              ? t.localPhoto
              : t.photo
              ? urlFor(t.photo).url()
              : null;

            return (
              <div key={t._id ?? idx} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                <Quote className="w-10 h-10 text-secondary/40 mb-6" />
                <p className="text-gray-600 text-lg italic leading-relaxed mb-10 flex-grow">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  {photoSrc && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-secondary">
                      <Image src={photoSrc} alt={t.farmerName} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-primary">{t.farmerName}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{t.region} Region</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partners Logo Bar */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-10">Trusted By Our Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center gap-2 group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-sm group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: partner.color }}
                >
                  {partner.initial}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Sprout({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 22 4-4-3-3" />
      <path d="m9 8 5.5-5.5a.5.5 0 0 1 .7 0l2.3 2.3a.5.5 0 0 1 0 .7L12 11" />
      <path d="M16 18c0-3.3-2.7-6-6-6s-6 2.7-6 6v4h12v-4Z" />
    </svg>
  );
}
