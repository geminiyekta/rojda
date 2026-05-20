import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MapPin, Phone, Mail, Navigation, Map, Send, Truck, Ship, Train, Package } from 'lucide-react';
import { GlassCard } from '../components/ui';

export default function Contact() {
  const { lang, isRtl } = useOutletContext();
  const [transportMode, setTransportMode] = useState('road');

  const t = {
    fa: {
      badge: "مرکز فرماندهی ارتباطات", title: "استعلام کرایه و تماس با ما", subtitle: "درخواست خود را ثبت کنید یا مستقیماً با کارشناسان ترانزیت ما در ارتباط باشید.",
      formTitle: "فرم استعلام آنلاین (Quote Request)", origin: "مبدأ بارگیری (شهر/کشور)", destination: "مقصد تخلیه (شهر/کشور)", cargoType: "نوع کالا (عمومی، خطرناک، یخچالی)", weight: "وزن / حجم محموله", phoneInput: "شماره تماس (واتس‌اپ)", submit: "ارسال درخواست استعلام", modes: { road: "جاده‌ای", sea: "دریایی", rail: "ریلی" },
      addressTitle: "دفتر مرکزی", address: "ایران - استان کردستان - شهرستان مریوان - خیابان شهید چراغی - کوچه مصباح - پلاک ۵", phoneTitle: "خطوط مستقیم", phone1: "+98 (900) 700 8001-4", emailTitle: "ایمیل سازمانی", email: "info@rojdagroup.com", routeTitle: "مسیریابی هوشمند", gmaps: "گوگل مپ", waze: "ویز (Waze)"
    },
    en: {
      badge: "Communications Command Center", title: "Get a Quote & Contact Us", subtitle: "Submit your inquiry or connect directly with our transit experts.",
      formTitle: "Online Freight Quote", origin: "Port/City of Loading", destination: "Port/City of Discharge", cargoType: "Cargo Type (General, DG, Reefer)", weight: "Weight / Volume", phoneInput: "Contact Number (WhatsApp)", submit: "Submit Quote Request", modes: { road: "Road", sea: "Sea", rail: "Rail" },
      addressTitle: "Headquarters", address: "No5, Mesbah Alley , Shahid Cherakhi st , Marivan City , Kurdistan State , Iran", phoneTitle: "Direct Lines", phone1: "+98(900) 700 8001 - 4", emailTitle: "Corporate Email", email: "info@rojdagroup.com", routeTitle: "Smart Routing", gmaps: "Google Maps", waze: "Waze"
    },
    ku: {
      badge: "سەنتەری پەیوەندییەکان", title: "داواکردنی کرێ و پەیوەندی", subtitle: "داواکارییەکەت تۆمار بکە یان ڕاستەوخۆ پەیوەندی بە شارەزایانمانەوە بکە.",
      formTitle: "فۆڕمی ئۆنلاینی کرێ (Quote)", origin: "سەرچاوەی بارکردن (شار/وڵات)", destination: "مەبەستی بەتاڵکردن (شار/وڵات)", cargoType: "جۆری کاڵا (گشتی، مەترسیدار، ساردکەرەوە)", weight: "کێش / قەبارە", phoneInput: "ژمارەی پەیوەندی (واتسئەپ)", submit: "ناردنی داواکاری", modes: { road: "وشکانی", sea: "دەریایی", rail: "ڕێڵی" },
      addressTitle: "نووسینگەی سەرەکی", address: "ئێران - پارێزگای کوردستان - شاری مەریوان - شەقامی شەهید چراغی - کوچەی مێسباح - ژمارە 5", phoneTitle: "هێڵە ڕاستەوخۆکان", phone1: "+98(900) 700 8001 - 4", emailTitle: "ئیمەیڵی فەرمی", email: "info@rojdagroup.com", routeTitle: "ڕێنوێنی زیرەک", gmaps: "گوگڵ ماپ", waze: "وەیز (Waze)"
    }
  }[lang] || { /* default fallback */ };

  const lat = "35.5492983";
  const lng = "45.4265431";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const origin = formData.get('origin');
    const destination = formData.get('destination');
    const cargoType = formData.get('cargoType');
    const weight = formData.get('weight');
    const phone = formData.get('phone');
    // ۲. ساخت متن پیام برای واتس‌اپ بر اساس زبان
  let message = "";
  if (lang === 'fa') {
    message = `*درخواست استعلام جدید* 📦\n\n*نوع حمل:* ${t.modes[transportMode]}\n*مبدأ:* ${origin}\n*مقصد:* ${destination}\n*نوع کالا:* ${cargoType}\n*وزن/حجم:* ${weight}\n*شماره تماس مشتری:* ${phone}\n\nلطفا در اسرع وقت بررسی شود.`;
  } else if (lang === 'en') {
    message = `*New Freight Quote Request* 📦\n\n*Mode:* ${t.modes[transportMode]}\n*Origin:* ${origin}\n*Destination:* ${destination}\n*Cargo:* ${cargoType}\n*Weight/Volume:* ${weight}\n*Customer Phone:* ${phone}`;
  } else {
    message = `*داواکاری نوێی کرێ* 📦\n\n*شێواز:* ${t.modes[transportMode]}\n*سەرچاوە:* ${origin}\n*مەبەست:* ${destination}\n*جۆری کاڵا:* ${cargoType}\n*کێش:* ${weight}\n*مۆبایل:* ${phone}`;
  }

  // ۳. شماره واتس‌اپ شرکت روژدا (بدون صفر یا +، با کد کشور)
  // مثال: 989007008003
  const companyWhatsappNumber = "989007008003"; 

  // ۴. هدایت هوشمند کاربر به واتس‌اپ (وب یا اپلیکیشن موبایل)
  const whatsappUrl = `https://wa.me/${companyWhatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
    alert(lang === 'fa' ? 'درخواست شما با موفقیت ارسال شد. کارشناسان ما به زودی تماس می‌گیرند.' : 'Request submitted successfully. Our team will contact you soon.');
  };

  return (
    <section className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-4 md:pt-10 mb-20">
      <header className="text-center max-w-3xl mx-auto space-y-4 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#f37021]/20 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-2">
          <Phone className="w-3.5 h-3.5 text-[#f37021]" /> {t.badge}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{t.title}</h1>
        <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">{t.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <GlassCard className="p-6 md:p-10 border-[#f37021]/20 h-full relative overflow-hidden group">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#f37021]/10 blur-[80px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-[#f37021]/20"></div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f37021]"><Package className="w-6 h-6" /></div>
               <h3 className="text-2xl font-black text-white">{t.formTitle}</h3>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                {[
                  { id: 'road', icon: Truck, label: t.modes.road },
                  { id: 'sea', icon: Ship, label: t.modes.sea },
                  { id: 'rail', icon: Train, label: t.modes.rail }
                ].map((mode) => (
                  <button key={mode.id} type="button" onClick={() => setTransportMode(mode.id)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${transportMode === mode.id ? 'bg-[#f37021] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    <mode.icon className="w-4 h-4" /> <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-bold text-gray-400 ms-1 uppercase">{t.origin}</label><input name="origin" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#f37021]/50 focus:bg-white/10 transition-all placeholder:text-gray-600" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-gray-400 ms-1 uppercase">{t.destination}</label><input name="destination" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#f37021]/50 focus:bg-white/10 transition-all placeholder:text-gray-600" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-bold text-gray-400 ms-1 uppercase">{t.cargoType}</label><input name="cargoType" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#f37021]/50 focus:bg-white/10 transition-all placeholder:text-gray-600" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-gray-400 ms-1 uppercase">{t.weight}</label><input name="weight" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#f37021]/50 focus:bg-white/10 transition-all placeholder:text-gray-600" /></div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-400 ms-1 uppercase">{t.phoneInput}</label>
                 <input name="phoneInput" type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#f37021]/50 focus:bg-white/10 transition-all font-mono placeholder:text-gray-600 placeholder:font-sans" dir="ltr" placeholder="+964..." />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#f37021] to-orange-600 hover:from-orange-500 hover:to-[#f37021] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#f37021]/20 transition-all duration-300 transform hover:-translate-y-1 group">
                {t.submit} <Send className={`w-5 h-5 ${!isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
              </button>
            </form>
          </GlassCard>
        </div>

        <div className="lg:col-span-5 space-y-6 flex flex-col">
          <GlassCard className="p-8 border-white/10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#f37021]/10 flex items-center justify-center text-[#f37021] shrink-0 border border-[#f37021]/20"><MapPin className="w-5 h-5" /></div>
              <div><h4 className="text-white font-bold mb-1">{t.addressTitle}</h4><p className="text-gray-400 text-sm leading-relaxed">{t.address}</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20"><Phone className="w-5 h-5" /></div>
              <div><h4 className="text-white font-bold mb-1">{t.phoneTitle}</h4><p className="text-gray-400 text-sm font-mono" dir="ltr">{t.phone1}</p><p className="text-gray-400 text-sm font-mono mt-0.5" dir="ltr">{t.phone2}</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20"><Mail className="w-5 h-5" /></div>
              <div><h4 className="text-white font-bold mb-1">{t.emailTitle}</h4><p className="text-gray-400 text-sm font-mono">{t.email}</p></div>
            </div>
          </GlassCard>

          <div className="relative flex-grow min-h-[250px] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md group">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12984.71752763297!2d45.4265431!3d35.5492983!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40002ddb03d3ea67%3A0xe5eb6c433c2a3e0b!2sRojda%20Group!5e0!3m2!1sen!2suk!4v1715139045763!5m2!1sen!2suk" className="absolute inset-0 w-full h-full filter contrast-125 opacity-80 group-hover:opacity-100 transition-all duration-700 grayscale-[20%]" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
               <a href={`https://maps.google.com/`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#05060A]/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold hover:bg-[#f37021] hover:border-[#f37021] transition-all">
                  <Map className="w-3.5 h-3.5" /> {t.gmaps}
               </a>
               <a href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#05060A]/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold hover:bg-blue-500 hover:border-blue-500 transition-all">
                  <Navigation className="w-3.5 h-3.5" /> {t.waze}
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}