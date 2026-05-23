import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navigation, RefreshCcw, MapPin, Anchor, Globe, Truck, Ship, ShieldCheck } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🌐 دیکشنری جامع چندزبانه
const dict = {
  fa: { panelTitle: 'مسیریاب ترانزیت', showMinor: 'نمایش مرزها و بازارچه‌های فرعی', origin: 'مبدأ بارگیری (بندر / گمرک)', dest: 'مقصد نهایی...', analyzing: 'در حال محاسبه مسیر جاده‌ای...', corridor: 'کریدور تجاری', procedure: 'رویه گمرکی', distLabel: 'مسافت زمینی (دقیق)', seaRoute: 'مسیر دریایی', directSea: 'حمل مستقیم کانتینری / فله', groups: { ports: '⚓ بنادر ایران', customs: '🛡️ گمرکات مرزی', neighbors: '🌐 گمرکات همسایه', tr_eu: '🇹🇷 ترکیه و اروپا', iq: '🇮🇶 عراق (اقلیم و جنوب)', cis: '🇷🇺 روسیه و کشورهای CIS', sea: '🚢 بنادر خلیج فارس', east: '🇦🇫 شرق (افغانستان و پاکستان)' }, mapLegend: { ports: 'بنادر مبدأ', customs: 'گمرکات خروجی', dest: 'مقاصد جهانی' } },
  en: { panelTitle: 'Transit Route Planner', showMinor: 'Include Minor Border Posts', origin: 'Select Origin (Port / Customs)', dest: 'Final Destination...', analyzing: 'Tracing accurate road paths...', corridor: 'Trade Corridor', procedure: 'Customs Procedure', distLabel: 'Exact Road Distance', seaRoute: 'Sea Route', directSea: 'Direct Vessel / Containerized', groups: { ports: '⚓ Iran Ports', customs: '🛡️ Border Customs', neighbors: '🌐 Regional Borders', tr_eu: '🇹🇷 Turkey & Europe', iq: '🇮🇶 Iraq (KRI & South)', cis: '🇷🇺 Russia & CIS', sea: '🚢 Persian Gulf Ports', east: '🇦🇫 East (Afghanistan & PK)' }, mapLegend: { ports: 'Origin Ports', customs: 'Exit Borders', dest: 'Global Hubs' } },
  ku: { panelTitle: 'نەخشەڕێگای ترانزێت', showMinor: 'پیشاندانی دەروازە لاوەکییەکان', origin: 'خاڵی دەستپێک (بەندەر / گومرگ)', dest: 'شوێنی گەیشتن...', analyzing: 'کێشانی ڕێگای دروستی وشکانی...', corridor: 'ڕێڕەوی بازرگانی', procedure: 'ڕێکارەکانی گومرگ', distLabel: 'مەودای وشکانی (دروست)', seaRoute: 'ڕێگای دەریایی', directSea: 'گواستنەوەی ڕاستەوخۆی دەریایی', groups: { ports: '⚓ بەندەرەکانی ئێران', customs: '🛡️ گومرگەکانی سنوور', neighbors: '🌐 گومرگەکانی دراوسێ', tr_eu: '🇹🇷 تورکیا و ئەوروپا', iq: '🇮🇶 عێراق (هەرێم و باشوور)', cis: '🇷🇺 ڕووسیا و وڵاتانی CIS', sea: '🚢 بەندەرەکانی کەنداو', east: '🇦🇫 ئەفغانستان و پاکستان' }, mapLegend: { ports: 'بەندەرەکان', customs: 'دەروازەکان', dest: 'مەبەستەکان' } }
};

