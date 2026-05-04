import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin, Sprout } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white" id="site-footer">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-poppins tracking-tight">
                First Farms <span className="text-secondary">Cameroon</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Empowering Cameroonian farmers through cooperation, education, and direct market access. Sustainable agriculture for a better future.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-poppins text-secondary">Quick Links</h3>
            <ul className="space-y-4 text-gray-300">
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Our Story</Link></li>
              <li><Link href="/membership" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Become a Member</Link></li>
              <li><Link href="/education" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Training Programs</Link></li>
              <li><Link href="/marketplace" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Farmer's Market</Link></li>
              <li><Link href="/advertise" className="hover:text-white hover:translate-x-1 transition-all inline-block text-sm">Advertise With Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-poppins text-secondary">Get In Touch</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm">Main Office, Douala, Littoral Region, Cameroon</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm">+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm">hello@firstfarms.cm</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-poppins text-secondary">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">Stay updated with our latest agricultural news and events.</p>
            <form name="newsletter" method="POST" data-netlify="true" className="flex flex-col gap-2">
              <input 
                type="email" 
                name="email" 
                placeholder="Your email address" 
                required 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary transition-colors"
                id="footer-newsletter-email"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-all"
                id="footer-newsletter-submit"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-xs">
          <p>© {currentYear} First Farms Cameroon Cooperative. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
