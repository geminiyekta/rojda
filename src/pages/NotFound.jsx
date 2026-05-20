import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';
import { GlassCard } from '../components/ui';

export default function NotFound() {
  const { lang, isRtl } = useOutletContext() || { lang: 'fa', isRtl: true };

  const t = {
    fa: { title: "مسیر مسدود است!", desc: "کامیون شما به بن‌بست رسیده است. صفحه‌ای که به دنبال آن هستید در سیستم رهگیری ما یافت نشد.", btnHome: "بازگشت به پایانه اصلی", btnBlog: "جستجو در دانشنامه" },
    en: { title: "Route Blocked!", desc: "Your truck has hit a dead end. The page you are looking for is not found in our tracking system.", btnHome: "Return to Main Terminal", btnBlog: "Search Insights" },
    ku: { title: "ڕێگاکە داخراوە!", desc: "بارهەڵگرەکەت گەیشتووەتە بنبەست. ئەو پەڕەیەی بۆی دەگەڕێیت لە سیستەمی ئێمەدا نەدۆزرایەوە.", btnHome: "گەڕانەوە بۆ تێرمیناڵی سەرەکی", btnBlog: "گەڕان لە زانستنامە" }
  }[lang] || { title: "404", desc: "Page not found.", btnHome: "Home", btnBlog: "Blog" };

  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-10">
      <div className="max-w-2xl w-full mx-auto relative z-10 text-center space-y-8 animate-in zoom-in duration-700">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#f37021]/20 blur-3xl rounded-full animate-pulse"></div>
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 drop-shadow-2xl">
            404
          </h1>
        </div>
        
        <GlassCard className="p-8 md:p-12 border-[#f37021]/30">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#f37021]/10 flex items-center justify-center text-[#f37021] mb-6">
            <Compass className="w-8 h-8 animate-[spin_4s_linear_infinite]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">{t.title}</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
            {t.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={`/${lang}`} className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#f37021] hover:bg-[#ff8033] text-white font-bold transition-all flex items-center justify-center gap-2">
              <Home className="w-5 h-5" /> {t.btnHome}
            </Link>
            <Link to={`/${lang}/blog`} className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all flex items-center justify-center gap-2">
              <Search className="w-5 h-5" /> {t.btnBlog}
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}