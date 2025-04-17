import Link from "next/link";
import { Utensils, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <Utensils className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary-400">QuickBite</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Delivering delicious food from your favorite local restaurants straight to your door.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-primary-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Restaurants", "Pricing", "Contact"].map((link, index) => (
                <li key={index}>
                  <Link href="#" className="text-muted-foreground hover:text-primary-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-medium text-primary-400 mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy", "Cookie Policy", "Refund Policy"].map((link, index) => (
                <li key={index}>
                  <Link href="#" className="text-muted-foreground hover:text-primary-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-primary-400 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <span className="text-muted-foreground">123 Delivery St, Food City, FC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <span className="text-muted-foreground">support@quickbite.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-dark-800 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} QuickBite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}