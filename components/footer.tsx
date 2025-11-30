import React from 'react';
import { Linkedin, Twitter, Github, Facebook, Instagram, LucideIcon } from 'lucide-react';
import { SiteSettings, FooterLink } from '@/lib/supabase/types';

// Icon map for social icons
const socialIconMap: Record<string, LucideIcon> = {
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
};

interface FooterProps {
  siteSettings: SiteSettings | null;
  footerLinks: FooterLink[];
}

const Footer = ({ siteSettings, footerLinks }: FooterProps) => {
  // Group footer links by category
  const quickLinks = footerLinks.filter(link => link.category === 'quick_links');
  const services = footerLinks.filter(link => link.category === 'services');
  const legal = footerLinks.filter(link => link.category === 'legal');
  const bottomLinks = footerLinks.filter(link => link.category === 'bottom');
  const socialLinks = footerLinks.filter(link => link.category === 'social');

  return (
    <footer className="bg-background border-t border-gray-800">
      <div className="container mx-auto container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">{siteSettings?.company_name || 'BugFree.dev'}</h3>
            <p className="text-gray-400">
              {siteSettings?.company_description || 'Building and shipping products faster in the AI era. We transform ideas into exceptional digital experiences.'}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon ? socialIconMap[link.icon] : null;
                  return (
                    <a 
                      key={link.id} 
                      href={link.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                      <span className="sr-only">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.length > 0 ? (
                quickLinks.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} className="text-gray-400 hover:text-primary transition-colors">{link.label}</a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
                  <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#projects" className="text-gray-400 hover:text-primary transition-colors">Projects</a></li>
                  <li><a href="#process" className="text-gray-400 hover:text-primary transition-colors">Our Process</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                </>
              )}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.length > 0 ? (
                services.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} className="text-gray-400 hover:text-primary transition-colors">{link.label}</a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Web Development</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Mobile App Development</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">AI Integration</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">UI/UX Design</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Cloud Services</a></li>
                </>
              )}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legal.length > 0 ? (
                legal.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} className="text-gray-400 hover:text-primary transition-colors">{link.label}</a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {siteSettings?.company_name || 'BugFree.dev'}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            {bottomLinks.length > 0 ? (
              bottomLinks.map((link) => (
                <a key={link.id} href={link.url} className="text-gray-400 hover:text-primary transition-colors">{link.label}</a>
              ))
            ) : (
              <>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookies</a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;