import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Truck, ShieldCheck, Ship, FileText, Zap } from 'lucide-react';
import { GlassCard } from '../components/ui';

export default function Services() {
  // دریافت اطلاعات زبان از روتر مرکزی
  const { t, lang } = useOutletContext();

  const serviceDetails = {
    fa: [
      {
        title: "ترانزیت جاده‌ای (FTL / LTL)",
        desc: "ارائه ناوگان مدرن مجهز به استانداردهای یورو ۵ و ۶. پوشش کامل حمل یکسره (Direct) و گروپاژ از تمامی نقاط ایران به ترکیه، اروپا و اقلیم کردستان. پایش لحظه‌ای محموله با ردیابی ماهواره‌ای GPS برای تضمین امنیت و زمان‌بندی دقیق.",
        tags: ["ناوگان چادری و یخچالی", "حمل درب‌-به-‌درب", "ردیابی آنلاین"]
      },
      {
        title: "تشریفات و ترخیص گمرکی",
        desc: "مدیریت تخصصی عملیات گمرکی در مرزهای استراتژیک. استقرار تیم‌های مقیم برای انجام سریع امور پلمپ، ارزیابی و ترخیص کالا. کاهش چشمگیر زمان توقف مرزی (Dwell Time) با تسلط بر قوانین جاری کشور مقصد.",
        tags: ["ترخیص تخصصی", "توقف حداقلی", "مشاوره اینکوترمز"]
      },
      {
        title: "لجستیک دریایی و کانتینری",
        desc: "اتصال هوشمند بنادر جنوبی ایران (بندرعباس و چابهار) به شبکه کشتیرانی جهانی. رزرو کانتینرهای ۲۰ و ۴۰ فوت، یخچالی و بارهای فله (Bulk) با رقابتی‌ترین نرخ‌های حمل دریایی در کریدورهای خلیج فارس و دریای عمان.",
        tags: ["لاین اختصاصی", "صادرات کانتینری", "ترانزیت مالتی‌مدال"]
      },
      {
        title: "صدور اسناد و بیمه بین‌المللی",
        desc: "صدور معتبرترین اسناد حمل بین‌المللی از جمله راهنامه‌های CMR و کارنه تیر (TIR Carnet) تحت استانداردهای فیاتا. پوشش کامل بیمه کالا برای مدیریت ریسک و تضمین سلامت سرمایه بازرگانان در طول مسیر.",
        tags: ["راهنامه CMR", "بیمه تمام‌خطر", "استاندارد FIATA"]
      }
    ],
    en: [
      {
        title: "Road Transit (FTL / LTL)",
        desc: "Modern fleet equipped with Euro 5 and 6 standards. Comprehensive coverage for direct and groupage shipments from all points in Iran to Turkey, Europe, and the Kurdistan Region. Real-time cargo monitoring with GPS tracking to ensure security and precise timing.",
        tags: ["Tent & Reefer Fleet", "Door-to-Door", "Live Tracking"]
      },
      {
        title: "Customs Clearance & Formalities",
        desc: "Expert management of customs operations at strategic borders. Deployment of resident teams for swift sealing, evaluation, and clearance. Significant reduction in border dwell time through deep knowledge of destination country regulations.",
        tags: ["Expert Clearance", "Min. Dwell Time", "Incoterms Advisory"]
      },
      {
        title: "Sea & Container Logistics",
        desc: "Smart connection of southern Iranian ports (Bandar Abbas and Chabahar) to the global shipping network. Booking of 20' and 40' containers, reefers, and bulk cargo with highly competitive ocean freight rates across the Persian Gulf and Sea of Oman corridors.",
        tags: ["Dedicated Lines", "Container Exports", "Multimodal Transit"]
      },
      {
        title: "Intl. Documents & Insurance",
        desc: "Issuance of the most recognized international shipping documents, including CMR waybills and TIR Carnets under FIATA standards. Comprehensive cargo insurance coverage to manage risk and guarantee the safety of merchants' capital during transit.",
        tags: ["CMR Waybill", "All-Risk Insurance", "FIATA Standards"]
      }
    ],
    ku: [
      {
        title: "ترانزێتی وشکانی (FTL / LTL)",
        desc: "دابینکردنی بارهەڵگری مۆدێرن بە ستانداردی یۆرۆ ٥ و ٦. خزمەتگوزاری باری تەواو و باری بچووک لە هەموو خاڵەکانی ئێرانەوە بۆ تورکیا، ئەوروپا و هەرێمی کوردستان. چاودێری ڕاستەوخۆی کاڵاکان بە سیستەمی GPS بۆ دڵنیابوون لە ئاسایش و کاتی گەیشتن.",
        tags: ["بارهەڵگری چادری و ساردکەرەوە", "دەرگا بۆ دەرگا", "بەدواداچوونی ڕاستەوخۆ"]
      },
      {
        title: "ڕێکارەکان و پاککردنەوەی گومرگی",
        desc: "بەڕێوەبردنی شارەزایانەی ئۆپەراسیۆنە گومرگییەکان لە سنوورە ستراتیژییەکان. جێگیرکردنی تیمی تایبەت بۆ خێراکردنی کارەکانی مۆرکردن، هەڵسەنگاندن و پاککردنەوە. کەمکردنەوەی بەرچاوی کاتی وەستان لە سنوور بەهۆی شارەزایی تەواو لە یاساکانی وڵاتی مەبەست.",
        tags: ["پاککردنەوەی خێرا", "کەمترین کاتی وەستان", "ڕاوێژی Incoterms"]
      },
      {
        title: "لۆجستیکی دەریایی و کۆنتەینەر",
        desc: "بەستنەوەی زیرەکی بەندەرەکانی باشووری ئێران (بەندەر عەبباس و چابەهار) بە تۆڕی کەشتیوانی جیهانی. دابینکردنی کۆنتەینەری ٢٠ و ٤٠ پێی، ساردکەرەوە و باری فەلە بە باشترین نرخی کێبڕکێ لە ڕێڕەوەکانی کەنداو و دەریای عومان.",
        tags: ["هێڵی تایبەت", "هەناردەی کۆنتەینەر", "ترانزێتی فرەشێواز"]
      },
      {
        title: "دەرکردنی بەڵگەنامە و بیمەی نێودەوڵەتی",
        desc: "دەرکردنی باوەڕپێکراوترین بەڵگەنامەکانی گواستنەوە، لەوانە CMR و کارنەی تیر (TIR Carnet) لەژێر ستانداردەکانی FIATA. دابینکردنی بیمەی تەواوی کاڵا بۆ کەمکردنەوەی مەترسی و پاراستنی سەرمایەی بازرگانان لە کاتی گواستنەوەدا.",
        tags: ["بەڵگەنامەی CMR", "بیمەی گشتگیر", "ستانداردی FIATA"]
      }
    ]
  };

  const currentData = serviceDetails[lang] || serviceDetails['fa'];

  return (
    <section aria-labelledby="services-heading" className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-4 md:pt-10">
      <header className="text-center max-w-4xl mx-auto space-y-4 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#f37021]/20 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f37021]/10 border border-[#f37021]/20 text-[#f37021] text-xs font-bold uppercase tracking-widest mb-2">
          <Zap className="w-3.5 h-3.5" /> {lang === 'en' ? 'Supply Chain Solutions' : 'زنجیره تامین یکپارچه'}
        </div>
        <h1 id="services-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          {t.services.title}
        </h1>
        <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
          {t.services.desc}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 auto-rows-fr">
        {/* Card 1 - Road Transit */}
        <GlassCard className="md:col-span-3 lg:col-span-8 p-8 md:p-10 flex flex-col justify-between group overflow-hidden border-[#f37021]/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f37021]/5 blur-3xl rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 flex items-start justify-between mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f37021] to-orange-600 flex items-center justify-center text-white shadow-lg"><Truck className="w-8 h-8" /></div>
            <span className="text-[#f37021] font-black text-5xl opacity-20">01</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{currentData[0].title}</h3>
            <p className="text-gray-300 text-sm md:text-base leading-[1.8] text-justify">{currentData[0].desc}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {currentData[0].tags.map(tag => <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] md:text-xs text-gray-400">{tag}</span>)}
            </div>
          </div>
        </GlassCard>

        {/* Card 2 - Customs */}
        <GlassCard className="md:col-span-2 lg:col-span-4 p-8 flex flex-col group border-blue-500/20">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6"><ShieldCheck className="w-7 h-7" /></div>
          <h3 className="text-xl font-bold text-white mb-3">{currentData[1].title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed text-justify mb-6">{currentData[1].desc}</p>
          <div className="mt-auto flex flex-wrap gap-2">
            {currentData[1].tags.map(tag => <span key={tag} className="px-2 py-1 rounded-md bg-blue-500/5 border border-blue-500/10 text-[10px] text-blue-400">{tag}</span>)}
          </div>
        </GlassCard>

        {/* Card 3 - Sea */}
        <GlassCard className="md:col-span-2 lg:col-span-7 p-8 flex flex-col group border-teal-500/20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0"><Ship className="w-8 h-8" /></div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{currentData[2].title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed text-justify">{currentData[2].desc}</p>
            </div>
          </div>
        </GlassCard>

        {/* Card 4 - Documents */}
        <GlassCard className="md:col-span-1 lg:col-span-5 p-8 flex flex-col group border-purple-500/20">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400"><FileText className="w-6 h-6" /></div>
             <h3 className="text-xl font-bold text-white">{currentData[3].title}</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed text-justify">{currentData[3].desc}</p>
        </GlassCard>
      </div>
    </section>
  );
}