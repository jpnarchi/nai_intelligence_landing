import React, { useState } from 'react';
import { 
  Brain, 
  Headphones, 
  Building2, 
  Users, 
  BookOpen, 
  Activity, 
  DollarSign, 
  Wifi, 
  Hotel 
} from 'lucide-react';

const IndustriesSection: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState<number | null>(0);
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);

  const industries = [
    { 
      name: "Atención al Cliente", 
      icon: <Headphones className="w-16 h-16 text-blue-300" />,
      description: "Automatización de respuestas, análisis de sentimientos y gestión de tickets con IA."
    },
    { 
      name: "Retail", 
      icon: <Building2 className="w-16 h-16 text-blue-300" />,
      description: "Optimización de inventario, predicción de demanda y personalización de experiencias de compra."
    },
    { 
      name: "Recursos Humanos", 
      icon: <Users className="w-16 h-16 text-blue-300" />,
      description: "Automatización de reclutamiento, análisis de desempeño y gestión de talento."
    },
    { 
      name: "Educación", 
      icon: <BookOpen className="w-16 h-16 text-blue-300" />,
      description: "Tutores virtuales, evaluación automatizada y contenido educativo personalizado."
    },
    { 
      name: "Salud", 
      icon: <Activity className="w-16 h-16 text-blue-300" />,
      description: "Diagnóstico asistido, análisis de imágenes médicas y gestión de historiales clínicos."
    },
    { 
      name: "Finanzas", 
      icon: <DollarSign className="w-16 h-16 text-blue-300" />,
      description: "Detección de fraudes, análisis de riesgos y automatización de procesos contables."
    },
    { 
      name: "Telecomunicaciones", 
      icon: <Wifi className="w-16 h-16 text-blue-300" />,
      description: "Optimización de redes, predicción de fallos y mejora de experiencia del cliente."
    },
    { 
      name: "Hospitalidad", 
      icon: <Hotel className="w-16 h-16 text-blue-300" />,
      description: "Gestión de reservas, personalización de estancias y optimización de servicios."
    }
  ];

  return (
    <section className="py-20 relative bg-gradient-to-b from-blue-950 to-blue-900 circuit-pattern overflow-hidden transition-all duration-1000 ease-in-out" id="industries">
      {/* Simplified background elements */}
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      {/* Reduced floating elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse transition-all duration-1000"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-400/5 rounded-full blur-3xl animate-pulse transition-all duration-1000" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate fade-up">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4">Industrias</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 glow"></div>
          <p className="max-w-2xl mx-auto text-lg text-blue-200 mb-10">
            Nuestras <span className="text-blue-300 font-semibold">soluciones de IA</span> se adaptan a múltiples sectores, optimizando procesos y generando valor en cada industria
          </p>
        </div>

        {/* Simplified holographic display for larger screens */}
        <div className="hidden lg:block relative h-[700px] animate fade-up transition-all duration-1000">
          {/* Central Brain Core */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700">
            <div className="relative">
              <div className="w-32 h-32 glass-effect rounded-full flex items-center justify-center glow-pulse transition-all duration-700">
                <Brain className="w-16 h-16 text-blue-300 pulse transition-all duration-700" />
              </div>
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse transition-all duration-700"></div>
              
              {/* Simplified orbital rings */}
              <div className="absolute inset-0 w-64 h-64 border border-blue-500/20 rounded-full -left-16 -top-16 animate-spin-slow transition-all duration-1000"></div>
              <div className="absolute inset-0 w-80 h-80 border border-blue-400/10 rounded-full -left-24 -top-24 animate-spin-slow-reverse transition-all duration-1000"></div>
            </div>
          </div>
          
          {/* Industry Cards in Fixed Positions - optimized */}
          <div className="absolute inset-0">
            {industries.map((industry, index) => {
              // Calculate positions in a circle
              const totalCards = industries.length;
              const angle = (index * (360 / totalCards)) * (Math.PI / 180);
              const radius = 280; // Distance from center
              
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div 
                  key={index}
                  className="absolute transform transition-all duration-700 ease-in-out cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) ${activeIndustry === index ? 'scale(1.1)' : 'scale(1)'}`,
                    zIndex: activeIndustry === index ? 10 : 1,
                    opacity: 1,
                    transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  onClick={() => setActiveIndustry(index)}
                  onMouseEnter={() => setHoveredIndustry(index)}
                  onMouseLeave={() => setHoveredIndustry(null)}
                >
                  <div 
                    className={`glass-effect p-6 rounded-xl w-64 transition-all duration-700 backdrop-blur-md relative overflow-hidden ${
                      activeIndustry === index || hoveredIndustry === index ? 'glow-pulse shadow-glow bg-blue-900/20' : 'bg-blue-900/10'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`mb-4 transform transition-transform duration-500 ${
                        activeIndustry === index || hoveredIndustry === index ? 'scale-110' : ''
                      }`}>
                        <div className="p-3 rounded-full bg-blue-900/50 border border-blue-500/30 glow">
                          {industry.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-3 transition-all duration-500">{industry.name}</h3>
                      {(activeIndustry === index || hoveredIndustry === index) && (
                        <p className="text-blue-200 text-sm animate-fade-in transition-all duration-500">{industry.description}</p>
                      )}
                      
                      {/* Simplified holographic effect */}
                      <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
                      
                      {/* Simplified connection line */}
                      <div 
                        className="absolute left-1/2 top-1/2 h-[1px] origin-left z-[-1]"
                        style={{ 
                          width: radius,
                          transform: `rotate(${angle + Math.PI}rad)`,
                          background: `linear-gradient(to right, rgba(59, 130, 246, ${activeIndustry === index ? 0.4 : 0.1}), rgba(59, 130, 246, 0))`,
                          transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid for mobile/tablet - simplified */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger-children">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className={`relative glass-effect p-4 rounded-xl transition-all duration-500 scale-transition backdrop-blur-md ${
                  activeIndustry === index ? 'ring-1 ring-blue-400 glow -pulse bg-blue-900/20' : 'bg-blue-900/10'
                }`}
                onClick={() => setActiveIndustry(activeIndustry === index ? null : index)}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-3 transform transition-transform duration-500 hover:scale-110">
                    <div className="p-2 rounded-full bg-blue-900/50 border border-blue-500/30 glow">
                      {industry.icon}
                    </div>
                  </div>
                  <h3 className="text-blue-100 font-medium text-center text-sm">{industry.name}</h3>
                  
                  {/* Simplified holographic scan */}
                  <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Active industry detail panel - simplified */}
          {activeIndustry !== null && (
            <div className="glass-effect p-6 rounded-xl glow-pulse mb-10 animate-fade-in backdrop-blur-md bg-blue-900/20 transition-all duration-700 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="mr-4 p-3 rounded-full bg-blue-900/50 border border-blue-500/30 glow">
                  {industries[activeIndustry].icon}
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">{industries[activeIndustry].name}</h3>
              </div>
              <p className="text-blue-200 transition-all duration-500 relative z-10">{industries[activeIndustry].description}</p>
              
              {/* Simplified data visualization */}
              <div className="mt-4 h-2 bg-blue-900/30 rounded-full overflow-hidden transition-all duration-700 relative z-10">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-3/4 animate-pulse-slow transition-all duration-700"></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-blue-300 transition-all duration-500 relative z-10">
                <span>Eficiencia</span>
                <span>75%</span>
              </div>
            </div>
          )}
        </div>

        {/* Industry stats - simplified */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
          <div className="glass-effect p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-700 hover:shadow-glow float-animation backdrop-blur-md bg-blue-900/10 relative overflow-hidden">
            <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <p className="text-blue-300 text-sm uppercase tracking-wider font-medium mb-2">Sectores Atendidos</p>
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">8+</p>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-700 hover:shadow-glow float-animation backdrop-blur-md bg-blue-900/10 relative overflow-hidden" style={{animationDelay: '1s'}}>
            <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <p className="text-blue-300 text-sm uppercase tracking-wider font-medium mb-2">Proyectos Completados</p>
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">50+</p>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-700 hover:shadow-glow float-animation backdrop-blur-md bg-blue-900/10 relative overflow-hidden" style={{animationDelay: '2s'}}>
            <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <p className="text-blue-300 text-sm uppercase tracking-wider font-medium mb-2">Horas Ahorradas</p>
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">10k+</p>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-700 hover:shadow-glow float-animation backdrop-blur-md bg-blue-900/10 relative overflow-hidden" style={{animationDelay: '3s'}}>
            <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <p className="text-blue-300 text-sm uppercase tracking-wider font-medium mb-2">Satisfacción</p>
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">98%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;