// 🗄️ دیتابیس عظیم گمرکات و بازارچه‌های مرزی ایران
const LOCATIONS = {
  ports: [
    { id: 'bnd_abbas', type: 'main', target: 'SEA', name: { fa: 'بندر عباس (شهید رجایی)', en: 'Bandar Abbas', ku: 'بەندەر عەبباس' }, coords: [27.1832, 56.2666] },
    { id: 'bnd_imam', type: 'main', target: 'SEA', name: { fa: 'بندر امام خمینی', en: 'Bnd Imam', ku: 'ئیمام خومەینی' }, coords: [30.4256, 49.0347] },
    { id: 'chabahar', type: 'main', target: 'SEA', name: { fa: 'بندر چابهار', en: 'Chabahar Port', ku: 'چابەهار' }, coords: [25.2961, 60.6406] },
    { id: 'anzali', type: 'minor', target: 'CASPIAN', name: { fa: 'بندر انزلی', en: 'Anzali Port', ku: 'ئەنزەلی' }, coords: [37.4741, 49.4616] },
  ],
  customs: [
    // 🇹🇷 مرزهای ترکیه و اروپا
    { id: 'bazargan', type: 'main', target: 'TR_EU', name: { fa: 'گمرک بازرگان', en: 'Bazargan', ku: 'بازرگان' }, coords: [39.3833, 44.3833] },
    { id: 'sero', type: 'minor', target: 'TR_EU', name: { fa: 'گمرک سرو', en: 'Sero', ku: 'سێرۆ' }, coords: [37.7160, 44.6220] },
    { id: 'razi', type: 'minor', target: 'TR_EU', name: { fa: 'گمرک رازی', en: 'Razi', ku: 'ڕازی' }, coords: [38.5000, 44.0200] },
    // 🇮🇶 مرزهای عراق و اقلیم
    { id: 'bashmaq', type: 'main', target: 'IQ_K', name: { fa: 'گمرک باشماق', en: 'Bashmaq', ku: 'باشماخ' }, coords: [35.5975, 46.0664] },
    { id: 'parvizkhan', type: 'main', target: 'IQ_K', name: { fa: 'گمرک پرویزخان', en: 'Parvizkhan', ku: 'پەروێزخان' }, coords: [34.5422, 45.4522] },
    { id: 'tamarchin', type: 'minor', target: 'IQ_K', name: { fa: 'گمرک تمرچین', en: 'Tamarchin', ku: 'تەمەرچین' }, coords: [36.6788, 45.1407] },
    { id: 'shoshmi', type: 'minor', target: 'IQ_K', name: { fa: 'بازارچه شوشمی', en: 'Shoshmi', ku: 'شووشمێ' }, coords: [35.1558, 46.1601] },
    { id: 'sheikh_saleh', type: 'minor', target: 'IQ_K', name: { fa: 'بازارچه شیخ صله', en: 'Sheikh Saleh', ku: 'شێخ سەڵە' }, coords: [34.7865, 45.8904] },
    { id: 'melleh_khord', type: 'minor', target: 'IQ_K', name: { fa: 'بازارچه مله خورد', en: 'Melleh Khord', ku: 'ملە خۆرد' }, coords: [35.2500, 46.2000] },
    { id: 'mehran', type: 'main', target: 'IQ_S', name: { fa: 'گمرک مهران', en: 'Mehran', ku: 'مێهران' }, coords: [33.1189, 46.1664] },
    { id: 'shalamcheh', type: 'minor', target: 'IQ_S', name: { fa: 'گمرک شلمچه', en: 'Shalamcheh', ku: 'شەلەمچە' }, coords: [30.4900, 48.0531] },
    { id: 'khosravi', type: 'minor', target: 'IQ_S', name: { fa: 'گمرک خسروی', en: 'Khosravi', ku: 'خوسرەوی' }, coords: [34.3900, 45.4500] },
    { id: 'chazabeh', type: 'minor', target: 'IQ_S', name: { fa: 'گمرک چذابه', en: 'Chazabeh', ku: 'چەزابە' }, coords: [31.8100, 47.7800] },
    // 🇦🇫 مرزهای شرق (افغانستان و پاکستان)
    { id: 'dogharoon', type: 'main', target: 'AF', name: { fa: 'گمرک دوغارون', en: 'Dogharoon', ku: 'دۆغاروون' }, coords: [34.8080, 60.9850] },
    { id: 'mahirud', type: 'minor', target: 'AF', name: { fa: 'گمرک ماهیرود', en: 'Mahirud', ku: 'ماهیرود' }, coords: [32.6500, 60.5000] },
    { id: 'milak', type: 'minor', target: 'AF', name: { fa: 'گمرک میلک', en: 'Milak', ku: 'میله‌ک' }, coords: [31.0000, 61.8000] },
    { id: 'mirjaveh', type: 'main', target: 'PK', name: { fa: 'گمرک میرجاوه', en: 'Mirjaveh', ku: 'میرجاوە' }, coords: [29.0142, 61.4553] },
    // 🇷🇺 مرزهای CIS و قفقاز
    { id: 'astara', type: 'main', target: 'CIS', name: { fa: 'گمرک آستارا', en: 'Astara', ku: 'ئاستارا' }, coords: [38.4333, 48.8667] },
    { id: 'bileh_savar', type: 'minor', target: 'CIS', name: { fa: 'گمرک بیله‌سوار', en: 'Bileh Savar', ku: 'بیلەسوار' }, coords: [39.3800, 48.3500] },
    { id: 'jolfa', type: 'main', target: 'CIS', name: { fa: 'گمرک جلفا', en: 'Jolfa', ku: 'جولفا' }, coords: [38.9300, 45.6200] },
    { id: 'norduz', type: 'minor', target: 'CIS', name: { fa: 'گمرک نوردوز (ارمنستان)', en: 'Norduz', ku: 'نۆردوز' }, coords: [38.8400, 46.2000] },
    { id: 'sarakhs', type: 'main', target: 'CIS', name: { fa: 'گمرک سرخس', en: 'Sarakhs', ku: 'سەرەخس' }, coords: [36.5449, 61.1577] },
    { id: 'lotfabad', type: 'minor', target: 'CIS', name: { fa: 'گمرک لطف‌آباد', en: 'Lotfabad', ku: 'لوتف ئاباد' }, coords: [37.8200, 59.3500] },
    { id: 'bajgiran', type: 'minor', target: 'CIS', name: { fa: 'گمرک باجگیران', en: 'Bajgiran', ku: 'باجگیران' }, coords: [37.6200, 58.4100] },
    { id: 'incheh_borun', type: 'minor', target: 'CIS', name: { fa: 'گمرک اینچه‌برون', en: 'Incheh Borun', ku: 'ئینچە برون' }, coords: [37.2000, 54.6200] },
  ],
  intl_customs: [
    { id: 'ibrahim_khalil', name: { fa: 'ابراهیم خلیل (عراق)', en: 'Ibrahim Khalil (IQ)', ku: 'ئیبراهیم خەلیل' }, coords: [37.1422, 42.5701] },
    { id: 'islam_qala', name: { fa: 'اسلام‌قلعه (افغانستان)', en: 'Islam Qala (AF)', ku: 'ئیسلام قەڵا' }, coords: [34.6644, 61.0747] },
  ],
  destinations: [
    { id: 'istanbul', region: 'TR_EU', name: { fa: 'استانبول (ترکیه)', en: 'Istanbul', ku: 'ئیستەنبوڵ' }, coords: [41.0082, 28.9784] },
    { id: 'hamburg', region: 'TR_EU', name: { fa: 'هامبورگ (آلمان)', en: 'Hamburg', ku: 'هامبۆرگ' }, coords: [53.5511, 9.9937] },
    { id: 'erbil', region: 'IQ_K', name: { fa: 'اربیل (عراق)', en: 'Erbil', ku: 'هەولێر' }, coords: [36.1901, 44.0090] },
    { id: 'sulaymaniyah', region: 'IQ_K', name: { fa: 'سلیمانیه (عراق)', en: 'Sulaymaniyah', ku: 'سلێمانی' }, coords: [35.5558, 45.4351] },
    { id: 'duhok', region: 'IQ_K', name: { fa: 'دهوک (عراق)', en: 'Duhok', ku: 'دهۆک' }, coords: [36.8679, 42.9489] },
    { id: 'baghdad', region: 'IQ_S', name: { fa: 'بغداد (عراق)', en: 'Baghdad', ku: 'بەغدا' }, coords: [33.3128, 44.3615] },
    { id: 'moscow', region: 'CIS', name: { fa: 'مسکو (روسیه)', en: 'Moscow', ku: 'مۆسکۆ' }, coords: [55.7558, 37.6173] },
    { id: 'kabul', region: 'AF', name: { fa: 'کابل (افغانستان)', en: 'Kabul', ku: 'کابول' }, coords: [34.5553, 69.2075] },
    { id: 'dubai', region: 'SEA', name: { fa: 'دبی / جبل علی', en: 'Dubai (UAE)', ku: 'دوبەی' }, coords: [25.0113, 55.0543] },
  ]
};

