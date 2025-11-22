
import React, { useState } from 'react';
import { Search, Globe, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cfg = useConfig();
  const appName = cfg?.basic?.app_name || 'Canva';

  const headerCfg = cfg?.extra?.header;
  const navLinks: { name: string; dropdown?: boolean; to?: string }[] = headerCfg?.navLinks ?? [
    { name: 'Design spotlight', dropdown: true },
    { name: 'Business', dropdown: true },
    { name: 'Education', dropdown: true },
    { name: 'Plans and pricing', dropdown: true },
    { name: 'Learn', dropdown: true },
    { name: 'Blog', dropdown: false, to: '/blog' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-[#0d0c22]">{appName}</Link>
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                link.to ? (
                  <Link key={link.name} to={link.to} className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
                    {link.name}
                  </Link>
                ) : (
                  <a key={link.name} href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
                    {link.name}
                    {link.dropdown && <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>}
                  </a>
                )
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">
              <Search className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder={headerCfg?.searchPlaceholder || "What will you design today?"}
                className="bg-transparent ml-2 w-full text-sm focus:outline-none"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Globe className="w-5 h-5 text-gray-600" />
            </button>
            <button className="hidden md:block text-sm font-bold text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100">{headerCfg?.buttons?.login || "Log in"}</button>
            <button className="hidden md:block text-sm font-bold text-white bg-canva-purple px-4 py-2 rounded-full">{headerCfg?.buttons?.signup || "Sign up"}</button>
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.to ? (
                  <Link key={link.name} to={link.to} className="text-gray-600 hover:text-gray-900 flex justify-between items-center">
                    {link.name}
                  </Link>
                ) : (
                  <a key={link.name} href="#" className="text-gray-600 hover:text-gray-900 flex justify-between items-center">
                    {link.name}
                    {link.dropdown && <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>}
                  </a>
                )
              ))}
            </nav>
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:hidden">
              <Search className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder={headerCfg?.searchPlaceholder || "What will you design today?"}
                className="bg-transparent ml-2 w-full text-sm focus:outline-none"
              />
            </div>
            <div className="flex space-x-2 pt-4 border-t">
              <button className="w-full text-sm font-bold text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full border border-gray-300">{headerCfg?.buttons?.login || "Log in"}</button>
              <button className="w-full text-sm font-bold text-white bg-canva-purple px-4 py-2 rounded-full">{headerCfg?.buttons?.signup || "Sign up"}</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
  