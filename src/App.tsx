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
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4 glow-text">Quiénes Somos</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 glow"></div>
            <p className="max-w-3xl mx-auto text-lg text-blue-200">
              Startup 100% Mexicana <span className="text-blue-300 font-semibold">NAI Intelligence</span> enfocada a ofrecer servicios de 
              <span className="text-blue-300 font-semibold"> Inteligencia Artificial </span> 
              en base a las necesidades del cliente para automatizar su negocio. Donde ofrecemos una amplia gama de soluciones 
              para cualquier sector que tenga procesos muy tediosos que con <span className="text-blue-300 font-semibold">NAI</span> los puedan hacer más eficientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 stagger-children">
            {/* Clients Card */}
            <div className="glass-effect p-6 md:p-8 rounded-xl shadow-xl transform hover:-translate-y-3 transition-all duration-500 hover:shadow-glow relative overflow-hidden group">
              {/* Background effects */}
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-xl border border-blue-500/20 glow"></div>
              
              {/* Icon with animated glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-900/80 to-blue-800/80 border border-blue-500/40 glow mx-auto relative z-10 shadow-lg">
                  <Users className="w-10 h-10 md:w-12 md:h-12 text-blue-300" />
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2">+40</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent mx-auto mb-3"></div>
                <p className="text-blue-300 uppercase tracking-wider font-medium">Clientes</p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            </div>
            
            {/* Systems Card */}
            <div className="glass-effect p-6 md:p-8 rounded-xl shadow-xl transform hover:-translate-y-3 transition-all duration-500 hover:shadow-glow relative overflow-hidden group" style={{animationDelay: '0.2s'}}>
              {/* Background effects */}
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-xl border border-blue-500/20 glow"></div>
              
              {/* Icon with animated glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-900/80 to-blue-800/80 border border-blue-500/40 glow mx-auto relative z-10 shadow-lg">
                  <Settings className="w-10 h-10 md:w-12 md:h-12 text-blue-300 rotate-slow" />
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2">+15</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent mx-auto mb-3"></div>
                <p className="text-blue-300 uppercase tracking-wider font-medium">Sistemas Automatizados</p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            </div>
            
            {/* AI Agents Card */}
            <div className="glass-effect p-6 md:p-8 rounded-xl shadow-xl transform hover:-translate-y-3 transition-all duration-500 hover:shadow-glow relative overflow-hidden group" style={{animationDelay: '0.4s'}}>
              {/* Background effects */}
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-xl border border-blue-500/20 glow"></div>
              
              {/* Icon with animated glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-900/80 to-blue-800/80 border border-blue-500/40 glow mx-auto relative z-10 shadow-lg">
                  <Brain className="w-10 h-10 md:w-12 md:h-12 text-blue-300 pulse" />
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2">+20</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent mx-auto mb-3"></div>
                <p className="text-blue-300 uppercase tracking-wider font-medium">Agentes AI</p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            </div>
            
            {/* Chat Bots Card */}
            <div className="glass-effect p-6 md:p-8 rounded-xl shadow-xl transform hover:-translate-y-3 transition-all duration-500 hover:shadow-glow relative overflow-hidden group" style={{animationDelay: '0.6s'}}>
              {/* Background effects */}
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
              
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-xl border border-blue-500/20 glow"></div>
              
              {/* Icon with animated glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-900/80 to-blue-800/80 border border-blue-500/40 glow mx-auto relative z-10 shadow-lg">
                  <MessageSquare className="w-10 h-10 md:w-12 md:h-12 text-blue-300" />
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2">+10</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent mx-auto mb-3"></div>
                <p className="text-blue-300 uppercase tracking-wider font-medium">Chat Bots</p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4">Casos de Éxito</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 glow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 stagger-children">
            <div className="glass-effect p-8 rounded-xl shadow-lg scale-transition backdrop-blur-md relative overflow-hidden group">
              {/* Empresa destacada con efecto de brillo */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl"></div>
              
              <div className="mb-6 relative">
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2 tracking-tight">
                  CRETUM PARTNERS
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-blue-300 mr-3 flex-shrink-0" />
                <h4 className="text-lg md:text-xl font-bold text-blue-100">Sistema de Noticias de Emisoras por Correo</h4>
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
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2 tracking-tight">
                  PRETMEX
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <Database className="w-8 h-8 text-blue-300 mr-3 flex-shrink-0" />
                <h4 className="text-lg md:text-xl font-bold text-blue-100">Agente de IA para Optimización de Bases de Datos</h4>
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
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2 tracking-tight">
                  ASTRA GROWTH
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <Phone className="w-8 h-8 text-blue-300 mr-3 flex-shrink-0" />
                <h4 className="text-lg md:text-xl font-bold text-blue-100">Asistente de IA para Reservas a través de WhatsApp</h4>
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
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-2 tracking-tight">
                  NOKTOS
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </div>
              
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 text-blue-300 mr-3 flex-shrink-0" />
                <h4 className="text-lg md:text-xl font-bold text-blue-100">Plataforma para Clientes con Agente de IA</h4>
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
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4">Contáctanos</h2>
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
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-blue-800/30 p-3 rounded-full mb-4 md:mb-0 md:mr-4 glow">
                    <Mail className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-blue-100 font-medium mb-1">Correo Electrónico</h3>
                    <a href="mailto:nai@naintelligence.mx" className="text-blue-300 hover:text-blue-200 transition-colors">nai@naintelligence.mx</a>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-blue-800/30 p-3 rounded-full mb-4 md:mb-0 md:mr-4 glow">
                    <Phone className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-blue-100 font-medium mb-1">Teléfono</h3>
                    <a href="tel:+525576673059" className="text-blue-300 hover:text-blue-200 transition-colors">+52 55 7667 3059</a> / <a href="tel:+525543431170" className="text-blue-300 hover:text-blue-200 transition-colors">+52 55 4343 1170</a>
                  </div>
                </div>
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