// 🧠 تحلیل رویه تجاری
const analyzeTransport = (endNode, lang) => {
  let mode = { icon: <Truck className="w-5 h-5"/>, color: 'text-[#f37021]', border: 'border-[#f37021]' };
  let corridor = ''; let procedure = '';

  if (endNode.region === 'SEA') {
    mode.icon = <Ship className="w-5 h-5"/>; mode.color = 'text-blue-400'; mode.border = 'border-blue-500';
    mode.title = lang === 'fa' ? 'حمل دریایی / کانتینری' : lang === 'ku' ? 'گواستنەوەی دەریایی' : 'Sea Freight';
    corridor = lang === 'fa' ? 'مسیر دریایی خلیج فارس' : lang === 'ku' ? 'ڕێگای دەریایی کەنداو' : 'Persian Gulf Sea Route';
    procedure = lang === 'fa' ? 'صادرات قطعی (FOB/CFR)' : lang === 'ku' ? 'هەناردەی دەریایی' : 'Sea Export (FOB/CFR)';
  } else {
    mode.title = lang === 'fa' ? 'ترانزیت جاده‌ای (TIR/CMR)' : lang === 'ku' ? 'ترانزێتی وشکانی' : 'Road Transit (TIR/CMR)';
    
    if (endNode.region === 'TR_EU') {
      corridor = lang === 'fa' ? 'کریدور ترانزیتی شرق - غرب' : lang === 'ku' ? 'ڕێڕەوی ڕۆژهەڵات - ڕۆژئاوا' : 'East-West Transit Corridor';
      procedure = lang === 'fa' ? 'ترانزیت تحت کارنه تیر' : lang === 'ku' ? 'ترانزێت بە کارنەی تیر' : 'TIR Carnet Transit';
    } else if (endNode.region === 'IQ_K' || endNode.region === 'IQ_S') {
      corridor = lang === 'fa' ? 'شاهراه تجاری غرب' : lang === 'ku' ? 'ڕێڕەوی بازرگانی ڕۆژئاوا' : 'Western Trade Route';
      procedure = lang === 'fa' ? 'صادرات و کراس‌ستافینگ' : lang === 'ku' ? 'هەناردە و گۆڕینی بارهەڵگر' : 'Export & Cross-stuffing';
    } else {
      corridor = lang === 'fa' ? 'کریدور شمال - جنوب (INSTC)' : lang === 'ku' ? 'ڕێڕەوی باکوور - باشوور' : 'INSTC Corridor';
      procedure = lang === 'fa' ? 'ترانزیت جاده‌ای آسیای میانه' : lang === 'ku' ? 'ترانزێتی ئاسیای ناوەڕاست' : 'CIS Road Transit';
    }
  }

  return { mode, corridor, procedure };
};

