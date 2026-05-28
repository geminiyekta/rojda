import React, { useState, useEffect, useMemo } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Zap, Menu, X, ChevronRight, MapPin, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { translations } from '../utils/dictionary';
import { LinkedinIcon, InstagramIcon } from '../components/ui';

export default function MainLayout() {
  const { lang = 'fa' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[lang] || translations['fa'];
  const isRtl = t.dir === 'rtl';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, t.dir]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const changeLanguage = (newLang) => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (['fa', 'en', 'ku'].includes(pathParts[0])) {
      pathParts[0] = newLang;
    } else {
      pathParts.unshift(newLang);
    }
    navigate(`/${pathParts.join('/')}`);
  };

  const appFontFamily = lang === 'en' ? 'system-ui, sans-serif' : '"Vazirmatn", system-ui, sans-serif';
  const outletContext = useMemo(() => ({ t, lang, isRtl }), [t, lang, isRtl]);

  return (
    <div className={`min-h-screen bg-[#05060A] text-gray-100 flex flex-col selection:bg-[#f37021] selection:text-white overflow-x-hidden w-full`} style={{ fontFamily: appFontFamily }} dir={t.dir}>
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#f37021]/10 blur-[120px]"></div>
      </div>

      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center ${scrolled ? 'top-0 md:top-4 px-0 md:px-4' : 'top-0'}`}>
        <nav className={`w-full transition-all duration-500 relative z-50 ${scrolled ? 'max-w-7xl bg-gradient-to-r from-[#1b153a]/95 via-[#0a0c14]/95 to-[#1b153a]/95 backdrop-blur-2xl border-b md:border border-white/10 shadow-[0_20px_50px_-10px_rgba(30,21,61,0.5)] md:rounded-[2.5rem] px-4 lg:px-6' : 'max-w-full bg-gradient-to-b from-[#05060A]/95 to-transparent px-4 lg:px-8 border-transparent'}`}>
          <div className="flex items-center justify-between h-20 md:h-24">
            
            <Link to={`/${lang}`} className="flex items-center gap-3 cursor-pointer z-50 group">
              <div className="bg-white/95 px-3 py-2 rounded-2xl border border-white/20 shadow-[0_0_20px_rgba(63,50,130,0.3)] group-hover:scale-105 transition-transform">
                <img src="/logo.png" alt={`${t.brand} Logo`} className="h-10 md:h-12 w-auto object-contain" />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8 font-medium">
              {['home', 'services', 'about', 'blog', 'contact'].map((item) => {
                const path = item === 'home' ? `/${lang}` : `/${lang}/${item}`;
                const isActive = location.pathname === path || (item === 'home' && location.pathname === `/${lang}/`);
                return (
                  <Link key={item} to={path} className={`text-sm transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                    {t.nav[item]}
                    <span className={`absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#f37021] rounded-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'}`}></span>
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-1 bg-[#1a1c29] border border-white/5 rounded-full p-1">
                {['fa', 'en', 'ku'].map(l => (
                  <button key={l} onClick={() => changeLanguage(l)} className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full transition-all ${lang === l ? 'bg-[#f37021] text-white' : 'text-gray-400 hover:text-white'}`}>{l.toUpperCase()}</button>
                ))}
              </div>
              
              <Link to={`/${lang}/contact`} className="px-6 py-2.5 rounded-full bg-[#f37021]/10 border border-[#f37021]/30 text-[#f37021] hover:bg-[#f37021] hover:text-white transition-all duration-500 text-sm font-black flex items-center gap-2 shadow-[0_0_20px_rgba(243,112,33,0.1)] hover:shadow-[0_0_25px_rgba(243,112,33,0.3)] group">
                <Zap className="w-4 h-4 animate-pulse group-hover:scale-110" />
                {t.nav.getQuote}
              </Link>
              
              {/* کامنت شده، چون فعلا صفحه لاگین را روت نکردیم، اگر داشتید فعال کنید */}
              {/* <Link to={`/${lang}/auth`} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-bold flex items-center gap-2">
                <LogIn className="w-4 h-4 text-[#f37021]" /> {t.auth.portalLogin}
              </Link> */}
            </div>
            
            <button aria-label="Toggle Mobile Menu" className="lg:hidden text-white p-2 z-[60] relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </nav>

        <div className={`lg:hidden fixed inset-0 bg-[#05060A]/98 backdrop-blur-3xl z-40 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-full'}`}>
          <div className="flex flex-col h-full justify-center px-8 space-y-6">
            <div className="flex items-center justify-start gap-2 mb-4">
                <div className="flex items-center gap-1 bg-[#1a1c29] border border-white/5 rounded-full p-1.5 w-fit shadow-lg">
                    {['fa', 'en', 'ku'].map(l => (
                    <button 
                        key={l} 
                        onClick={() => changeLanguage(l)} 
                        className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-full transition-all ${lang === l ? 'bg-[#f37021] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                        {l.toUpperCase()}
                    </button>
                    ))}
                </div>
                </div>
            {['home', 'services', 'about', 'blog', 'contact'].map((item) => {
              const path = item === 'home' ? `/${lang}` : `/${lang}/${item}`;
              const isActive = location.pathname === path;
              return (
                <Link key={item} to={path} onClick={() => setIsMenuOpen(false)} className={`text-xl md:text-2xl font-bold text-start transition-colors ${isActive ? 'text-[#f37021]' : 'text-white hover:text-[#f37021]/80'}`}>
                  {t.nav[item]}
                </Link>
              );
            })}
            
            <div className="h-px bg-white/10 my-4"></div>

            <Link to={`/${lang}/contact`} onClick={() => setIsMenuOpen(false)} className="w-full py-4 rounded-xl border border-[#f37021]/30 bg-[#f37021]/5 text-[#f37021] font-black flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(243,112,33,0.1)] active:scale-95 transition-transform">
               <Zap className="w-5 h-5 animate-pulse" /> {t.nav.getQuote}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow pt-24 md:pt-36 pb-16 md:pb-24 relative z-10 px-4 sm:px-6 lg:px-8 container mx-auto">
        <Outlet context={outletContext} />
      </main>

      <footer className="relative mt-20 md:mt-32 border-t border-white/5 bg-[#030407] pt-16 md:pt-24 pb-8 md:pb-12 z-10 overflow-hidden">
         <div className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
         <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#f37021]/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
         
         <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <section aria-label="Call to action" className="mb-12 md:mb-20">
               <div className="relative p-[1px] rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r from-white/10 via-[#f37021]/30 to-white/10">
                  <div className="bg-[#0a0c14]/95 backdrop-blur-2xl rounded-[calc(2rem-1px)] md:rounded-[calc(2.5rem-2px)] p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#f37021]/10 blur-3xl rounded-full"></div>
                     <div className="relative z-10 text-center lg:text-start">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2 md:mb-3 leading-snug">{t.footer.ctaTitle}</h3>
                        <p className="text-gray-400 text-xs md:text-sm lg:text-base font-light leading-relaxed">{t.contact.desc}</p>
                     </div>
                     <Link to={`/${lang}/contact`} className="w-full lg:w-auto relative z-10 px-6 py-4 md:px-8 md:py-5 rounded-xl md:rounded-2xl bg-[#f37021] hover:bg-[#ff8033] text-white font-black shadow-[0_15px_30px_-10px_rgba(243,112,33,0.5)] transition-all flex items-center justify-center gap-2 md:gap-3 group whitespace-nowrap text-sm md:text-base">
                        {t.footer.ctaBtn} <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2 ${isRtl ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                     </Link>
                  </div>
               </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-16 mb-16 md:mb-20">
               <div className="md:col-span-12 lg:col-span-4 space-y-6 md:space-y-8 text-center lg:text-start flex flex-col items-center lg:items-start">
                  <div className="bg-white/95 px-5 py-3 md:px-6 md:py-4 rounded-2xl inline-block shadow-2xl border border-white/20">
                    <img src="/logo.png" alt={`${t.brand} Logo`} className="h-10 md:h-12 w-auto object-contain" />
                  </div>
                  <p className="text-gray-400 leading-relaxed text-xs md:text-sm lg:text-base font-light text-center lg:text-justify max-w-md lg:max-w-none">
                    {t.footer.desc}
                  </p>
                  <div className="flex items-center gap-4 md:gap-5 justify-center lg:justify-start">
                    <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"><LinkedinIcon /></a>
                    <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-[#f09433] hover:to-[#bc1888] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"><InstagramIcon /></a>
                  </div>
               </div>

               <nav className="md:col-span-6 lg:col-span-2">
                 <h4 className="text-base md:text-lg font-black text-white mb-5 md:mb-8 flex items-center justify-center lg:justify-start gap-3">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#f37021] animate-pulse"></div> {t.footer.quickLinksTitle}
                 </h4>
                 <ul className="space-y-3 md:space-y-5 text-gray-400 text-xs md:text-sm lg:text-base font-medium flex flex-col items-center lg:items-start">
                    {t.footer.quickLinks.map((item, i) => (
                      <li key={i}>
                        <Link to={`/${lang}/${item.target === 'services' ? 'services' : item.target}`} className="hover:text-white hover:ps-1 md:hover:ps-2 rtl:hover:pe-1 rtl:md:hover:pe-2 rtl:hover:ps-0 transition-all duration-300 flex items-center gap-2 group">
                          <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 text-[#f37021] opacity-0 group-hover:opacity-100 transition-all ${!isRtl ? 'rotate-180' : ''}`} /> {item.label}
                        </Link>
                      </li>
                    ))}
                 </ul>
               </nav>

               <div className="md:col-span-6 lg:col-span-3">
                 <h4 className="text-base md:text-lg font-black text-white mb-5 md:mb-8 flex items-center justify-center lg:justify-start gap-3">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#f37021] animate-pulse"></div> {t.footer.trustTitle}
                 </h4>
                 <div className="space-y-3 md:space-y-4">
                    {t.footer.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
                        <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">{cert}</span>
                      </div>
                    ))}
                 </div>
               </div>

               <address className="md:col-span-12 lg:col-span-3 space-y-4 md:space-y-6 not-italic">
                 <h4 className="text-base md:text-lg font-black text-white mb-5 md:mb-8 flex items-center justify-center lg:justify-start gap-3">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#f37021] animate-pulse"></div> {t.footer.contactTitle}
                 </h4>
                 <div className="space-y-3 md:space-y-4 max-w-sm mx-auto lg:max-w-none">
                    <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 group hover:border-[#f37021]/30 transition-all">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#f37021] shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-gray-400 leading-relaxed group-hover:text-gray-200">{t.contact.address}</span>
                    </div>
                    <a href={`tel:${t.contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 group hover:border-[#f37021]/30 transition-all w-full">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#f37021] shrink-0" />
                      <span dir="ltr" className="text-sm md:text-base font-bold text-gray-300 group-hover:text-white tabular-nums tracking-wide">{t.contact.phone}</span>
                    </a>
                    <a href={`mailto:${t.contact.email}`} className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 group hover:border-[#f37021]/30 transition-all w-full overflow-hidden">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#f37021] shrink-0" />
                      <span className="text-xs md:text-sm text-gray-400 font-medium group-hover:text-white truncate">{t.contact.email}</span>
                    </a>
                 </div>
               </address>
            </div>
         </div>
      </footer>

      <a href="https://wa.me/989007008003" aria-label="Chat on WhatsApp" target="_blank" rel="noopener noreferrer" className={`fixed bottom-5 md:bottom-6 ${isRtl ? 'left-4 md:left-6' : 'right-4 md:right-6'} z-[100] flex items-center gap-2 md:gap-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2.5 md:px-5 md:py-3.5 rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:scale-105 transition-all group`}>
         <span className="font-bold text-xs md:text-sm overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-xs transition-all duration-500 ease-out">{lang === 'en' ? 'Consultation' : lang === 'ku' ? 'ڕاوێژکاری' : 'مشاوره تخصصی'}</span>
         <svg className="w-5 h-5 md:w-6 md:h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.441-1.273.6-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.74 10.564 10.564 0 5.825-4.74 10.563-10.564 10.562z"/></svg>
      </a>
    </div>
  );
}