import React, { useState, useEffect, useRef } from 'react';
import { Truck, Ship, Plane, ShieldCheck, Globe, Award, Clock, MapPin, FileText, BarChart } from 'lucide-react';

export const IconMap = {
  Truck: <Truck className="w-6 h-6 md:w-7 md:h-7" />, Ship: <Ship className="w-6 h-6 md:w-7 md:h-7" />, Plane: <Plane className="w-6 h-6 md:w-7 md:h-7" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />, Globe: <Globe className="w-6 h-6 md:w-7 md:h-7" />, Award: <Award className="w-5 h-5 md:w-6 md:h-6" />,
  Clock: <Clock className="w-5 h-5 md:w-6 md:h-6" />, MapPin: <MapPin className="w-5 h-5 md:w-6 md:h-6" />, FileText: <FileText className="w-6 h-6 md:w-7 md:h-7" />,
  BarChart: <BarChart className="w-6 h-6 md:w-7 md:h-7" />
};

export const GlassCard = ({ children, className = '', hover = true, glowColor = 'rgba(243,112,33,0.15)' }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden bg-[#0a0c14]/60 backdrop-blur-3xl border border-white/10 md:border-white/5 rounded-3xl group ${hover ? 'transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-[#121526]/80 hover:border-white/20' : ''} ${className}`}>
      {isHovered && hover && (
        <div className="absolute pointer-events-none transition-opacity duration-300 z-0 hidden md:block"
          style={{ top: mousePos.y, left: mousePos.x, transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }} />
      )}
      <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl z-0`} style={{ boxShadow: `inset 0 0 40px ${glowColor.replace('0.15', '0.05')}` }}></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 hidden md:block"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const AnimatedCounter = ({ value, lang }) => {
  const [count, setCount] = useState(0);
  const toEnglishDigits = (str) => {
    const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    let result = str;
    for(let i=0; i<10; i++) result = result.replace(new RegExp(persianDigits[i], 'g'), i);
    return result;
  };

  const target = parseInt(toEnglishDigits(value).replace(/[^0-9]/g, '')) || 0;
  const hasPlus = value.includes('+');

  useEffect(() => {
    if (target === 0) return;
    let animationFrameId; let startTime = null; const duration = 2500; 

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) animationFrameId = requestAnimationFrame(animate);
      else setCount(target);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target]);

  const formatter = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'fa-IR');
  return (
    <div className="flex items-center justify-center gap-1.5 mt-2" dir="ltr">
      <span className="text-3xl md:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-md">{formatter.format(count)}</span>
      {hasPlus && <span className="text-[#f37021] text-2xl md:text-4xl font-black -mt-2 md:-mt-3 drop-shadow-[0_0_10px_rgba(243,112,33,0.4)]">+</span>}
    </div>
  );
};

export const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);
export const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 1.719-6.98 6.029-.058 1.271-.072 1.681-.072 4.948 0 3.259.014 3.668.072 4.948.2 4.358 1.718 6.78 6.029 6.98 1.271.058 1.681.072 4.948.072 3.26 0 3.668-.014 4.948-.072 4.354-.2 6.782-1.718 6.979-6.029.059-1.271.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-1.717-6.78-6.029-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);