const getName = (loc, lang) => loc?.name?.[lang] || loc?.name?.en || '';

// 🧠 تابع گرفتن مختصات دقیق جاده‌ها از API با ضریب خطای هوشمند
const fetchExactRoads = async (p1, p2) => {
  try {
    const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${p1[1]},${p1[0]};${p2[1]},${p2[0]}?overview=full&geometries=geojson`);
    const data = await res.json();
    if (data.code === 'Ok') {
      return {
        coords: data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]),
        distance: data.routes[0].distance
      };
    }
    throw new Error('OSRM No Route');
  } catch (err) {
    // در صورت قطعی اینترنت، یک خط مستقیم می‌کشیم اما مسافت را با ضریب جاده‌ای (1.2) واقعی‌تر محاسبه می‌کنیم
    return {
      coords: [p1, p2],
      distance: Math.round(L.latLng(p1).distanceTo(L.latLng(p2)) * 1.2)
    };
  }
};

export default function TransitRouter({ lang = 'fa', isRtl = true }) {
  const locT = dict[lang] || dict['fa']; 
  
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routeLayer = useRef(null);
  const markersGroup = useRef(null);
  
  const [showMinorNodes, setShowMinorNodes] = useState(false);
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');
  const [loading, setLoading] = useState(false);
  const [journeyData, setJourneyData] = useState(null);

  // 🚀 راه‌اندازی نقشه و حل قطعی مشکل نشت حافظه (Memory Leak)
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current, { zoomControl: false, attributionControl: false }).setView([33, 53], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(mapInstance.current);
    
    // ذخیره تایمر در یک متغیر
    const resizeTimer = setTimeout(() => {
      if (mapInstance.current) mapInstance.current.invalidateSize();
    }, 500);

    return () => {
      clearTimeout(resizeTimer); // <--- این خط اضافه شد تا تایمر در زمان خروج پاک شود
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const renderMarkers = useCallback(() => {
    if (!mapInstance.current) return;
    if (markersGroup.current) mapInstance.current.removeLayer(markersGroup.current);
    markersGroup.current = L.layerGroup().addTo(mapInstance.current);

    const createIcon = (color, size = 14) => L.divIcon({
      className: 'custom-icon',
      html: `<div class="relative flex items-center justify-center" style="width:${size}px; height:${size}px;">
               <span class="relative inline-flex rounded-full shadow-lg" style="width:${size-4}px; height:${size-4}px; background-color: ${color}; border: 2px solid #05060A; box-shadow: 0 0 8px ${color};"></span>
             </div>`,
      iconSize: [size, size], iconAnchor: [size/2, size/2]
    });

    const addMarker = (loc, color, onClickType, isMinor = false) => {
      const marker = L.marker(loc.coords, { icon: createIcon(color, isMinor ? 12 : 16) })
        .bindTooltip(`<div class="font-sans font-bold text-[11px] truncate" dir="${isRtl ? 'rtl' : 'ltr'}">${getName(loc, lang)}</div>`, { direction: 'top', offset: [0, -8], className: 'bg-[#1a1c29]/90 text-white border border-white/10 rounded-lg px-2 py-1' });
      marker.on('click', () => onClickType === 'origin' ? setOrigin(loc.id) : setDest(loc.id));
      markersGroup.current.addLayer(marker);
    };

    LOCATIONS.ports.filter(p => showMinorNodes || p.type === 'main').forEach(p => addMarker(p, '#3b82f6', 'origin', p.type === 'minor'));
    LOCATIONS.customs.filter(c => showMinorNodes || c.type === 'main').forEach(c => addMarker(c, '#f37021', 'origin', c.type === 'minor'));
    LOCATIONS.destinations.forEach(d => addMarker(d, '#a855f7', 'dest'));
    if(showMinorNodes) LOCATIONS.intl_customs.forEach(c => addMarker(c, '#fbbf24', 'origin', true));

  }, [lang, isRtl, showMinorNodes]);

  // 🚀 حذف origin و dest از وابستگی‌ها برای جلوگیری از رندر مجدد و بی‌دلیل مارکرها
  useEffect(() => { 
    renderMarkers(); 
  }, [renderMarkers]);

  const calculateRoute = async () => {
    if (!origin || !dest || !mapInstance.current) return;
    setLoading(true); setJourneyData(null);

    const allStarts = [...LOCATIONS.ports, ...LOCATIONS.customs, ...LOCATIONS.intl_customs];
    const start = allStarts.find(l => l.id === origin);
    const end = LOCATIONS.destinations.find(l => l.id === dest);
    if (!start || !end) { setLoading(false); return; }

    let border = null;
    if (end.region !== 'SEA') {
      if (!start.target || start.target !== end.region) {
          border = LOCATIONS.customs.find(c => c.target === end.region && c.type === 'main') 
                || LOCATIONS.customs.find(c => c.target === end.region)
                || LOCATIONS.customs.find(c => c.id === 'bazargan');
      }
    }

    const analysis = analyzeTransport(end, lang);

    try {
      if (routeLayer.current) mapInstance.current.removeLayer(routeLayer.current);

      let finalDistance = 0; 
      let pathCoords = [];

      if (end.region === 'SEA') {
         // مسیر دریایی
         pathCoords = [[start.coords[0], start.coords[1]], [end.coords[0], end.coords[1]]];
         finalDistance = Math.round(mapInstance.current.distance(start.coords, end.coords) / 1000);
         routeLayer.current = L.polyline(pathCoords, { color: '#3b82f6', weight: 4, dashArray: '10, 15', className: 'animate-[dash_30s_linear_infinite]' }).addTo(mapInstance.current);
      } else {
         // مسیر جاده‌ای (تکه‌تکه کردن هوشمند مسیر برای عبور از مرزها)
         if (border && start.id !== border.id) {
            const leg1 = await fetchExactRoads(start.coords, border.coords);
            const leg2 = await fetchExactRoads(border.coords, end.coords);
            pathCoords = [...leg1.coords, ...leg2.coords];
            finalDistance = Math.round((leg1.distance + leg2.distance) / 1000);
         } else {
            const leg = await fetchExactRoads(start.coords, end.coords);
            pathCoords = leg.coords;
            finalDistance = Math.round(leg.distance / 1000);
         }
         
         routeLayer.current = L.polyline(pathCoords, { color: '#f37021', weight: 4, opacity: 0.9, dashArray: '15, 20', className: 'animate-[dash_30s_linear_infinite]' }).addTo(mapInstance.current);
      }

      mapInstance.current.fitBounds(routeLayer.current.getBounds(), { padding: [50, 50], animate: true });
      
      setJourneyData({
        distance: finalDistance.toLocaleString(lang === 'en' ? 'en-US' : 'fa-IR'),
        startName: getName(start, lang),
        borderName: (border && start.id !== border.id) ? getName(border, lang) : null,
        endName: getName(end, lang),
        analysis: analysis
      });
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { if (origin && dest) calculateRoute(); }, [origin, dest]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 bg-[#0a0c14]/90 p-4 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 mt-16" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 🚀 رفع مشکل موبایل: اضافه شدن w-full, min-h-[350px] و absolute inset-0 */}
      <div className="flex-none lg:flex-[1.5] h-[350px] min-h-[350px] md:h-[450px] lg:h-[650px] w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 relative bg-[#05060a]">
        <div ref={mapRef} className="absolute inset-0 w-full h-full z-0" />
        
        <div className="absolute bottom-4 left-4 z-[400] bg-[#05060A]/90 border border-white/10 rounded-xl md:rounded-2xl p-2.5 md:p-3 flex flex-col gap-2 md:gap-2.5 backdrop-blur-sm shadow-xl">
           <div className="flex items-center gap-2"><span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#3b82f6]"></span><span className="text-[9px] md:text-[10px] text-gray-300 font-bold">{locT.mapLegend.ports}</span></div>
           <div className="flex items-center gap-2"><span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#f37021]"></span><span className="text-[9px] md:text-[10px] text-gray-300 font-bold">{locT.mapLegend.customs}</span></div>
           <div className="flex items-center gap-2"><span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#a855f7]"></span><span className="text-[9px] md:text-[10px] text-gray-300 font-bold">{locT.mapLegend.dest}</span></div>
        </div>
        
        {loading && <div className="absolute inset-0 bg-[#05060A]/80 z-[500] flex flex-col items-center justify-center gap-3 backdrop-blur-sm"><RefreshCcw className="w-8 h-8 md:w-10 md:h-10 text-[#f37021] animate-spin" /><span className="text-white text-xs md:text-sm font-bold animate-pulse">{locT.analyzing}</span></div>}
      </div>

      <div className="flex-1 space-y-6 w-full overflow-hidden">
        <div className="bg-white/5 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 w-full">
          <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-3 mb-5 md:mb-6"><Navigation className="w-5 h-5 md:w-6 md:h-6 text-[#f37021]" /> {locT.panelTitle}</h3>
          
          <label className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 cursor-pointer mb-5">
            <span className="text-[10px] md:text-xs font-bold text-gray-400">{locT.showMinor}</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={showMinorNodes} onChange={() => setShowMinorNodes(!showMinorNodes)} />
              <div className={`block w-9 md:w-10 h-5 md:h-6 rounded-full transition-colors ${showMinorNodes ? 'bg-[#f37021]' : 'bg-gray-700'}`}></div>
              <div className={`absolute top-[2px] md:top-1 bg-white w-4 h-4 rounded-full transition-transform ${showMinorNodes ? (isRtl ? '-translate-x-4 md:-translate-x-5' : 'translate-x-4 md:translate-x-5') : (isRtl ? 'translate-x-0' : 'translate-x-0')}`}></div>
            </div>
          </label>
          
          <div className="grid gap-4 w-full">
            {/* 🚀 کلاس truncate اضافه شد تا در موبایل بیرون نزند */}
            <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-[#05060A] border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl text-sm md:text-base text-white outline-none focus:border-[#f37021] cursor-pointer truncate">
              <option value="" disabled>{locT.origin}</option>
              <optgroup label={locT.groups.ports} className="bg-[#1a1c29]">{LOCATIONS.ports.filter(p => showMinorNodes || p.type === 'main').map(l => <option key={l.id} value={l.id}>{getName(l, lang)}</option>)}</optgroup>
              <optgroup label={locT.groups.customs} className="bg-[#1a1c29]">{LOCATIONS.customs.filter(c => showMinorNodes || c.type === 'main').map(l => <option key={l.id} value={l.id}>{getName(l, lang)}</option>)}</optgroup>
              {showMinorNodes && <optgroup label={locT.groups.neighbors} className="bg-[#1a1c29]">{LOCATIONS.intl_customs.map(l => <option key={l.id} value={l.id}>{getName(l, lang)}</option>)}</optgroup>}
            </select>

            <select value={dest} onChange={(e) => setDest(e.target.value)} className="w-full bg-[#05060A] border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl text-sm md:text-base text-white outline-none focus:border-[#f37021] cursor-pointer truncate">
              <option value="" disabled>{locT.dest}</option>
              <optgroup label={locT.groups.tr_eu} className="bg-[#1a1c29]">{LOCATIONS.destinations.filter(d => d.region === 'TR_EU').map(l => <option key={l.id} value={l.id}>{getName(l, lang)}</option>)}</optgroup>
              <optgroup label={locT.groups.iq} className="bg-[#1a1c29]">{LOCATIONS.destinations.filter(d => d.region === 'IQ_K' || d.region === 'IQ_S').map(l => <option key={l.id} value={l.id}>{getName(l, lang)}</option>)}</optgroup>
              <optgroup label={locT.groups.cis} className="bg-[#1a1c29]">{LOCATIONS.destinations.filter(d => d.region === 'CIS' || d.region === 'AM').map(l => <option key={l.id} value={l.id}>{getName(l, lang)}</option>)}</optgroup>
              <optgroup label={locT.groups.sea} className="bg-[#1a1c29]">{LOCATIONS.destinations.filter(d => d.region === 'SEA').map(l => <option key={l.id} value={l.id}>{getName(l, lang)}</option>)}</optgroup>
              <optgroup label={locT.groups.east} className="bg-[#1a1c29]">{LOCATIONS.destinations.filter(d => d.region === 'AF').map(l => <option key={l.id} value={l.id}>{getName(l, lang)}</option>)}</optgroup>
            </select>
          </div>
        </div>

        {journeyData && (
          <div className="space-y-4 animate-in fade-in duration-500 w-full">
            <div className={`bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border-t-2 ${journeyData.analysis.mode.border}`}>
               <div className={`flex items-center gap-2 mb-3 md:mb-4 ${journeyData.analysis.mode.color}`}>
                  {journeyData.analysis.mode.icon}
                  <span className="text-xs md:text-sm font-black tracking-widest truncate">{journeyData.analysis.mode.title}</span>
               </div>
               <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center text-xs md:text-sm"><span className="text-gray-400">{locT.corridor}:</span><span className="text-white font-bold truncate max-w-[60%] text-left rtl:text-right">{journeyData.analysis.corridor}</span></div>
                  <div className="flex justify-between items-center text-xs md:text-sm"><span className="text-gray-400">{locT.procedure}:</span><span className="text-green-400 font-bold truncate max-w-[60%] text-left rtl:text-right">{journeyData.analysis.procedure}</span></div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] w-full">
               <div className="mb-5 md:mb-6">
                  <p className="text-[9px] md:text-[10px] text-gray-500 font-black mb-1">{locT.distLabel}</p>
                  <div className="text-3xl md:text-4xl font-black text-white truncate" dir="ltr">{journeyData.distance} <span className="text-xs md:text-sm text-gray-500">KM</span></div>
               </div>
               
               <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center px-1 mb-2">
                     <span className="text-[9px] md:text-[10px] text-white bg-white/10 px-2 py-1 rounded-md">{locT.origin}</span>
                     {journeyData.borderName ? <span className="text-[9px] md:text-[10px] text-[#f37021] bg-[#f37021]/10 px-2 py-1 rounded-md truncate max-w-[30%] text-center">{locT.border || 'مرز'}</span> : <span className="text-[9px] md:text-[10px] text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md truncate max-w-[30%] text-center">{locT.seaRoute}</span>}
                     <span className="text-[9px] md:text-[10px] text-white bg-blue-500/20 px-2 py-1 rounded-md">{locT.dest}</span>
                  </div>
                  <div className="flex items-center">
                     <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-400 shrink-0"></div>
                     <div className="flex-grow h-[2px] bg-white/20"></div>
                     {journeyData.borderName ? (
                       <><div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#f37021] flex items-center justify-center shrink-0"><ShieldCheck className="w-[10px] h-[10px] md:w-2 md:h-2 text-black"/></div><div className="flex-grow h-[2px] bg-white/20"></div></>
                     ) : (
                       <><div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0"><Anchor className="w-[10px] h-[10px] md:w-2 md:h-2 text-black"/></div><div className="flex-grow h-[2px] bg-white/20"></div></>
                     )}
                     <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500 shrink-0"></div>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-xs text-gray-400 mt-2 font-bold gap-2">
                    <span className="truncate flex-1">{journeyData.startName}</span>
                    {journeyData.borderName ? <span className="text-[#f37021] truncate flex-1 text-center">{journeyData.borderName}</span> : <span className="text-blue-400 truncate flex-1 text-center">{locT.directSea}</span>}
                    <span className="text-blue-400 truncate flex-1 text-left rtl:text-right">{journeyData.endName}</span>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
