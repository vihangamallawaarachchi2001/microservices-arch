import { Link } from "expo-router";
import { Facebook, Instagram, Twitter, Utensils } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted">
      <div className="container py-12 max-w-[1366px] mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mx-auto">
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">QuickBite</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Delivering happiness, one meal at a time.
            </p>
            <div className="flex gap-4">
              {[
                {
                  name: "Twitter",
                  icon: <Twitter className="h-5 w-5" />,
                },
                {
                  name: "Facebook",
                  icon: <Facebook className="h-5 w-5" />,
                },
                {
                  name: "Instagram",
                  icon: <Instagram className="h-5 w-5" />,
                },
              ].map(({ name, icon }) => (
                <Link
                  key={name}
                  href="/"
                  className="rounded-full bg-background p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`Follow us on ${name}`}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center flex flex-col items-center">
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About Us", "Restaurants", "Pricing", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-muted-foreground hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="text-center flex flex-col items-center">
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Refund Policy",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center flex flex-col items-center">
            <h4 className="font-bold mb-4">Contact Us</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>123 Delivery Street</p>
              <p>Foodville, FD 12345</p>
              <p>support@quickbite.com</p>
              <p>(123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} QuickBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
