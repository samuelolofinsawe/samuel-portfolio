import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Users, Award, Briefcase, Brain, Database, Cpu, ChevronDown, Menu, X } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };

  const skills = {
    frontend: ['React', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    backend: ['Python', 'Flask', 'Django', 'Java', 'Spring', 'Node.js'],
    database: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase'],
    devops: ['AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'Linux']
  };

  const projects = [
    {
      title: 'E-Pass - Event Ticketing Platform',
      description: 'A comprehensive event ticketing platform helping organizers sell and manage tickets online. Successfully processed over 1,000+ tickets.',
      technologies: ['React', 'Python', 'Flask', 'PostgreSQL', 'AWS'],
      featured: true,
      demoUrl: 'https://www.e-pass.xyz/',
      codeUrl: '#',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop'
    },
    {
      title: 'EMR System - Citadel Global Community Church',
      description: 'Electronic Medical Records system for church health ministry, managing patient records, appointments, and medical history with secure data handling.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
      featured: true,
      demoUrl: null,
      codeUrl: '#',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop'
    },
    {
      title: 'Social Media Platform',
      description: 'Twitter-like social media platform with real-time features, user interactions, and modern responsive design.',
      technologies: ['React', 'Firebase', 'JavaScript', 'CSS'],
      featured: true,
      demoUrl: 'https://newreact-cf95d.web.app/',
      codeUrl: '#',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=200&fit=crop'
    },
    {
      title: 'ShopEase - E-Commerce Platform',
      description: 'Full-featured e-commerce application with product management, shopping cart, and secure payment processing.',
      technologies: ['React', 'Next.js', 'MongoDB', 'Supabase'],
      featured: false,
      demoUrl: 'https://shopease-jade.vercel.app/',
      codeUrl: '#',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    },
    {
      title: "Yenny's Kitchen - Food App",
      description: 'Modern food ordering application with intuitive UI, menu management, and order tracking capabilities.',
      technologies: ['React', 'Firebase', 'JavaScript', 'CSS'],
      featured: false,
      demoUrl: 'https://yenny-s-kitchen-app-pbuj.vercel.app/',
      codeUrl: '#',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&fit=crop'
    }
  ];

  // Animated Background Component
  const AnimatedBackground = () => {
    const shapes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 120 + 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.08 + 0.2,
      shape: Math.random() > 0.6 ? 'circle' : Math.random() > 0.3 ? 'square' : 'triangle',
      moveX: Math.random() * 60 + 20,
      moveY: Math.random() * 60 + 20,
      rotateSpeed: Math.random() * 360 + 200
    }));

    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`absolute ${
              shape.shape === 'circle' 
                ? 'rounded-full' 
                : shape.shape === 'square' 
                ? 'rounded-lg' 
                : 'rounded-sm transform rotate-45'
            } bg-gradient-to-br from-purple-300 via-blue-300 to-indigo-300`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              opacity: shape.opacity,
              animation: `floatMove${shape.id} ${shape.duration}s ease-in-out infinite ${shape.delay}s alternate`
            }}
          />
        ))}
        <style jsx>{`
          ${shapes.map(shape => `
            @keyframes floatMove${shape.id} {
              0% { 
                transform: translate(0, 0) rotate(0deg) scale(1); 
              }
              25% { 
                transform: translate(${shape.moveX * 0.3}px, ${-shape.moveY * 0.3}px) rotate(${shape.rotateSpeed * 0.25}deg) scale(1.1); 
              }
              50% { 
                transform: translate(${shape.moveX}px, ${-shape.moveY}px) rotate(${shape.rotateSpeed * 0.5}deg) scale(0.9); 
              }
              75% { 
                transform: translate(${shape.moveX * 0.7}px, ${-shape.moveY * 0.7}px) rotate(${shape.rotateSpeed * 0.75}deg) scale(1.05); 
              }
              100% { 
                transform: translate(${shape.moveX * 0.5}px, ${-shape.moveY * 0.5}px) rotate(${shape.rotateSpeed}deg) scale(1); 
              }
            }
          `).join('')}
        `}</style>
      </div>
    );
  };

  // Handle scroll to section
  const scrollToSection = (section) => {
    const element = sectionRefs[section].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu when navigating
    }
  };

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionRefs).forEach(([sectionName, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionName);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ section, label, isActive, onClick, mobile = false }) => (
    <button
      onClick={() => onClick(section)}
      className={`${mobile ? 'w-full text-left' : ''} px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
        isActive 
          ? 'text-white bg-purple-600' 
          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
      }`}
    >
      {label}
    </button>
  );

  const SkillCard = ({ title, skills, color }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full ${color} mr-3`}></div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="h-40 sm:h-48 relative overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 ${project.image ? 'bg-black bg-opacity-40' : ''} flex items-center justify-center`}>
          <div className="text-white text-sm sm:text-lg font-medium text-center px-4">{project.title}</div>
        </div>
        {project.featured && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {project.demoUrl ? (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          ) : (
            <div className="flex items-center justify-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-sm">
              <ExternalLink size={14} />
              Private System
            </div>
          )}
          <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
            <Code size={14} />
            Code
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">Samuel's Portfolio</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-2">
              <NavItem 
                section="home" 
                label="Home" 
                isActive={activeSection === 'home'} 
                onClick={scrollToSection} 
              />
              <NavItem 
                section="about" 
                label="About" 
                isActive={activeSection === 'about'} 
                onClick={scrollToSection} 
              />
              <NavItem 
                section="skills" 
                label="Skills" 
                isActive={activeSection === 'skills'} 
                onClick={scrollToSection} 
              />
              <NavItem 
                section="projects" 
                label="Projects" 
                isActive={activeSection === 'projects'} 
                onClick={scrollToSection} 
              />
              <NavItem 
                section="contact" 
                label="Contact" 
                isActive={activeSection === 'contact'} 
                onClick={scrollToSection} 
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <NavItem 
                section="home" 
                label="Home" 
                isActive={activeSection === 'home'} 
                onClick={scrollToSection} 
                mobile
              />
              <NavItem 
                section="about" 
                label="About" 
                isActive={activeSection === 'about'} 
                onClick={scrollToSection} 
                mobile
              />
              <NavItem 
                section="skills" 
                label="Skills" 
                isActive={activeSection === 'skills'} 
                onClick={scrollToSection} 
                mobile
              />
              <NavItem 
                section="projects" 
                label="Projects" 
                isActive={activeSection === 'projects'} 
                onClick={scrollToSection} 
                mobile
              />
              <NavItem 
                section="contact" 
                label="Contact" 
                isActive={activeSection === 'contact'} 
                onClick={scrollToSection} 
                mobile
              />
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={sectionRefs.home} className="min-h-screen flex items-center relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-block animate-bounce mb-4">
                <span className="text-2xl">👋</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Hi, I'm <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent">
                  Samuel Olofinsawe
                </span>
              </h1>
              <div className="text-base sm:text-xl lg:text-2xl text-gray-600 mb-2 flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-1 sm:gap-2">
                <span className="font-semibold text-purple-600">Data Scientist</span>
                <span className="hidden sm:inline">•</span>
                <span className="font-semibold text-blue-600">AI Engineer</span>
                <span className="hidden sm:inline">•</span>
                <span className="font-semibold text-purple-600">Full-Stack Developer</span>
              </div>
              <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                I craft intelligent solutions that bridge the gap between complex data and meaningful insights, 
                building scalable applications that make a real impact.
              </p>
              
              {/* Expertise highlights */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <Brain className="text-purple-600" size={16} />
                  <span className="text-xs sm:text-sm font-medium">Machine Learning</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <Database className="text-blue-600" size={16} />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Data Structures & Algorithms</span>
                  <span className="text-xs sm:text-sm font-medium sm:hidden">DSA</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <Cpu className="text-purple-600" size={16} />
                  <span className="text-xs sm:text-sm font-medium">Cloud Architecture</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 items-center">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View My Work
                </button>
                <button className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 px-6 sm:px-8 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium">
                  Download Resume
                </button>
              </div>
              
              <div className="flex gap-4 justify-center lg:justify-start">
                <a 
                  href="https://github.com/samuelolofinsawe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Github size={20} className="text-gray-700 group-hover:text-purple-600 transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/samuel-olofinsawe-672a372a2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Linkedin size={20} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
                </a>
                <a 
                  href="mailto:samuelolofinsawe30@gmail.com"
                  className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Mail size={20} className="text-gray-700 group-hover:text-purple-600 transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative order-1 lg:order-2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-purple-200 animate-spin" style={{animationDuration: '20s'}}></div>
                <div className="absolute inset-2 sm:inset-4 rounded-full border-2 sm:border-4 border-blue-200 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                <div className="absolute inset-4 sm:inset-8 rounded-full border-2 sm:border-4 border-purple-300 animate-spin" style={{animationDuration: '10s'}}></div>
                
                {/* Center content */}
                <div className="absolute inset-8 sm:inset-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="text-xs sm:text-sm">Epass</div>
                    <div className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">1000+</div>
                    <div className="text-xs sm:text-sm">Tickets Processed</div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-white rounded-lg p-2 sm:p-3 shadow-lg animate-float">
                  <Code className="text-purple-600" size={16} />
                </div>
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white rounded-lg p-2 sm:p-3 shadow-lg animate-float" style={{animationDelay: '1s'}}>
                  <Brain className="text-blue-600" size={16} />
                </div>
                <div className="absolute top-1/2 -left-4 sm:-left-8 bg-white rounded-lg p-2 sm:p-3 shadow-lg animate-float" style={{animationDelay: '2s'}}>
                  <Database className="text-purple-600" size={16} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-purple-600" size={24} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} className="min-h-screen py-16 sm:py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              About <span className="text-purple-600">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6 sm:mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start mb-12 sm:mb-16">
            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">My Journey</h3>
                <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  I'm a versatile <span className="font-semibold text-purple-600">Data Scientist</span>, 
                  <span className="font-semibold text-blue-600"> AI Engineer</span>, and 
                  <span className="font-semibold text-purple-600"> Full-Stack Software Developer</span> with 
                  a passion for building intelligent, scalable solutions.
                </p>
                <p className="text-sm sm:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  I founded <span className="font-bold text-purple-600">E-Pass</span>, a successful event 
                  ticketing platform that has processed over 1,000+ tickets, helping event organizers 
                  streamline their operations and scale their businesses.
                </p>
                <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
                  Currently studying at <span className="font-bold text-blue-600">National Institute of Technology</span>, 
                  where I continue to deepen my expertise in advanced computing and emerging technologies.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">What I Do</h3>
                <p className="text-sm sm:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  My expertise spans across <span className="font-semibold text-blue-600">machine learning</span>, 
                  <span className="font-semibold text-purple-600"> data science</span>, 
                  <span className="font-semibold text-blue-600"> cloud architecture</span>, and 
                  <span className="font-semibold text-purple-600"> full-stack development</span>. 
                  I love turning complex problems into elegant solutions.
                </p>
                <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
                  From building AI-powered applications to developing secure healthcare management systems 
                  like the EMR system for Citadel Global Community Church, I create solutions that make 
                  a real impact in people's lives.
                </p>
              </div>
            </div>

            {/* Right Column - Visual Stats */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg sm:text-xl font-bold">Founder & CEO</h4>
                  <Briefcase size={24} />
                </div>
                <p className="text-purple-100 text-sm sm:text-base">E-Pass Event Ticketing Platform</p>
                <div className="mt-4 text-2xl sm:text-3xl font-bold">1000+ Tickets Processed</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg text-center">
                  <Code className="mx-auto mb-2 sm:mb-3 text-purple-600" size={28} />
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">10+</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Applications Built</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg text-center">
                  <Brain className="mx-auto mb-2 sm:mb-3 text-blue-600" size={28} />
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">AI/ML</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Expertise</div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg">
                <h4 className="font-bold text-base sm:text-lg mb-3 text-gray-800">Core Strengths</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs sm:text-sm">Data Structures & Algorithms</span>
                    <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs sm:text-sm">Machine Learning</span>
                    <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs sm:text-sm">Full-Stack Development</span>
                    <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={sectionRefs.skills} className="min-h-screen py-16 sm:py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            My Technology Stack
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 px-4">
            I work with modern technologies across data science, AI, and full-stack development
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <SkillCard 
              title="Frontend Development" 
              skills={skills.frontend} 
              color="bg-purple-500" 
            />
            <SkillCard 
              title="Backend Development" 
              skills={skills.backend} 
              color="bg-blue-500" 
            />
            <SkillCard 
              title="Database Systems" 
              skills={skills.database} 
              color="bg-green-500" 
            />
            <SkillCard 
              title="DevOps & Cloud" 
              skills={skills.devops} 
              color="bg-red-500" 
            />
          </div>

          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">All Technologies</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4">
              {Object.values(skills).flat().map((skill, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors duration-200 text-xs sm:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="min-h-screen py-16 sm:py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            My <span className="text-purple-600">Projects</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 px-4">
            Here are some of my key projects showcasing my versatility in data science, AI, and full-stack development
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} className="min-h-screen py-16 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Get In <span className="text-purple-600">Touch</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 px-4">
            Let's discuss your next project or collaboration opportunity
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-purple-600 flex-shrink-0" size={18} />
                    <span className="text-sm sm:text-base break-all">samuelolofinsawe30@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Github className="text-purple-600 flex-shrink-0 mt-0.5" size={18} />
                    <a 
                      href="https://github.com/samuelolofinsawe" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-purple-600 hover:underline break-all"
                    >
                      https://github.com/samuelolofinsawe
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Linkedin className="text-purple-600 flex-shrink-0 mt-0.5" size={18} />
                    <a 
                      href="https://www.linkedin.com/in/samuel-olofinsawe-672a372a2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-purple-600 hover:underline break-all"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Send Message</h3>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                  ></textarea>
                  <button
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-sm sm:text-base"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 sm:mt-16">
            <div className="flex justify-center gap-4 mb-6">
              <a 
                href="https://github.com/samuelolofinsawe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <Github size={20} className="text-gray-700 group-hover:text-purple-600 transition-colors" />
              </a>
              <a 
                href="https://www.linkedin.com/in/samuel-olofinsawe-672a372a2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <Linkedin size={20} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
              </a>
              <a 
                href="mailto:samuelolofinsawe30@gmail.com"
                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <Mail size={20} className="text-gray-700 group-hover:text-purple-600 transition-colors" />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              © 2025 Samuel Olofinsawe. Built with React and passion for innovation.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        @media (max-width: 640px) {
          .line-clamp-3 {
            -webkit-line-clamp: 2;
          }
        }
      `}</style>
    </div>
  );
};

export default App;