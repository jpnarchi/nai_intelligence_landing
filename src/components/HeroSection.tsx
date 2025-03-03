import React, { useEffect, useRef, useState } from 'react';
import { Brain, ChevronDown, Zap, Code, Shield, Database } from 'lucide-react';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mark as loaded after initial animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // Create particles with reduced count for better performance
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;

      // Clear existing particles first to prevent duplicates
      particlesContainer.innerHTML = '';

      // Reduced particle count for better performance
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // More varied sizes for depth perception
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity based on size for depth effect
        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        
        // Different animation durations for more natural movement
        particle.style.animation = `floating ${Math.random() * 15 + 10}s linear infinite`;
        
        particlesContainer.appendChild(particle);
      }
    };

    // Create digital circuit lines with reduced count
    const createCircuitLines = () => {
      const circuitContainer = document.querySelector('.circuit-lines');
      if (!circuitContainer) return;
      
      circuitContainer.innerHTML = '';
      
      // Horizontal lines
      for (let i = 0; i < 12; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line', 'horizontal');
        line.style.top = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 30 + 20}%`;
        line.style.left = `${Math.random() * 70}%`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        circuitContainer.appendChild(line);
      }
      
      // Vertical lines
      for (let i = 0; i < 12; i++) {
        const line = document.createElement('div');
        line.classList.add('circuit-line', 'vertical');
        line.style.left = `${Math.random() * 100}%`;
        line.style.height = `${Math.random() * 30 + 20}%`;
        line.style.top = `${Math.random() * 70}%`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        circuitContainer.appendChild(line);
      }
      
      // Nodes at intersections
      for (let i = 0; i < 15; i++) {
        const node = document.createElement('div');
        node.classList.add('circuit-node');
        node.style.top = `${Math.random() * 100}%`;
        node.style.left = `${Math.random() * 100}%`;
        node.style.animationDelay = `${Math.random() * 5}s`;
        circuitContainer.appendChild(node);
      }
      
      // Add data pulses along some lines
      for (let i = 0; i < 8; i++) {
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

    // 3D parallax effect for title and elements - optimized
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the container
      const x = (clientX - left - width / 2) / (width / 2);
      const y = (clientY - top - height / 2) / (height / 2);
      
      setMousePosition({ x, y });
      
      // Apply 3D transform to title - reduced intensity
      if (titleRef.current) {
        titleRef.current.style.transform = `
          perspective(1000px)
          rotateX(${y * -2}deg)
          rotateY(${x * 2}deg)
          translateZ(20px)
        `;
      }
      
      // Move floating orbs in parallax - reduced count and effect
      const orbs = document.querySelectorAll('.floating-orb');
      orbs.forEach((orb, index) => {
        const depth = 0.03 + (index % 3) * 0.02;
        const orbElement = orb as HTMLElement;
        orbElement.style.transform = `translate(${x * depth * 50}px, ${y * depth * 50}px)`;
      });
    };

    // Create digital rain effect with reduced elements
    const createDigitalRain = () => {
      const rainContainer = document.querySelector('.digital-rain');
      if (!rainContainer) return;
      
      rainContainer.innerHTML = '';
      
      const width = window.innerWidth;
      // Reduced column count for better performance
      const columns = Math.floor(width / 60); 
      
      for (let i = 0; i < columns; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        drop.style.left = `${i * 60 + Math.random() * 10}px`;
        drop.style.animationDuration = `${Math.random() * 10 + 10}s`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        drop.style.opacity = `${Math.random() * 0.2 + 0.05}`;
        
        // Add random binary characters - reduced count
        const chars = '01'.split('');
        for (let j = 0; j < 10; j++) {
          const char = document.createElement('div');
          char.textContent = chars[Math.floor(Math.random() * chars.length)];
          char.style.animationDelay = `${Math.random() * 2}s`;
          drop.appendChild(char);
        }
        
        rainContainer.appendChild(drop);
      }
    };

    // Create floating 3D objects with reduced count
    const createFloatingObjects = () => {
      const objectsContainer = document.querySelector('.floating-objects');
      if (!objectsContainer) return;
      
      objectsContainer.innerHTML = '';
      
      const shapes = ['cube', 'pyramid', 'sphere', 'ring'];
      
      // Reduced object count for better performance
      for (let i = 0; i < 6; i++) {
        const obj = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        obj.classList.add('floating-object', shape);
        obj.style.top = `${Math.random() * 100}%`;
        obj.style.left = `${Math.random() * 100}%`;
        obj.style.animationDuration = `${Math.random() * 20 + 20}s`;
        obj.style.animationDelay = `${Math.random() * 5}s`;
        obj.style.opacity = `${Math.random() * 0.2 + 0.1}`;
        obj.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
        
        objectsContainer.appendChild(obj);
      }
    };

    // Create 3D holographic icons with reduced count
    const createHolographicIcons = () => {
      const iconsContainer = document.querySelector('.holographic-icons');
      if (!iconsContainer) return;
      
      iconsContainer.innerHTML = '';
      
      const icons = [
        { component: Brain, color: '#60a5fa' },
        { component: Code, color: '#34d399' },
        { component: Shield, color: '#a78bfa' },
        { component: Database, color: '#f472b6' }
      ];
      
      icons.forEach((icon, index) => {
        const iconContainer = document.createElement('div');
        iconContainer.className = 'absolute holographic-icon';
        iconContainer.style.top = `${20 + Math.random() * 60}%`;
        iconContainer.style.left = `${10 + Math.random() * 80}%`;
        iconContainer.style.animationDelay = `${index * 0.5}s`;
        iconContainer.style.zIndex = '1';
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '40');
        svg.setAttribute('height', '40');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', icon.color);
        svg.setAttribute('stroke-width', '1.5');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.classList.add('hologram-icon');
        
        // Add paths based on icon type
        if (icon.component === Brain) {
          svg.innerHTML = `
            <path d="M9.5 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5z"></path>
            <path d="M14.5 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5z"></path>
            <path d="M3 10a2 2 0 0 0 2 2h1v4c0 1.1.9 2 2 2h3.5"></path>
            <path d="M21 10a2 2 0 0 1-2 2h-1v4c0 1.1-.9 2-2 2h-3.5"></path>
            <path d="M9.5 2C9.5 5.5 7 8.5 7 10a4 4 0 0 0 8 0c0-1.5-2.5-4.5-2.5-8"></path>
          `;
        } else if (icon.component === Code) {
          svg.innerHTML = `
            <path d="m8 3 4 18"></path>
            <path d="m3 8 18 8"></path>
            <path d="m3 16 18-8"></path>
          `;
        } else if (icon.component === Shield) {
          svg.innerHTML = `
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
            <path d="m9 12 2 2 4-4"></path>
          `;
        } else if (icon.component === Database) {
          svg.innerHTML = `
            <path d="M12 2a8 8 0 0 0-8 8v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V10a8 8 0 0 0-8-8"></path>
            <path d="M4 10h16"></path>
            <path d="M4 16h16"></path>
          `;
        }
        
        iconContainer.appendChild(svg);
        
        // Add glow effect
        const glow = document.createElement('div');
        glow.className = 'absolute inset-0 rounded-full blur-md';
        glow.style.backgroundColor = `${icon.color}20`;
        glow.style.animation = 'pulse 3s ease-in-out infinite';
        
        iconContainer.insertBefore(glow, svg);
        
        iconsContainer.appendChild(iconContainer);
      });
    };

    // Create simplified aurora effect
    const createAuroraEffect = () => {
      const auroraContainer = document.querySelector('.aurora-effect');
      if (!auroraContainer) return;
      
      auroraContainer.innerHTML = '';
      
      // Reduced wave count for better performance
      for (let i = 0; i < 2; i++) {
        const aurora = document.createElement('div');
        aurora.classList.add('aurora-wave');
        aurora.style.animationDelay = `${i * 1}s`;
        aurora.style.opacity = `${0.2 - i * 0.05}`;
        auroraContainer.appendChild(aurora);
      }
    };

    // Create simplified neural network effect
    const createNeuralNetwork = () => {
      const networkContainer = document.querySelector('.neural-network');
      if (!networkContainer) return;
      
      networkContainer.innerHTML = '';
      
      // Create nodes - reduced count
      const nodes = [];
      for (let i = 0; i < 8; i++) {
        const node = document.createElement('div');
        node.classList.add('neural-node');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        node.style.animationDelay = `${Math.random() * 3}s`;
        networkContainer.appendChild(node);
        nodes.push({ element: node, x, y });
      }
      
      // Create connections - reduced count
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() > 0.5) continue; // Only connect some nodes
          
          const connection = document.createElement('div');
          connection.classList.add('neural-connection');
          
          // Calculate distance and angle
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          // Set connection style
          connection.style.width = `${distance}%`;
          connection.style.left = `${nodes[i].x}%`;
          connection.style.top = `${nodes[i].y}%`;
          connection.style.transform = `rotate(${angle}deg)`;
          connection.style.transformOrigin = 'left center';
          connection.style.opacity = `${0.1 + Math.random() * 0.1}`;
          
          // Add pulse animation to some connections - reduced frequency
          if (Math.random() > 0.8) {
            const pulse = document.createElement('div');
            pulse.classList.add('neural-pulse');
            pulse.style.animationDuration = `${2 + Math.random() * 3}s`;
            connection.appendChild(pulse);
          }
          
          networkContainer.appendChild(connection);
        }
      }
    };

    createParticles();
    createCircuitLines();
    createDigitalRain();
    createFloatingObjects();
    createHolographicIcons();
    createAuroraEffect();
    createNeuralNetwork();
    
    // Add event listeners with throttling for better performance
    let lastTime = 0;
    const throttleTime = 50; // ms
    
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime >= throttleTime) {
        lastTime = now;
        handleMouseMove(e);
      }
    };
    
    window.addEventListener('mousemove', throttledMouseMove);
    
    // Animate title letters on load
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = '';
      
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${index * 0.1}s`;
        span.classList.add('animated-letter');
        titleRef.current?.appendChild(span);
      });
    }

    // Fix for subtitle text - ensure it's fully visible
    if (subtitleRef.current) {
      // Remove typewriter effect that might be cutting off text
      subtitleRef.current.classList.remove('typewriter');
      
      // Add a different animation that ensures full visibility
      subtitleRef.current.classList.add('fade-in-text');
      
      // Make sure the container has enough width
      const container = subtitleRef.current.parentElement;
      if (container) {
        container.style.width = '100%';
        container.style.maxWidth = '800px';
      }
    }

    // Clean up function
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      const particlesContainer = document.querySelector('.particles');
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 circuit-pattern transition-all duration-1000 ease-in-out overflow-hidden">
      {/* Background layers - circuit pattern from success cases section */}
      <div className="absolute inset-0 circuit-pattern opacity-20 transition-opacity duration-1000"></div>
      <div className="particles absolute inset-0 z-0 transition-all duration-500"></div>
      <div className="absolute inset-0 cyber-grid opacity-5 transition-opacity duration-1000"></div>
      <div className="digital-rain absolute inset-0 z-0 opacity-20"></div>
      <div className="circuit-lines absolute inset-0 z-0 opacity-40"></div>
      <div className="floating-objects absolute inset-0 z-0"></div>
      <div className="holographic-icons absolute inset-0 z-0"></div>
      <div className="aurora-effect absolute inset-0 z-0 opacity-20"></div>
      <div className="neural-network absolute inset-0 z-0"></div>
      
      {/* Animated background gradient - simplified */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-blue-950/40 to-blue-950/80"></div>
      
      {/* Floating orbs with glow effects - reduced count */}
      <div className="floating-orb absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000"></div>
      <div className="floating-orb absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse transition-all duration-1000" style={{animationDelay: '1.5s'}}></div>
      
      {/* Animated energy beams - reduced */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="energy-beam left-1/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"></div>
        <div className="energy-beam right-1/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400/30 to-transparent" style={{animationDelay: '1.2s'}}></div>
      </div>
      
      {/* Holographic grid floor - simplified */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] perspective-floor opacity-20"></div>
      
      {/* Main content */}
      <div ref={containerRef} className="container mx-auto px-4 md:px-6 py-16 z-10 relative perspective-1000">
        <div className="flex flex-col items-center text-center">
          {/* 3D Logo with glow effect */}
          <div className="flex items-center mb-8 md:mb-12 reveal">
            <div className="relative transform-gpu transition-all duration-700 hover:scale-110">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse transition-all duration-700"></div>
              <div className="brain-container">
                {/* Improved Brain SVG with explicit dimensions and styling */}
                <Brain 
                  className="w-16 h-16 md:w-24 md:h-24 text-blue-400 mr-3 glow-pulse transition-all duration-700 brain-3d" 
                  size={96} 
                  strokeWidth={1.5}
                />
                <div className="brain-shadow"></div>
              </div>
            </div>
            
            {/* 3D Text with hover effect */}
            <h1 
              ref={titleRef} 
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white transition-all duration-700 transform-gpu title-3d ml-4"
              style={{
                textShadow: '0 0 20px rgba(59, 130, 246, 0.7), 0 0 40px rgba(59, 130, 246, 0.4)'
              }}
            >
              <span className="text-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-100 to-blue-300">
                <span className="inline-block">NAI -</span> <span className="inline-block">Intelligence</span>
              </span>
            </h1>
          </div>
          
          {/* Enhanced subtitle with full visibility */}
          <div className="mb-8 md:mb-12 w-full max-w-3xl mx-auto">
            <div 
              ref={subtitleRef}
              className="text-xl md:text-2xl font-light text-blue-200 fade-in-text glow-text transition-all duration-700"
              style={{
                textShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
              }}
            >
              Soluciones de Inteligencia Artificial para automatizar y optimizar su negocio
            </div>
          </div>
          
          {/* Enhanced feature badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12 w-full max-w-3xl mx-auto">
            {[
              { icon: <Brain className="w-5 h-5" />, text: "IA Avanzada" },
              { icon: <Zap className="w-5 h-5" />, text: "Automatización" },
              { icon: <Database className="w-5 h-5" />, text: "Gestión de Datos" },
              { icon: <Shield className="w-5 h-5" />, text: "Seguridad" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="feature-badge glass-effect px-3 py-2 md:px-4 md:py-3 rounded-full flex items-center justify-center gap-2 text-blue-200 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="p-1.5 rounded-full bg-blue-900/50 glow">
                  {feature.icon}
                </div>
                <span className="text-xs md:text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          
          {/* Glowing button with hover effects */}
          <div className="animate fade-up transition-all duration-700 z-10 mb-12 md:mb-16">
            <button 
              onClick={scrollToServices}
              className="neon-button gradient-border bg-blue-900/80 backdrop-blur-sm text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 glow hover-transition"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(59, 130, 246, 0.2)'
              }}
            >
              <span className="flex items-center relative">
                <Zap className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 button-icon" />
                <span className="button-text">Descubrir Soluciones</span>
                <span className="button-glow"></span>
              </span>
            </button>
          </div>
          
          {/* Enhanced scroll indicator with animation */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-700 scroll-indicator">
            <div className="flex flex-col items-center cursor-pointer" onClick={scrollToServices}>
              <span className="text-blue-300 text-sm mb-2 animate-pulse">Descubre Más</span>
              <div className="p-2 rounded-full bg-blue-900/50 border border-blue-500/30 glow">
                <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-blue-400 glow animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at bottom for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950 to-transparent"></div>
    </header>
  );
};

export default HeroSection;
