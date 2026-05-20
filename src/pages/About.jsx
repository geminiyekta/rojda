import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Globe, ShieldCheck, Users, Target, TrendingUp, Award } from 'lucide-react';
import { GlassCard } from '../components/ui';

export default function About() {
  const { lang } = useOutletContext();

  const aboutData = {
    fa: {
      badge: 'داستان روژدا',
      title: 'معماری نوین در زنجیره تامین جهانی',
      subtitle: 'ما صرفاً یک شرکت حمل‌ونقل نیستیم؛ ما استراتژیست‌های لجستیک شما هستیم. از سال ۲۰۱۴، روژدا لجستیک با ترکیب هوش عملیاتی و ناوگان قدرتمند، مرزهای تجارت را برای صدها تولیدکننده و بازرگان هموار کرده است.',
      mission: {
        title: 'ماموریت ما (Mission)',
        desc: 'کاهش اصطکاک در تجارت بین‌الملل. ما با حذف واسطه‌ها و استقرار مستقیم در نقاط صفر مرزی، محموله شما را با کمترین ریسک و بالاترین سرعت از قلب اروپا تا آسیای میانه جابجا می‌کنیم.'
      },
      stats: [
        { value: '۱۲+', label: 'سال تجربه بین‌المللی' },
        { value: '۴۵+', label: 'نمایندگی در خاورمیانه و CIS' },
        { value: '۱۰۰٪', label: 'تضمین امنیت با کارنه TIR' }
      ],
      features: [
        { icon: <Globe />, title: 'شبکه جهانی بدون مرز', desc: 'اتصال کریدورهای استراتژیک شمال-جنوب و شرق-غرب با تسلط کامل بر قوانین ژئوپلیتیک.' },
        { icon: <ShieldCheck />, title: 'امنیت و انطباق (Compliance)', desc: 'پایبندی ۱۰۰ درصدی به قوانین اینکوترمز ۲۰۲۰ و استانداردهای فدراسیون فیاتا (FIATA).' },
        { icon: <Users />, title: 'تیم متخصص و بومی', desc: 'حضور ترخیص‌کاران و فورواردرهای مسلط به زبان‌های محلی (ترکی، کوردی، روسی) در مرزها.' },
        { icon: <TrendingUp />, title: 'توسعه پایدار', desc: 'نوسازی مداوم ناوگان برای کاهش آلایندگی و حرکت به سمت لجستیک سبز (Green Logistics).' }
      ]
    },
    en: {
      badge: 'The Rojda Story',
      title: 'Redefining Global Supply Chain Architecture',
      subtitle: 'We are not just a transport company; we are your logistics strategists. Since 2014, Rojda Logistic has combined operational intelligence with a powerful fleet to pave the way for global trade.',
      mission: {
        title: 'Our Mission',
        desc: 'Reducing friction in international trade. By eliminating middlemen and operating directly at border zero points, we move your cargo from the heart of Europe to Central Asia with minimal risk and maximum speed.'
      },
      stats: [
        { value: '12+', label: 'Years Global Experience' },
        { value: '45+', label: 'Agents across MENA & CIS' },
        { value: '100%', label: 'TIR Carnet Security Guarantee' }
      ],
      features: [
        { icon: <Globe />, title: 'Borderless Global Network', desc: 'Connecting North-South and East-West strategic corridors with full geopolitical compliance.' },
        { icon: <ShieldCheck />, title: 'Security & Compliance', desc: '100% adherence to Incoterms 2020 and FIATA Federation international standards.' },
        { icon: <Users />, title: 'Expert Localized Teams', desc: 'Presence of native-speaking customs brokers (Turkish, Kurdish, Russian) at key borders.' },
        { icon: <TrendingUp />, title: 'Sustainable Growth', desc: 'Continuous fleet modernization to reduce carbon footprint and drive Green Logistics.' }
      ]
    },
    ku: {
      badge: 'چیرۆکی ڕۆژدا',
      title: 'ئەندازیاری نوێ لە زنجیرەی دابینکردنی جیهانی',
      subtitle: 'ئێمە تەنها کۆمپانیایەکی گواستنەوە نین؛ ئێمە ستراتیژیستی لۆجستیکی ئێوەین. لە ساڵی ٢٠١٤ەوە، ڕۆژدا لۆجستیک بە تێکەڵکردنی زیرەکی ئۆپەراسیۆنی و بارهەڵگری بەهێز، سنوورەکانی بازرگانی ئاسان کردووە.',
      mission: {
        title: 'ئەرکی ئێمە (Mission)',
        desc: 'کەمکردنەوەی ئاستەنگەکانی بازرگانی نێودەوڵەتی. بە لابردنی نێوەندگیرەکان و بوونی ڕاستەوخۆمان لە خاڵی سفری سنووری، کاڵاکەت بە کەمترین مەترسی دەگوازینەوە.'
      },
      stats: [
        { value: '١٢+', label: 'ساڵ ئەزموونی نێودەوڵەتی' },
        { value: '٤٥+', label: 'نوێنەرایەتی لە ڕۆژهەڵاتی ناوەڕاست و CIS' },
        { value: '١٠٠٪', label: 'گەرەنتی ئاسایش بە کارنەی TIR' }
      ],
      features: [
        { icon: <Globe />, title: 'تۆڕی جیهانی بێ سنوور', desc: 'بەستنەوەی ڕێڕەوە ستراتیژییەکانی باکوور-باشوور و ڕۆژهەڵات-ڕۆژئاوا.' },
        { icon: <ShieldCheck />, title: 'ئاسایش و متمانە', desc: 'پابەندبوونی تەواو بە یاساکانی Incoterms 2020 و ستانداردەکانی فیدراسیۆنی FIATA.' },
        { icon: <Users />, title: 'تیمی شارەزا و ناوخۆیی', desc: 'بوونی بریکارانی گومرگی شارەزا بە زمانە ناوخۆییەکان (تورکی، کوردی، ڕووسی) لە سنوورەکان.' },
        { icon: <TrendingUp />, title: 'گەشەپێدانی بەردەوام', desc: 'نوێکردنەوەی بەردەوامی بارهەڵگرەکان بۆ کەمکردنەوەی پیسبوون و بەرەو لۆجستیکی سەوز.' }
      ]
    }
  };

  const current = aboutData[lang] || aboutData['fa'];

  return (
    <section aria-labelledby="about-heading" className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-4 md:pt-10">
      <div className="relative rounded-[2.5rem] bg-[#0a0c14]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f37021]/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-[#f37021]" /> {current.badge}
            </div>
            <h1 id="about-heading" className="text-3xl md:text-5xl font-black text-white leading-tight">
              {current.title}
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed text-justify">
              {current.subtitle}
            </p>
            
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {current.stats.map((stat, idx) => (
                <div key={idx} className="border-l border-white/10 rtl:border-l-0 rtl:border-r pl-6 rtl:pl-0 rtl:pr-6 border-[#f37021]/50">
                  <div className="text-3xl font-black text-white tabular-nums" dir="ltr">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <GlassCard className="p-8 border-[#f37021]/30 bg-gradient-to-br from-white/5 to-[#f37021]/5">
              <div className="w-14 h-14 rounded-2xl bg-[#f37021]/20 flex items-center justify-center text-[#f37021] mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{current.mission.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed text-justify">
                {current.mission.desc}
              </p>
            </GlassCard>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        {current.features.map((feat, idx) => (
          <GlassCard key={idx} className="p-8 flex flex-col sm:flex-row gap-6 items-start group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#f37021] group-hover:text-white group-hover:border-[#f37021] transition-all duration-500 shrink-0 shadow-lg">
              {React.cloneElement(feat.icon, { className: 'w-8 h-8' })}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed text-justify">
                {feat.desc}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="border-t border-white/5 pt-12 flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-500">
         <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mb-6">{lang === 'en' ? 'Operating strictly under international conventions' : lang === 'ku' ? 'کارکردن لەژێر ڕێککەوتننامە نێودەوڵەتییەکان' : 'فعالیت مستمر تحت عالی‌ترین کنوانسیون‌های بین‌المللی'}</p>
         <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <span className="text-xl md:text-2xl font-black tracking-widest text-gray-400">FIATA</span>
            <span className="text-xl md:text-2xl font-black tracking-widest text-gray-400">IRU</span>
            <span className="text-xl md:text-2xl font-black tracking-widest text-gray-400">CMR</span>
            <span className="text-xl md:text-2xl font-black tracking-widest text-gray-400">TIR CARNET</span>
            <span className="text-xl md:text-2xl font-black tracking-widest text-gray-400">ISO 9001</span>
         </div>
      </div>
    </section>
  );
}