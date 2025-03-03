import React, { useState, useEffect } from 'react';
import { Brain, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-blue-950/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative mr-2">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30 animate-pulse"></div>
              <Brain className="w-8 h-8 text-blue-400 relative z-10 glow-pulse" />
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-white' : 'text-blue-100'}`}>
              NAI Intelligence
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className={`text-sm font-medium hover:text-blue-300 transition-colors ${
                isScrolled ? 'text-blue-100' : 'text-blue-200'
              }`}
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`text-sm font-medium hover:text-blue-300 transition-colors ${
                isScrolled ? 'text-blue-100' : 'text-blue-200'
              }`}
            >
              Nosotros
            </button>
            <button 
              onClick={() => scrollToSection('industries')}
              className={`text-sm font-medium hover:text-blue-300 transition-colors ${
                isScrolled ? 'text-blue-100' : 'text-blue-200'
              }`}
            >
              Industrias
            </button>
            <button 
              onClick={() => scrollToSection('success-cases')}
              className={`text-sm font-medium hover:text-blue-300 transition-colors ${
                isScrolled ? 'text-blue-100' : 'text-blue-200'
              }`}
            >
              Casos de Éxito
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Contáctanos
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-blue-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-blue-950/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen py-5 border-b border-blue-800/50' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-6 flex flex-col space-y-4">
          <button 
            onClick={() => scrollToSection('services')}
            className="text-blue-100 py-2 px-4 rounded-lg hover:bg-blue-800/30 transition-colors text-left"
          >
            Servicios
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-blue-100 py-2 px-4 rounded-lg hover:bg-blue-800/30 transition-colors text-left"
          >
            Nosotros
          </button>
          <button 
            onClick={() => scrollToSection('industries')}
            className="text-blue-100 py-2 px-4 rounded-lg hover:bg-blue-800/30 transition-colors text-left"
          >
            Industrias
          </button>
          <button 
            onClick={() => scrollToSection('success-cases')}
            className="text-blue-100 py-2 px-4 rounded-lg hover:bg-blue-800/30 transition-colors text-left"
          >
            Casos de Éxito
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-medium w-full text-center"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
