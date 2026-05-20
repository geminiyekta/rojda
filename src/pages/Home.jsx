import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Globe, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import TransitRouter from '../components/TransitRouter';
import { GlassCard, AnimatedCounter, IconMap } from '../components/ui';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

export default function Home() {
  const { t, lang, isRtl } = useOutletContext();

  // کدهای اسکیما برای معرفی رسمی شرکت لجستیک به هوش مصنوعی گوگل
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    "name": t.brand,
    "image": "https://rojdagroup.com/RojdaLogistic (4).png",
    "url": "https://rojdagroup.com",
    "telephone": "+989007008001",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marivan",
      "addressCountry": "IR"
    },
    "areaServed": ["IR", "TR", "IQ", "RU", "AE"],
    "description": t.hero.subtitle
  };

  return (
    <>
      <Helmet>
        <title>صفحه اصلی | نام سایت من</title>
        <meta name="description" content="توضیحات مخصوص صفحه اصلی سایت" />
      </Helmet>
      <SEO 
        title={`${t.brand} | ${lang === 'en' ? 'International Transport & Logistics' : 'حمل و نقل بین‌المللی روژدا'}`} 
        description={t.seoText}
        lang={lang}
        schemaMarkup={orgSchema}
      />

      <article className="space-y-20 md:space-y-32">
        
        {/* 🚀 Hero Section */}
        <section aria-labelledby="hero-heading" className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 pt-4 md:pt-10">
          <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-start w-full relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-black tracking-widest backdrop-blur-2xl shadow-[0_0_30px_rgba(243,112,33,0.15)] group">
              <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f37021] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-[#f37021]"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f37021] via-orange-400 to-orange-200 uppercase">{t.hero.badge}</span>
            </div>
            
            <div className="relative">
              <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.3] md:leading-[1.2] tracking-tight text-white">
                <span className="block opacity-95">{t.hero.title.split('\n')[0]}</span>
                <span className="block mt-1 md:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-gray-500 animate-[shimmer_3s_infinite_linear] bg-[length:200%_auto]">{t.hero.title.split('\n')[1]}</span>
              </h1>
            </div>
            
            <div className="relative max-w-2xl mx-auto lg:mx-0">
               <div className={`absolute ${isRtl ? '-right-4 md:-right-6' : '-left-4 md:-left-6'} top-1 bottom-1 w-1 bg-gradient-to-b from-[#f37021] to-transparent rounded-full opacity-40`}></div>
               <p className="text-sm md:text-lg text-gray-300 leading-loose font-light text-justify px-4 md:px-0">{t.hero.subtitle}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 justify-center lg:justify-start pt-4">
              <Link to={`/${lang}/contact`} className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 rounded-2xl bg-[#f37021] hover:bg-[#ff8033] text-white font-black shadow-[0_15px_35px_rgba(243,112,33,0.35)] transition-all flex items-center justify-center gap-3 group text-base md:text-lg">
                <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-2 ${!isRtl ? 'rotate-180 group-hover:translate-x-2' : ''}`} /> {t.hero.cta1}
              </Link>
              <Link to={`/${lang}/services`} className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all text-base md:text-lg">{t.hero.cta2}</Link>
            </div>
          </div>
          
          {/* Animated Globe / Visual */}
          <div className="flex-1 w-full h-[400px] md:h-[500px] lg:h-[650px] hidden lg:flex relative items-center justify-center perspective-1000">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/15 via-transparent to-[#f37021]/15 rounded-full blur-[100px] animate-pulse"></div>
             <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full border border-white/5 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute w-[80%] h-[80%] rounded-full border border-white/10 flex items-center justify-center"><Globe className="w-20 h-20 md:w-24 md:h-24 text-white/10 animate-pulse" /></div>
                <div className="relative z-10 w-5 h-5 md:w-6 md:h-6 bg-[#f37021] rounded-full shadow-[0_0_40px_#f37021]"><div className="absolute inset-0 rounded-full bg-[#f37021] animate-ping"></div></div>
             </div>
             <div className="absolute inset-0 pointer-events-none">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <div key={i} className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-[#f37021]/50 to-transparent origin-left opacity-30" style={{ transform: `rotate(${angle}deg)` }}>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full absolute top-[-3px] md:top-[-4px] animate-[move_3s_linear_infinite]" style={{ animationDelay: `${i * 0.5}s` }}></div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* 📊 Statistics Section */}
        <section aria-label="Company Statistics" className="relative z-20 w-full max-w-5xl mx-auto mt-8 md:mt-16 mb-8 md:mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-[#f37021]/5 to-blue-900/10 rounded-[2rem] md:rounded-[2.5rem] blur-2xl -z-10"></div>
          <div className="relative rounded-[2rem] md:rounded-[2.5rem] p-[1px] md:p-[2px] overflow-hidden shadow-[0_15px_45px_-10px_rgba(0,0,0,0.6)] group">
             <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_70%,#f37021_100%)] animate-[spin_3s_linear_infinite] origin-center w-[200%] h-[200%] top-[-50%] left-[-50%] opacity-50 md:opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative bg-[#05060A]/95 backdrop-blur-3xl rounded-[calc(2rem-1px)] md:rounded-[calc(2.5rem-2px)] p-6 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-y-10 gap-x-4 lg:divide-x lg:divide-x-reverse divide-white/10 h-full w-full">
                {t.hero.stats.map((stat, idx) => (
                  <div key={idx} className="w-full flex flex-col items-center justify-center text-center group">
                     <div className="relative mb-3 md:mb-4">
                        <div className="absolute inset-0 bg-[#f37021] rounded-full blur-md md:blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[1.25rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#f37021] group-hover:border-[#f37021]/50 transition-all duration-500 shadow-lg">{IconMap[stat.icon]}</div>
                     </div>
                     <AnimatedCounter value={stat.value} lang={lang} />
                     <div className="text-gray-400 text-[10px] md:text-sm font-bold mt-1 md:mt-2 uppercase tracking-[0.1em]">{stat.label}</div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* 🗺️ Transit Router Component */}
        <TransitRouter lang={lang} isRtl={isRtl} />

        {/* 🛣️ Corridors Section */}
        <section aria-labelledby="corridors-heading" className="space-y-10 md:space-y-12">
           <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4 px-4">
              <h2 id="corridors-heading" className="text-2xl md:text-4xl font-black text-white">{t.routes.title}</h2>
              <p className="text-sm md:text-base text-gray-400 font-light">{t.routes.desc}</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
             {t.routes.items.map((route, idx) => (
               <GlassCard key={idx} className="p-5 md:p-6 flex flex-col group">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#f37021] transition-colors"><MapPin className="w-4 h-4 md:w-5 md:h-5" /></div>
                    <h3 className="text-base md:text-lg font-bold text-white">{route.title}</h3>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-5 md:mb-6 flex-grow">{route.desc}</p>
                  <div className="mt-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0c14] text-[10px] md:text-xs font-bold text-gray-400 border border-white/5">
                    <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500" /> {route.border}
                  </div>
               </GlassCard>
             ))}
           </div>
        </section>
      </article>
    </>
  );
}