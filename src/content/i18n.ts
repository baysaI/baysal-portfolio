/**
 * All translatable copy, keyed by `data-i18n` attributes in index.html.
 * English is injected at build time (see vite.config.ts) so the page is fully
 * readable without JavaScript; Turkish is swapped in at runtime.
 *
 * Allowed inline markup: <em>, <br>, <strong>.
 */

export const languages = ['en', 'tr'] as const;
export type Lang = (typeof languages)[number];

const en = {
  'meta.title': 'Baysai — Creative Developer & 3D Designer',
  'meta.description':
    'Independent creative developer crafting immersive 3D websites, real-time product experiences and interactive stories.',

  'skip': 'Skip to content',
  'loader.label': 'Loading experience',

  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.close': 'Close',
  'header.status': 'Available for new projects',

  'hero.eyebrow': 'Creative Developer & 3D Designer',
  'hero.title.a': 'Interfaces',
  'hero.title.b': 'with <em>depth</em>',
  'hero.intro':
    'Independent creative developer crafting immersive 3D websites, product experiences and interactive stories for ambitious brands.',
  'hero.location': 'Istanbul — working worldwide',
  'hero.scroll': 'Scroll to explore',

  'about.label': '(01) About',
  'about.text':
    'I work where design meets engineering. Every project begins with one question — how should this <em>feel</em>? Then I build it, with real-time 3D, motion and code that respects performance as much as craft.',
  'about.side':
    'Studio-level quality, delivered by one focused partner. From concept and art direction to production-ready code.',
  'about.cta': 'Start a conversation',

  'work.label': '(02) Selected work',
  'work.title': 'Selected <em>work</em>',
  'work.cta': 'View case study',
  'work.p1.title': 'Monolith',
  'work.p1.type': 'Immersive product launch',
  'work.p1.desc':
    'A scroll-driven WebGL launch for a premium audio brand — the product assembles itself in real time as the story unfolds.',
  'work.p2.title': 'Helix',
  'work.p2.type': 'Biotech brand platform',
  'work.p2.desc':
    'Data-rich storytelling for a genomics lab. Millions of data points rendered as a living, explorable structure.',
  'work.p3.title': 'Orbit',
  'work.p3.type': 'Real-time 3D configurator',
  'work.p3.desc':
    'A configurator that lets customers shape, light and order a product in the browser — at 60 fps, even on mobile.',
  'work.p4.title': 'Tidal',
  'work.p4.type': 'Generative identity system',
  'work.p4.desc':
    'A motion identity where every frame is generated: wave fields that respond to sound, data and touch.',

  'marquee.a': 'Creative Development',
  'marquee.b': 'Real-time 3D',
  'marquee.c': 'Motion Design',
  'marquee.d': 'Interaction',

  'services.label': '(03) Capabilities',
  'services.title': 'What I <em>bring</em> to the table',
  'services.s1.title': 'Creative Development',
  'services.s1.desc':
    'High-end front-end engineering — smooth, accessible and fast on every device, from flagship sites to product UIs.',
  'services.s2.title': 'WebGL & Real-time 3D',
  'services.s2.desc':
    'Custom shaders, particle systems and 3D scenes that run in the browser at a steady 60 frames per second.',
  'services.s3.title': 'Motion & Interaction',
  'services.s3.desc':
    'Scroll choreography, micro-interactions and transitions that give an interface rhythm and a pulse.',
  'services.s4.title': '3D Design & Art Direction',
  'services.s4.desc':
    'From concept to final frame: modelling, lighting and look-development for digital products and campaigns.',

  'process.label': '(04) Process',
  'process.title': 'From first sketch to <em>final frame</em>',
  'process.s1.title': 'Discover',
  'process.s1.desc':
    'Workshops, research and a sharp brief. We define what success feels like before anything gets built.',
  'process.s2.title': 'Design',
  'process.s2.desc':
    'Art direction, 3D look-dev and motion prototypes — validated early, directly in the browser.',
  'process.s3.title': 'Develop',
  'process.s3.desc':
    'Production-grade code, custom shaders and a relentless focus on performance and accessibility.',
  'process.s4.title': 'Deliver',
  'process.s4.desc':
    'Launch, measure, refine. Clear documentation and handover so your team owns the result.',

  'stats.s1': 'Years of practice',
  'stats.s2': 'Projects shipped',
  'stats.s3': 'Countries',
  'stats.s4': 'Target on mobile',

  'contact.label': '(05) Contact',
  'contact.title.a': 'Have an idea?',
  'contact.title.b': 'Let’s make it <em>unforgettable</em>.',
  'contact.text': 'Tell me about your project, timeline and ambitions. I reply within 24 hours.',
  'contact.cta': 'Start a project',
  'contact.social': 'Elsewhere',

  'footer.rights': 'All rights reserved.',
  'footer.time': 'Local time',
  'footer.top': 'Back to top',
  'footer.credit': 'Designed & developed by Baysai',
  'fallback': 'Your browser does not support WebGL — enjoying the lightweight version.',
  'cursor.view': 'View',
  'cursor.mail': 'Say hi',
} as const;

