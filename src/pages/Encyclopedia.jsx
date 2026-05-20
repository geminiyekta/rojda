import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, BookOpen, Share2, ChevronRight, ChevronLeft } from 'lucide-react';
import { GlassCard } from '../components/ui';
import { postsData } from '../data/posts'; // ایمپورت دیتابیس

export default function Encyclopedia() {
  const { lang, isRtl } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; 

  const currentLang = ['fa', 'en', 'ku'].includes(lang) ? lang : 'fa';

  const safeSearch = (searchTerm || '').toLowerCase();
  const filteredPosts = postsData.filter(p => {
    const title = p.title?.[currentLang] || '';
    return title.toLowerCase().includes(safeSearch);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearch = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const paginate = (pageNumber) => { setCurrentPage(pageNumber); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleShare = (e, post) => {
    e.preventDefault(); // جلوگیری از رفتن به لینک هنگام کلیک روی دکمه اشتراک‌گذاری
    if (navigator.share) navigator.share({ title: post.title[currentLang], text: post.excerpt[currentLang], url: `${window.location.origin}/${lang}/blog/${post.slug}` }).catch(() => {});
    else alert(currentLang === 'fa' ? "لینک کپی شد!" : "Link copied!");
  };

  const t = {
    fa: { title: "دانشنامه لجستیک روژدا", search: "جستجو در مقالات...", read: "مطالعه مطلب", latest: "بروزرسانی‌های علمی", share: "اشتراک‌گذاری", prev: "قبلی", next: "بعدی" },
    en: { title: "Rojda Logistics Wiki", search: "Search insights...", read: "Read More", latest: "Scientific Updates", share: "Share", prev: "Prev", next: "Next" },
    ku: { title: "زانستنامەی ڕۆژدا", search: "گەڕان لە بابەتەکان...", read: "خوێندنەوە", latest: "تازەترین بابەتەکان", share: "بڵاوکردنەوە", prev: "پێشوو", next: "داهاتوو" }
  }[currentLang];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pt-4 md:pt-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest"><BookOpen className="w-3 h-3" /> {t.latest}</div>
          <h1 className="text-4xl md:text-5xl font-black text-white">{t.title}</h1>
        </div>
        <div className="relative w-full md:w-96">
          <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5`} />
          <input type="text" placeholder={t.search} className={`w-full bg-white/5 border border-white/10 rounded-2xl ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 text-white outline-none focus:border-[#f37021]/50 transition-all`} onChange={handleSearch} value={searchTerm} />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <article key={post.id} className="group">
            {/* کل کارت را به یک لینک تبدیل کردیم */}
            <Link to={`/${lang}/blog/${post.slug}`} className="block h-full">
              <GlassCard className="h-full flex flex-col p-0 overflow-hidden border-white/10 hover:border-[#f37021]/40 transition-all" hover={true}>
                <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title[currentLang]} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                /> 
                 <div className="absolute top-4 start-4">
                    <span className="px-3 py-1 rounded-lg bg-[#05060A]/80 backdrop-blur-md border border-white/10 text-[#f37021] text-[10px] font-bold">
                      {post.category[currentLang]}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h2 className="text-xl font-black text-white mb-4 leading-snug group-hover:text-[#f37021] transition-colors">{post.title[currentLang]}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8 font-light">{post.excerpt[currentLang]}</p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#f37021] font-bold text-sm group/btn">
                      {t.read} <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                    </span>
                    <button onClick={(e) => handleShare(e, post)} title={t.share} className="p-2 hover:bg-white/5 rounded-full transition-colors z-10">
                      <Share2 className="w-4 h-4 text-gray-600 hover:text-white" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-12 pb-20">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`flex items-center gap-1 px-4 py-2 rounded-xl font-bold text-sm transition-all ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10'}`}>
            <ChevronRight className={`w-4 h-4 ${!isRtl ? 'rotate-180' : ''}`} /> {t.prev}
          </button>
          
          <div className="flex items-center gap-2 px-4">
            {[...Array(totalPages)].map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${currentPage === index + 1 ? 'bg-[#f37021] text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                {index + 1}
              </button>
            ))}
          </div>

          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`flex items-center gap-1 px-4 py-2 rounded-xl font-bold text-sm transition-all ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10'}`}>
            {t.next} <ChevronLeft className={`w-4 h-4 ${!isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}