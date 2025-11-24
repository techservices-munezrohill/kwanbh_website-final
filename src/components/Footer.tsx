import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, BookOpen, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Dr. Kwan‑Lamar Blount‑Hill</h3>
            <p className="text-stone-300 mb-4 max-w-md">
              Scholar, Attorney, Advocate. Advancing justice through transformative scholarship, 
              community engagement, and policy reform.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/kwan-lamar-blount-hill" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/kwanbh" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-400 transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://scholar.google.com/citations?user=kwan-lamar-blount-hill" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-400 transition-colors"
                title="Google Scholar"
              >
                <BookOpen className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/kwanlamarblounthill" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-stone-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/research" className="text-stone-300 hover:text-white transition-colors">Research & Projects</Link></li>
              <li><Link to="/publications" className="text-stone-300 hover:text-white transition-colors">Publications</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-stone-300">kbh@asu.edu</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div className="text-stone-300 space-y-1">
                  <div>Phoenix, AZ</div>
                  <div>NY, USA</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-6 text-center">
          <p className="text-stone-300">
            © 2025 Dr. Kwan‑Lamar Blount‑Hill. All rights reserved. Powered by Munezero Hill.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