export type DictKey = keyof typeof en;
export type Dict = Record<DictKey, string>;

const tr: Dict = {
  'meta.title': 'Baysai — Kreatif Geliştirici & 3D Tasarımcı',
  'meta.description':
    'Sürükleyici 3D web siteleri, gerçek zamanlı ürün deneyimleri ve etkileşimli hikâyeler üreten bağımsız kreatif geliştirici.',

  'skip': 'İçeriğe geç',
  'loader.label': 'Deneyim yükleniyor',

  'nav.work': 'İşler',
  'nav.about': 'Hakkımda',
  'nav.services': 'Hizmetler',
  'nav.contact': 'İletişim',
  'nav.menu': 'Menü',
  'nav.close': 'Kapat',
  'header.status': 'Yeni projelere açığım',

  'hero.eyebrow': 'Kreatif Geliştirici & 3D Tasarımcı',
  'hero.title.a': 'Derinliği',
  'hero.title.b': 'olan <em>arayüzler</em>',
  'hero.intro':
    'Cesur markalar için sürükleyici 3D web siteleri, ürün deneyimleri ve etkileşimli hikâyeler üreten bağımsız kreatif geliştirici.',
  'hero.location': 'İstanbul — dünya çapında',
  'hero.scroll': 'Keşfetmek için kaydır',

  'about.label': '(01) Hakkımda',
  'about.text':
    'Tasarımın mühendislikle buluştuğu yerde çalışıyorum. Her proje tek bir soruyla başlar — bu nasıl <em>hissettirmeli</em>? Sonra onu inşa ederim; gerçek zamanlı 3D, hareket ve zanaat kadar performansa da saygı duyan kodla.',
  'about.side':
    'Stüdyo kalitesi, tek ve odaklı bir partnerden. Konsept ve sanat yönetiminden yayına hazır koda kadar.',
  'about.cta': 'Sohbet başlat',

  'work.label': '(02) Seçili işler',
  'work.title': 'Seçili <em>işler</em>',
  'work.cta': 'Projeyi incele',
  'work.p1.title': 'Monolith',
  'work.p1.type': 'Sürükleyici ürün lansmanı',
  'work.p1.desc':
    'Premium bir ses markası için kaydırmayla ilerleyen WebGL lansmanı — hikâye aktıkça ürün gerçek zamanlı olarak kendini monte ediyor.',
  'work.p2.title': 'Helix',
  'work.p2.type': 'Biyoteknoloji marka platformu',
  'work.p2.desc':
    'Bir genomik laboratuvarı için veri odaklı anlatım. Milyonlarca veri noktası, keşfedilebilir canlı bir yapı olarak render ediliyor.',
  'work.p3.title': 'Orbit',
  'work.p3.type': 'Gerçek zamanlı 3D konfigüratör',
  'work.p3.desc':
    'Müşterilerin ürünü tarayıcıda şekillendirip ışıklandırıp sipariş edebildiği bir konfigüratör — mobilde bile 60 fps.',
  'work.p4.title': 'Tidal',
  'work.p4.type': 'Üretken kimlik sistemi',
  'work.p4.desc':
    'Her karenin üretildiği bir hareket kimliği: sese, veriye ve dokunuşa tepki veren dalga alanları.',

  'marquee.a': 'Kreatif Geliştirme',
  'marquee.b': 'Gerçek Zamanlı 3D',
  'marquee.c': 'Hareket Tasarımı',
  'marquee.d': 'Etkileşim',

  'services.label': '(03) Yetkinlikler',
  'services.title': 'Masaya <em>getirdiklerim</em>',
  'services.s1.title': 'Kreatif Geliştirme',
  'services.s1.desc':
    'Üst düzey front-end mühendisliği — amiral gemisi sitelerden ürün arayüzlerine, her cihazda akıcı, erişilebilir ve hızlı.',
  'services.s2.title': 'WebGL & Gerçek Zamanlı 3D',
  'services.s2.desc':
    'Tarayıcıda saniyede istikrarlı 60 karede çalışan özel shader’lar, parçacık sistemleri ve 3D sahneler.',
  'services.s3.title': 'Hareket & Etkileşim',
  'services.s3.desc':
    'Arayüze ritim ve nabız kazandıran kaydırma koreografisi, mikro etkileşimler ve geçişler.',
  'services.s4.title': '3D Tasarım & Sanat Yönetimi',
  'services.s4.desc':
    'Konseptten son kareye: dijital ürünler ve kampanyalar için modelleme, ışıklandırma ve görünüm geliştirme.',

  'process.label': '(04) Süreç',
  'process.title': 'İlk eskizden <em>son kareye</em>',
  'process.s1.title': 'Keşif',
  'process.s1.desc':
    'Atölyeler, araştırma ve net bir brief. Herhangi bir şey inşa edilmeden önce başarının nasıl hissettireceğini tanımlarız.',
  'process.s2.title': 'Tasarım',
  'process.s2.desc':
    'Sanat yönetimi, 3D görünüm geliştirme ve hareket prototipleri — erken aşamada, doğrudan tarayıcıda doğrulanır.',
  'process.s3.title': 'Geliştirme',
  'process.s3.desc':
    'Üretim kalitesinde kod, özel shader’lar ve performans ile erişilebilirliğe tavizsiz odak.',
  'process.s4.title': 'Teslim',
  'process.s4.desc':
    'Yayına al, ölç, iyileştir. Ekibinin sonuca sahip olması için net dokümantasyon ve devir teslim.',

  'stats.s1': 'Yıllık deneyim',
  'stats.s2': 'Tamamlanan proje',
  'stats.s3': 'Ülke',
  'stats.s4': 'Mobilde hedef',

  'contact.label': '(05) İletişim',
  'contact.title.a': 'Bir fikrin mi var?',
  'contact.title.b': 'Hadi onu <em>unutulmaz</em> yapalım.',
  'contact.text': 'Projeni, takvimini ve hedeflerini anlat. 24 saat içinde dönüş yaparım.',
  'contact.cta': 'Proje başlat',
  'contact.social': 'Diğer kanallar',

  'footer.rights': 'Tüm hakları saklıdır.',
  'footer.time': 'Yerel saat',
  'footer.top': 'Başa dön',
  'footer.credit': 'Tasarım & geliştirme: Baysai',
  'fallback': 'Tarayıcın WebGL desteklemiyor — hafif sürümün keyfini çıkar.',
  'cursor.view': 'İncele',
  'cursor.mail': 'Merhaba',
};

export const dict: Record<Lang, Dict> = { en, tr };
