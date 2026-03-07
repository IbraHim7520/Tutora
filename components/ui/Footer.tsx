import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Section: Newsletter / CTA */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Join our learning community</h3>
            <p className="text-gray-400 mt-1">Get the latest session updates and educational resources.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <GraduationCap size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">TutorFlow</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering students worldwide by connecting them with elite educators for personalized, high-impact learning experiences.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-indigo-500 transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-indigo-500 transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-indigo-500 transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-indigo-500 transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/sessions" className="hover:text-white transition-colors">Find a Tutor</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Become a Teacher</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-500 shrink-0" />
                <span>123 Education Lane, Tech City, <br />NY 10001, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-500 shrink-0" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-500 shrink-0" />
                <span>support@tutorflow.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} TutorFlow Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white">Cookie Settings</Link>
            <Link href="#" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;