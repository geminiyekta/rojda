import React from 'react';
import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';
import { postsData } from '../data/posts';
import SEO from '../components/SEO';

export default function SinglePost() {
  const { lang, slug } = useParams();
  const { t, isRtl } = useOutletContext();
  const currentLang = ['fa', 'en', 'ku'].includes(lang) ? lang : 'fa';

  // پیدا کردن مقاله بر اساس Slug موجود در آدرس بار
  const post = postsData.find((p) => p.slug === slug);

  // اگر مقاله‌ای با این شناسه وجود نداشت، کاربر به لیست مقالات هدایت شود
  if (!post) {
    return <Navigate to={`/${lang}/blog`} replace />;
  }

  // کد اسکیما مخصوص مقالات وبلاگ برای سئوی فوق حرفه‌ای
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title[currentLang],
    "image": `https://rojdagroup.com${post.image}`,
    "author": {
      "@type": "Organization",
      "name": t.brand
    },
    "publisher": {
      "@type": "Organization",
      "name": t.brand,
      "logo": {
        "@type": "ImageObject",
        "url": "https://rojdagroup.com/logo.png"
      }
    },
    "datePublished": "2026-05-01", 
    "description": post.excerpt[currentLang]
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title[currentLang], text: post.excerpt[currentLang], url: window.location.href }).catch(() => {});
    } else {
      alert(currentLang === 'fa' ? "لینک کپی شد!" : "Link copied!");
    }
  };

  const uiText = {
    fa: { back: "بازگشت به لیست مقالات", time: "زمان مطالعه", share: "اشتراک‌گذاری" },
    en: { back: "Back to Insights", time: "Read Time", share: "Share" },
    ku: { back: "گەڕانەوە بۆ بابەتەکان", time: "کاتی خوێندنەوە", share: "بڵاوکردنەوە" }
  }[currentLang];

  return (
    <>
      <SEO 
        title={`${post.title[currentLang]} | ${t.brand}`}
        description={post.excerpt[currentLang]}
        image={post.image}
        lang={currentLang}
        schemaMarkup={articleSchema}
      />
      
      <article className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-4 md:pt-10">
        
        {/* دکمه بازگشت با رعایت جهت زبان */}
        <Link to={`/${lang}/blog`} className="inline-flex items-center gap-2 text-gray-400 hover:text-[#f37021] transition-colors mb-4 group font-bold">
           <ArrowLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''} group-hover:-translate-x-1 transition-transform`} /> {uiText.back}
        </Link>

        {/* هدر مقاله (عنوان و متاداتا) */}
        <header className="space-y-6">
          <div className="flex items-center gap-3 text-[#f37021] font-bold text-sm uppercase tracking-widest">
              <Tag className="w-4 h-4" /> {post.category[currentLang]}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">{post.title[currentLang]}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-white/5 py-4">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {uiText.time}: {post.readTime[currentLang]}</span>
            <button onClick={handleShare} className="flex items-center gap-2 hover:text-white transition-colors rtl:mr-auto ltr:ml-auto">
              <Share2 className="w-4 h-4" /> {uiText.share}
            </button>
          </div>
        </header>

        {/* تصویر اصلی مقاله بهینه شده برای لود تنبل */}
        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src={post.image} 
            alt={post.title[currentLang]} 
            loading="lazy" 
            decoding="async" 
            className="w-full h-[300px] md:h-[500px] object-cover" 
          />
        </div>

        {/* متن اصلی مقاله */}
        <div className="text-gray-300 text-lg leading-[2.2] text-justify space-y-8 font-light">
           <p className="whitespace-pre-line">{post.fullContent[currentLang]}</p>
        </div>
      </article>
    </>
  );
}