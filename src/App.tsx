import React, { useEffect, useRef, useState } from 'react';
import { 
  Brain, 
  Database, 
  Settings, 
  BarChart3, 
  Bot, 
  Users, 
  MessageSquare,
  Headphones, 
  GraduationCap, 
  Heart, 
  Banknote, 
  Phone, 
  Building2, 
  Mail, 
  ChevronDown,
  Zap,
  Code,
  Cpu,
  Globe,
  ShieldCheck,
  Truck,
  Briefcase,
  BookOpen,
  Activity,
  DollarSign,
  Wifi,
  Hotel,
  Send,
  User
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import HeroSection from './components/HeroSection';
import IndustriesSection from './components/IndustriesSection';
import ServicesSection from './components/ServicesSection';
import Navbar from './components/Navbar';
import { submitContactForm } from './lib/supabase';

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // For staggered animations
          if (entry.target.classList.contains('stagger-children')) {
            entry.target.classList.add('animate-in');
          }
          
          // Track visible section for smooth transitions
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            setVisibleSection(sectionId);
          }
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

    const elements = document.querySelectorAll('.animate, .stagger-children');
    elements.forEach(el => {
      observerRef.current?.observe(el);
    });

    // Observe sections for transition effects
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observerRef.current?.observe(section);
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      await submitContactForm(formData);
      setFormStatus('success');
      toast.success('¡Mensaje enviado con éxito!');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      toast.error('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
      
      // Reset form status after error
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1e3a8a',
            color: '#fff',
            border: '1px solid #3b82f6',
          },
          success: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-blue-950 to-blue-900 text-white circuit-pattern transition-all duration-1000 ease-in-out" id="about">
        <div className="absolute inset-0 circuit-pattern opacity-20 transition-opacity duration-1000"></div>
        <div className="absolute inset-0 cyber-grid opacity-5 transition-opacity duration-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate fade-up">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4 glow-text">Quiénes Somos</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 glow"></div>
            <p className="max-w-3xl mx-auto text-lg text-blue-200">
              Startup 100% Mexicana <span className="text-blue-300 font-semibold">NAI Intelligence</span> enfocada a ofrecer servicios de 
              <span className="text-blue-300 font-semibold"> Inteligencia Artificial </span> 
              en base a las necesidades del cliente para automatizar su negocio. Donde ofrecemos una amplia gama de soluciones 
              para cualquier sector que tenga procesos muy tediosos que con <span className="text-blue-300 font-semibold">NAI</span> los puedan hacer más eficientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center stagger-children">
            <div className="glass-effect p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-500 float-animation hologram relative overflow-hidden group">
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              <div className="p-3 rounded-full bg-blue-900/50 border border-blue-500/30 glow mx-auto mb-4">
                <Users className="w-12 h-12 text-blue-300" />
              </div>
              <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2">+40</h3>
              <p className="text-blue-300 uppercase tracking-wider">Clientes</p>
            </div>
            
            <div className="glass-effect p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-500 float-animation hologram relative overflow-hidden group" style={{animationDelay: '1s'}}>
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              <div className="p-3 rounded-full bg-blue-900/50 border border-blue-500/30 glow mx-auto mb-4">
                <Settings className="w-12 h-12 text-blue-300 rotate-slow" />
              </div>
              <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2">+15</h3>
              <p className="text-blue-300 uppercase tracking-wider">Sistemas Automatizados</p>
            </div>
            
            <div className="glass-effect p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-500 float-animation hologram relative overflow-hidden group" style={{animationDelay: '2s'}}>
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              <div className="p-3 rounded-full bg-blue-900/50 border border-blue-500/30 glow mx-auto mb-4">
                <Brain className="w-12 h-12 text-blue-300 pulse" />
              </div>
              <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2">+20</h3>
              <p className="text-blue-300 uppercase tracking-wider">Agentes AI</p>
            </div>
            
            <div className="glass-effect p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-500 float-animation hologram relative overflow-hidden group" style={{animationDelay: '3s'}}>
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              <div className="p-3 rounded-full bg-blue-900/50 border border-blue-500/30 glow mx-auto mb-4">
                <MessageSquare className="w-12 h-12 text-blue-300" />
              </div>
              <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2">+10</h3>
              <p className="text-blue-300 uppercase tracking-wider">Chat Bots</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <IndustriesSection />

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white circuit-pattern transition-all duration-1000 ease-in-out" id="mission">
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate fade-right glass-effect p-8 rounded-xl backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-6">Misión</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-transparent mb-8 glow"></div>
              <p className="text-xl font-light leading-relaxed text-blue-100">
                "<span className="text-blue-300 font-medium">Brindar la mejor experiencia</span> y facilidad en trabajos laboriosos a través de la <span className="text-blue-300 font-medium">Inteligencia Artificial</span>"
              </p>
            </div>
            
            <div className="animate fade-left glass-effect p-8 rounded-xl backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-6">Visión</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-transparent mb-8 glow"></div>
              <p className="text-xl font-light leading-relaxed text-blue-100">
                "<span className="text-blue-300 font-medium">Ayudar a los Negocios</span> a sacar su máximo potencial sin necesidad de tener muchos gastos y <span className="text-blue-300 font-medium">errores humanos</span>"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Cases Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-950 circuit-pattern transition-all duration-1000 ease-in-out" id="success-cases">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate fade-up">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4">Casos de Éxito</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 glow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 stagger-children">
            <div className="glass-effect p-8 rounded-xl shadow-lg scale-transition backdrop-blur-md relative overflow-hidden group">
              {/* Empresa destacada con efecto de brillo */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl"></div>
              
              <div className="mb-6 relative">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2 tracking-tight">
                  CRETUM PARTNERS
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-blue-300 mr-3" />
                <h4 className="text-xl font-bold text-blue-100">Sistema de Noticias de Emisoras por Correo</h4>
              </div>
              <p className="text-blue-200 mb-6">
                Se realizó un modelo de web scraping para automatizar el seguimiento de emisoras en la página web de la Bolsa Mexicana de Valores. 
                Donde el programa notifica a los gestores de los portafolios a través de correo electrónico nuevas actualizaciones de calificaciones 
                de emisoras y noticias relevantes a ellas.
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 glow"></div>
              
              {/* Holographic scan effect */}
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            </div>
            
            <div className="glass-effect p-8 rounded-xl shadow-lg scale-transition backdrop-blur-md relative overflow-hidden group">
              {/* Empresa destacada con efecto de brillo */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl"></div>
              
              <div className="mb-6 relative">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2 tracking-tight">
                  PRETMEX
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <Database className="w-8 h-8 text-blue-300 mr-3" />
                <h4 className="text-xl font-bold text-blue-100">Agente de IA para Optimización de Bases de Datos</h4>
              </div>
              <p className="text-blue-200 mb-6">
                Se creó un agente de IA para manipular y gestionar una base de datos conforme el usuario le pide requisitos y búsquedas dentro de ella, 
                donde el agente crea archivos de cualquier tipo como salida para cumplir con la solicitud que se le da.
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 glow"></div>
              
              {/* Holographic scan effect */}
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            </div>
            
            <div className="glass-effect p-8 rounded-xl shadow-lg scale-transition backdrop-blur-md relative overflow-hidden group">
              {/* Empresa destacada con efecto de brillo */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl"></div>
              
              <div className="mb-6 relative">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2 tracking-tight">
                  ASTRA GROWTH
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <Phone className="w-8 h-8 text-blue-300 mr-3" />
                <h4 className="text-xl font-bold text-blue-100">Asistente de IA para Reservas a través de WhatsApp</h4>
              </div>
              <p className="text-blue-200 mb-6">
                Se creó un agente de IA para automatizar la gestión de reservas a través de WhatsApp donde el agente al recibir la reserva 
                checa disposición y de tener espacio agenda una reunión en la web, Google Calendar y le envía los detalles al usuario del evento.
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 glow"></div>
              
              {/* Holographic scan effect */}
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            </div>
            
            <div className="glass-effect p-8 rounded-xl shadow-lg scale-transition backdrop-blur-md relative overflow-hidden group">
              {/* Empresa destacada con efecto de brillo */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl"></div>
              
              <div className="mb-6 relative">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2 tracking-tight">
                  NOKTOS
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 text-blue-300 mr-3" />
                <h4 className="text-xl font-bold text-blue-100">Plataforma para Clientes con Agente de IA</h4>
              </div>
              <p className="text-blue-200 mb-6">
                Construimos una plataforma donde el usuario puede completar una reserva de hotel en 3 pasos a través de un chat bot 
                implementado en el software cotiza, crea, y gestiona las reservaciones para los hoteles.
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 glow"></div>
              
              {/* Holographic scan effect */}
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-950 relative overflow-hidden transition-all duration-1000 ease-in-out" id="contact">
        {/* Animated background elements */}
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate fade-up">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4">Contáctanos</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 glow"></div>
            <p className="max-w-2xl mx-auto text-lg text-blue-200 mb-10">
              Estamos listos para ayudarte a transformar tu negocio con soluciones de IA personalizadas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-effect p-8 md:p-12 rounded-2xl shadow-xl animate fade-up backdrop-blur-md relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nombre completo"
                      required
                      className="w-full bg-blue-950/50 border border-blue-700/50 rounded-lg py-3 pl-10 pr-3 text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 to-blue-300/30 transform scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico"
                      required
                      className="w-full bg-blue-950/50 border border-blue-700/50 rounded-lg py-3 pl-10 pr-3 text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="relative md:col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Teléfono"
                      required
                      className="w-full bg-blue-950/50 border border-blue-700/50 rounded-lg py-3 pl-10 pr-3 text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="relative md:col-span-2">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-blue-300" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="¿Cómo podemos ayudarte?"
                      required
                      rows={5}
                      className="w-full bg-blue-950/50 border border-blue-700/50 rounded-lg py-3 pl-10 pr-3 text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="neon-button gradient-border bg-blue-900/80 backdrop-blur-sm text-white px-10 py-4 rounded-full text-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 glow hover-transition"
                    style={{
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    <span className="relative flex items-center">
                      {formStatus === 'submitting' ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Enviando...
                        </>
                      ) : formStatus === 'success' ? (
                        <>
                          Mensaje Enviado
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2 button-icon" />
                          <span className="button-text">Enviar Mensaje</span>
                          <span className="button-glow"></span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
                
                {formStatus === 'success' && (
                  <div className="mt-6 text-center animate-fade-in">
                    <p className="text-green-300 font-medium">
                      ¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.
                    </p>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mt-6 text-center animate-fade-in">
                    <p className="text-red-300 font-medium">
                      Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
                    </p>
                  </div>
                )}
              </form>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left stagger-children">
                <div className="flex flex-col md:flex-row items-center md:items-start group hover:transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="bg-blue-800/30 p-3 rounded-full mb-4 md:mb-0 md:mr-4 glow group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-blue-100 font-medium mb-1">Correo Electrónico</h3>
                    <p className="text-blue-300 hover:text-blue-200 transition-colors">
                      <a href="mailto:nai@naintelligence.mx" className="border-b border-blue-500/30 hover:border-blue-400 transition-colors">
                        nai@naintelligence.mx
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start group hover:transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="bg-blue-800/30 p-3 rounded-full mb-4 md:mb-0 md:mr-4 glow group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-blue-100 font-medium mb-1">Teléfono</h3>
                    <p className="text-blue-300">
                      <a href="tel:+525576673059" className="border-b border-blue-500/30 hover:border-blue-400 transition-colors hover:text-blue-200">
                        +52 55 7667 3059
                      </a>
                      {" / "}
                      <a href="tel:+525543431170" className="border-b border-blue-500/30 hover:border-blue-400 transition-colors hover:text-blue-200">
                        +52 55 4343 1170
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-8 flex justify-center space-x-6">
                <a 
                  href="https://www.linkedin.com/company/nai-intelligence" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800/30 p-3 rounded-full glow hover:scale-110 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/nai_intelligence" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800/30 p-3 rounded-full glow hover:scale-110 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/nai.intelligence/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800/30 p-3 rounded-full glow hover:scale-110 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gradient-to-r from-blue-950 to-blue-900 text-white transition-all duration-1000 ease-in-out">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Brain className="w-8 h-8 text-blue-300 mr-2 glow-pulse" />
              <span className="text-xl font-bold text-blue-100">NAI Intelligence</span>
            </div>
            <div className="text-sm text-blue-300">
              © {new Date().getFullYear()} NAI Intelligence. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;