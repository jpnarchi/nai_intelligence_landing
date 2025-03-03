import React, { useEffect, useRef, useState } from 'react';
import { 
  Bot, 
  Database, 
  Settings, 
  BarChart3, 
  Cpu, 
  ShieldCheck, 
  Brain,
  Zap,
  ChevronDown
} from 'lucide-react';

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoverService, setHoverService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  const services = [
    {
      icon: <Bot className="service-icon" />,
      title: "Agentes Personales",
      description: "Asistentes de IA personalizados para automatizar tareas específicas de su negocio.",
      features: [
        "Automatización de tareas repetitivas",
        "Asistentes virtuales personalizados",
        "Integración con sistemas existentes",
        "Aprendizaje continuo y adaptación"
      ],
      color: "#60a5fa",
      bgGradient: "from-blue-600/20 to-blue-400/10"
    },
    {
      icon: <Database className="service-icon" />,
      title: "Gestión de Bases de Datos",
      description: "Optimización y automatización de la gestión de sus datos empresariales.",
      features: [
        "Análisis predictivo de datos",
        "Automatización de reportes",
        "Limpieza y estructuración de datos",
        "Integración con múltiples fuentes"
      ],
      color: "#34d399",
      bgGradient: "from-emerald-600/20 to-emerald-400/10"
    },
    {
      icon: <Settings className="service-icon rotate-slow" />,
      title: "Optimización de Sistemas",
      description: "Mejora de la eficiencia de sus sistemas actuales mediante IA avanzada.",
      features: [
        "Análisis de rendimiento",
        "Detección de cuellos de botella",
        "Optimización de procesos",
        "Mejora continua automatizada"
      ],
      color: "#a78bfa",
      bgGradient: "from-purple-600/20 to-purple-400/10"
    },
    {
      icon: <BarChart3 className="service-icon" />,
      title: "Automatización de Servicios",
      description: "Automatización de procesos repetitivos para liberar recursos humanos valiosos.",
      features: [
        "Flujos de trabajo automatizados",
        "Reducción de errores humanos",
        "Escalabilidad de operaciones",
        "Monitoreo y análisis en tiempo real"
      ],
      color: "#f472b6",
      bgGradient: "from-pink-600/20 to-pink-400/10"
    }
  ];

  // Canvas animation for neural network background
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Neural network nodes
    const nodes: {x: number, y: number, radius: number, vx: number, vy: number, connections: number[]}[] = [];
    const numNodes = 40; // Reduced for better performance
    const connectionDistance = 150;
    
    // Initialize nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement
        vy: (Math.random() - 0.5) * 0.3, // Slower movement
        connections: []
      });
    }
    
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Reset connections
        node.connections = [];
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.15})`; // Reduced opacity
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            
            nodes[i].connections.push(j);
            nodes[j].connections.push(i);
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + (node.connections.length * 0.01)})`; // Reduced opacity
        ctx.fill();
      });
      
      // Data pulses along connections - reduced frequency
      if (Math.random() > 0.98) {
        const startNode = Math.floor(Math.random() * nodes.length);
        if (nodes[startNode].connections.length > 0) {
          const endNode = nodes[startNode].connections[Math.floor(Math.random() * nodes[startNode].connections.length)];
          
          // Draw pulse
          ctx.beginPath();
          ctx.arc(nodes[startNode].x, nodes[startNode].y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
          ctx.fill();
          
          // Animate pulse along connection
          const animatePulse = (progress: number) => {
            const x = nodes[startNode].x + (nodes[endNode].x - nodes[startNode].x) * progress;
            const y = nodes[startNode].y + (nodes[endNode].y - nodes[startNode].y) * progress;
            
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
            ctx.fill();
          };
          
          // Simple pulse animation
          for (let p = 0; p <= 1; p += 0.2) {
            setTimeout(() => animatePulse(p), p * 500);
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Create circuit lines for background
  useEffect(() => {
    const createCircuitLines = () => {
      const circuitContainer = document.querySelector('.services-circuit-lines');
      if (!circuitContainer) return;
      
      circuitContainer.innerHTML = '';
      
      // Horizontal lines
      for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line', 'horizontal');
        line.style.top = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 30 + 20}%`;
        line.style.left = `${Math.random() * 70}%`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        circuitContainer.appendChild(line);
      }
      
      // Vertical lines
      for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line', 'vertical');
        line.style.left = `${Math.random() * 100}%`;
        line.style.height = `${Math.random() * 30 + 20}%`;
        line.style.top = `${Math.random() * 70}%`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        circuitContainer.appendChild(line);
      }
      
      // Nodes at intersections
      for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.classList.add('circuit-node');
        node.style.top = `${Math.random() * 100}%`;
        node.style.left = `${Math.random() * 100}%`;
        node.style.animationDelay = `${Math.random() * 5}s`;
        circuitContainer.appendChild(node);
      }
      
      // Add data pulses along some lines
      for (let i = 0; i < 6; i++) {
        const pulse = document.createElement('div');
        pulse.classList.add('data-pulse');
        pulse.style.top = `${Math.random() * 100}%`;
        pulse.style.left = `${Math.random() * 100}%`;
        pulse.style.width = `${Math.random() * 2 + 2}px`;
        pulse.style.height = `${Math.random() * 2 + 2}px`;
        pulse.style.animationDuration = `${Math.random() * 4 + 3}s`;
        pulse.style.animationDelay = `${Math.random() * 3}s`;
        circuitContainer.appendChild(pulse);
      }
    };

    createCircuitLines();

    return () => {
      const circuitContainer = document.querySelector('.services-circuit-lines');
      if (circuitContainer) {
        circuitContainer.innerHTML = '';
      }
    };
  }, []);

  // Create digital rain effect
  useEffect(() => {
    const createDigitalRain = () => {
      const rainContainer = document.querySelector('.services-digital-rain');
      if (!rainContainer) return;
      
      rainContainer.innerHTML = '';
      
      const width = window.innerWidth;
      // Reduced column count for better performance
      const columns = Math.floor(width / 80); 
      
      for (let i = 0; i < columns; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        drop.style.left = `${i * 80 + Math.random() * 10}px`;
        drop.style.animationDuration = `${Math.random() * 10 + 10}s`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        drop.style.opacity = `${Math.random() * 0.2 + 0.05}`;
        
        // Add random binary characters - reduced count
        const chars = '01'.split('');
        for (let j = 0; j < 8; j++) {
          const char = document.createElement('div');
          char.textContent = chars[Math.floor(Math.random() * chars.length)];
          char.style.animationDelay = `${Math.random() * 2}s`;
          drop.appendChild(char);
        }
        
        rainContainer.appendChild(drop);
      }
    };

    createDigitalRain();

    return () => {
      const rainContainer = document.querySelector('.services-digital-rain');
      if (rainContainer) {
        rainContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <section className="py-20 relative bg-gradient-to-b from-blue-950 to-blue-900 circuit-pattern overflow-hidden transition-all duration-1000 ease-in-out section-transition-effect" id="services" ref={containerRef}>
      {/* Background layers similar to Hero Section */}
      <div className="absolute inset-0 circuit-pattern opacity-20 transition-opacity duration-1000"></div>
      <div className="absolute inset-0 cyber-grid opacity-5 transition-opacity duration-1000"></div>
      <div className="services-digital-rain absolute inset-0 z-0 opacity-15"></div>
      <div className="services-circuit-lines absolute inset-0 z-0 opacity-30"></div>
      
      {/* Neural network background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30"></canvas>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Animated energy beams */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="energy-beam left-1/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"></div>
        <div className="energy-beam right-1/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" style={{animationDelay: '1.2s'}}></div>
        <div className="energy-beam-horizontal left-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" style={{animationDelay: '0.7s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4 glow-text">Qué Ofrecemos</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-8 glow"></div>
          <p className="max-w-3xl mx-auto text-lg text-blue-200 mb-10">
            Soluciones de IA avanzadas diseñadas para transformar y optimizar los procesos de su negocio
          </p>
        </div>

        {/* Services Grid with 3D hover effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`service-card scroll-reveal ${activeService === index ? 'active' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                transform: hoverService === index ? 'translateZ(20px) rotateX(5deg) rotateY(5deg)' : 'translateZ(0) rotateX(0) rotateY(0)',
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => setActiveService(activeService === index ? null : index)}
              onMouseEnter={() => setHoverService(index)}
              onMouseLeave={() => setHoverService(null)}
            >
              <div className={`glass-effect p-8 rounded-xl shadow-lg backdrop-blur-md h-full border border-blue-700/20 bg-gradient-to-br ${service.bgGradient} relative overflow-hidden group`}>
                {/* Animated background */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                
                {/* Glowing icon container */}
                <div className="relative z-10 mb-6">
                  <div className="service-icon-container" style={{borderColor: service.color}}>
                    {React.cloneElement(service.icon as React.ReactElement, {
                      className: "w-10 h-10 text-blue-300 group-hover:text-blue-200 transition-all duration-500",
                      style: { color: service.color }
                    })}
                    <div className="service-icon-glow" style={{backgroundColor: service.color}}></div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-blue-100 mb-3 relative z-10 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-blue-200 mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Features list - visible on active/hover */}
                <div className={`service-features ${(activeService === index || hoverService === index) ? 'visible' : ''}`}>
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent mb-4"></div>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Zap className="w-4 h-4 text-blue-300 mr-2 mt-1 flex-shrink-0" style={{color: service.color}} />
                        <span className="text-blue-200 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Holographic scan effect */}
                <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
                
                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 text-blue-300/70 text-xs flex items-center opacity-70">
                  <span className="mr-1">Ver más</span>
                  <div className={`transition-transform duration-300 ${(activeService === index || hoverService === index) ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Service details section - appears when a service is selected */}
        {activeService !== null && (
          <div className="mt-12 scroll-reveal">
            <div className="glass-effect p-8 rounded-xl backdrop-blur-md border border-blue-700/20 bg-gradient-to-br from-blue-900/50 to-blue-800/30 relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
              
              <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="service-detail-icon-container" style={{borderColor: services[activeService].color}}>
                    {React.cloneElement(services[activeService].icon as React.ReactElement, {
                      className: "w-16 h-16",
                      style: { color: services[activeService].color }
                    })}
                    <div className="service-detail-icon-glow" style={{backgroundColor: services[activeService].color}}></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 mb-4">
                    {services[activeService].title}
                  </h3>
                  <p className="text-xl text-blue-200 mb-6">
                    {services[activeService].description}
                  </p>
                  
                  {/* Detailed features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {services[activeService].features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className="flex-shrink-0 mr-4 bg-blue-800/30 p-2 rounded-full glow">
                          <Zap className="w-5 h-5" style={{color: services[activeService].color}} />
                        </div>
                        <div>
                          <p className="text-blue-100 font-medium">{feature}</p>
                          <p className="text-blue-300 text-sm mt-1">
                            {getFeatureDescription(services[activeService].title, i)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-10 flex justify-center md:justify-start">
                    <a 
                      href="#contact" 
                      className="neon-button gradient-border bg-blue-900/80 backdrop-blur-sm text-white px-10 py-4 rounded-full text-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 glow hover-transition"
                      style={{
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(59, 130, 246, 0.2)'
                      }}
                    >
                      <span className="flex items-center relative">
                        <Brain className="w-6 h-6 mr-3 button-icon" />
                        <span className="button-text">Solicitar Información</span>
                        <span className="button-glow"></span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Stats section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 stagger-children">
          <div className="glass-effect p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-700 hover:shadow-glow float-animation backdrop-blur-md bg-blue-900/10 relative overflow-hidden">
            <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <Cpu className="w-10 h-10 text-blue-300 mx-auto mb-4" />
              <p className="text-blue-300 text-sm uppercase tracking-wider font-medium mb-2">Procesamiento</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">+500TB</p>
              <p className="text-blue-300 text-xs mt-2">Datos procesados</p>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-700 hover:shadow-glow float-animation backdrop-blur-md bg-blue-900/10 relative overflow-hidden" style={{animationDelay: '0.5s'}}>
            <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <ShieldCheck className="w-10 h-10 text-blue-300 mx-auto mb-4" />
              <p className="text-blue-300 text-sm uppercase tracking-wider font-medium mb-2">Seguridad</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">99.9%</p>
              <p className="text-blue-300 text-xs mt-2">Tiempo de actividad</p>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-700 hover:shadow-glow float-animation backdrop-blur-md bg-blue-900/10 relative overflow-hidden" style={{animationDelay: '1s'}}>
            <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <Bot className="w-10 h-10 text-blue-300 mx-auto mb-4" />
              <p className="text-blue-300 text-sm uppercase tracking-wider font-medium mb-2">Automatización</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">+85%</p>
              <p className="text-blue-300 text-xs mt-2">Reducción de tareas manuales</p>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-700 hover:shadow-glow float-animation backdrop-blur-md bg-blue-900/10 relative overflow-hidden" style={{animationDelay: '1.5s'}}>
            <div className="absolute inset-0 hologram-scan opacity-10 rounded-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <Brain className="w-10 h-10 text-blue-300 mx-auto mb-4" />
              <p className="text-blue-300 text-sm uppercase tracking-wider font-medium mb-2">Inteligencia</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">+95%</p>
              <p className="text-blue-300 text-xs mt-2">Precisión en predicciones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get feature descriptions
const getFeatureDescription = (serviceTitle: string, featureIndex: number): string => {
  const descriptions: Record<string, string[]> = {
    "Agentes Personales": [
      "Automatizamos tareas repetitivas para que su equipo se enfoque en lo que realmente importa.",
      "Creamos asistentes virtuales que aprenden de sus necesidades específicas.",
      "Conectamos sus agentes con todos sus sistemas existentes para una experiencia fluida.",
      "Nuestros agentes mejoran constantemente con el uso, adaptándose a nuevos escenarios."
    ],
    "Gestión de Bases de Datos": [
      "Utilizamos IA para predecir tendencias y patrones en sus datos empresariales.",
      "Generamos reportes automáticos personalizados según sus necesidades específicas.",
      "Optimizamos la estructura de sus datos para un acceso y análisis más eficiente.",
      "Conectamos múltiples fuentes de datos para una visión unificada de su negocio."
    ],
    "Optimización de Sistemas": [
      "Analizamos el rendimiento de sus sistemas para identificar áreas de mejora.",
      "Detectamos y solucionamos cuellos de botella antes de que afecten su operación.",
      "Optimizamos procesos clave para maximizar la eficiencia operativa.",
      "Implementamos sistemas de mejora continua que se adaptan automáticamente."
    ],
    "Automatización de Servicios": [
      "Diseñamos flujos de trabajo automatizados que eliminan tareas manuales.",
      "Minimizamos errores humanos en procesos críticos para su negocio.",
      "Creamos soluciones que crecen con su negocio sin aumentar costos operativos.",
      "Implementamos sistemas de monitoreo en tiempo real para una visión clara de su operación."
    ]
  };
  
  return descriptions[serviceTitle]?.[featureIndex] || "Característica avanzada de IA para optimizar su negocio.";
};

export default ServicesSection;