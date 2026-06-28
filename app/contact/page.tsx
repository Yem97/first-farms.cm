import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237XXXXXXXXX";

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">Let's Connect</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Whether you are a farmer looking to join or a buyer looking for fresh produce, we are here to help.
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold font-poppins text-primary mb-8">Contact Information</h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-5">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Our Location</h4>
                    <p className="text-gray-500">Main Cooperative Hub, Bonaberi, Douala, Cameroon</p>
                  </div>
                </li>
                <li className="flex items-start gap-5">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Email Us</h4>
                    <p className="text-gray-500">hello@firstfarms.cm</p>
                    <p className="text-gray-500">sales@firstfarms.cm</p>
                  </div>
                </li>
                <li className="flex items-start gap-5">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Call Us</h4>
                    <p className="text-gray-500">+237 6XX XXX XXX</p>
                    <p className="text-gray-500">Mon - Fri, 8am - 5pm</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
               <h3 className="text-xl font-bold font-poppins text-primary mb-6 flex items-center gap-2">
                 <Clock className="w-5 h-5 text-secondary" />
                 Working Hours
               </h3>
               <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                     <span className="text-gray-500">Monday - Friday</span>
                     <span className="font-bold text-primary">08:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                     <span className="text-gray-500">Saturday</span>
                     <span className="font-bold text-primary">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-gray-500">Sunday</span>
                     <span className="font-bold text-secondary italic">Closed</span>
                  </div>
               </div>
               
               <Link 
                 href={`https://wa.me/${whatsappNumber}`} 
                 target="_blank" 
                 className="mt-10 w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:shadow-lg transition-all active:scale-95"
               >
                 <MessageCircle className="w-6 h-6 fill-current" />
                 Message us on WhatsApp
               </Link>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 relative">
            <h2 className="text-3xl font-bold font-poppins text-primary mb-4">Send a Message</h2>
            <p className="text-gray-400 mb-10">We will respond to your inquiry as soon as possible.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-24 container mx-auto px-6">
         <div className="w-full h-[450px] bg-gray-100 rounded-[3rem] border border-gray-200 flex flex-col items-center justify-center text-gray-400 group overflow-hidden relative">
            <MapPin className="w-16 h-16 mb-4 group-hover:scale-110 group-hover:text-primary transition-all duration-500" />
            <span className="font-bold font-poppins text-lg">Google Interactive Map Coming Soon</span>
            <span className="text-sm">Visit us at our central office in Bonaberi, Douala.</span>
            <div className="absolute inset-0 bg-primary opacity-5"></div>
         </div>
      </section>
    </div>
  );
}
