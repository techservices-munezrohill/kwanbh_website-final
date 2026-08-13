import React from 'react';
import { MapPin, Linkedin, Twitter, BookOpen, Instagram } from 'lucide-react';
import MHLogo from '../assets/MH.logo.jpg';
import footerData from '../../content/footer.json';

const Footer = () => {
  const footer = footerData;

  const socialLinks = [
    { href: footer.linkedinUrl,      icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
    { href: footer.twitterUrl,       icon: <Twitter  className="h-5 w-5" />, label: 'Twitter'  },
    { href: footer.googleScholarUrl, icon: <BookOpen className="h-5 w-5" />, label: 'Google Scholar' },
    { href: footer.instagramUrl,     icon: <Instagram className="h-5 w-5" />, label: 'Instagram' },
  ];

  return (
    <footer className="bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{footer.name}</h3>
            <p className="text-stone-300 mb-4 max-w-md">{footer.tagline}</p>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon, label }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-300 hover:text-amber-400 transition-colors"
                    title={label}
                  >
                    {icon}
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Location Info */}
          <div className="md:text-right">
            <h4 className="text-lg font-semibold mb-4">Based in</h4>
            <ul className="space-y-2">
              {(footer.locations ?? []).length > 0 && (
                <li className="flex items-start space-x-2 md:justify-end">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <div className="text-stone-300 space-y-1 text-left md:text-right">
                    {(footer.locations ?? []).map((loc, i) => (
                      <div key={i}>{loc}</div>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-300 text-sm">{footer.copyrightText}</p>
          <div className="flex items-center gap-2 text-stone-300 text-sm">
            <img src={MHLogo} alt="Munezero Hill logo" className="h-6 w-auto object-contain rounded-sm mr-1" />
            <span>Powered by <span className="font-medium">Munezero Hill</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
