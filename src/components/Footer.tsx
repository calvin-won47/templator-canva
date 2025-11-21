
import React from 'react';
import { Globe } from 'lucide-react';

const footerLinks = {
  Features: ['Magic Studio', 'Magic Write', 'Magic Design', 'Apps', 'Presentations', 'Video'],
  Explore: ['Design types', 'Templates', 'Graph & chart makers', 'Photo editor', 'Color palette generator'],
  Community: ['Online communities', 'Creators', 'Canva Represents Fund', 'Developers', 'Partnerships'],
  Download: ['iOS', 'Android', 'Windows', 'Mac'],
  Company: ['About', 'Newsroom', 'Careers', 'Sustainability', 'Security', 'Terms and Privacy'],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Canva</h3>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-4 text-gray-300">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Globe className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">English (United States)</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2024 All Rights Reserved, Canva®
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  