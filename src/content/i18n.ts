export const languages = ['en', 'tr'] as const;
export type Lang = (typeof languages)[number];

const en = {
  'meta.title': 'Mehmet Baysal — Web Design & Coding Student',
  'meta.description':
    'Portfolio of Mehmet Baysal, a web design and coding student: a browser horror game, a five-language listings platform, business software and a book forum.',

  'skip': 'Skip to content',
  'loader.label': 'Loading portfolio',

  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.services': 'Skills',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.close': 'Close',
  'header.status': 'Open to internships & freelance',

  'hero.eyebrow': 'Web Design & Coding Student',
  'hero.title.a': 'Mehmet',
  'hero.title.b': '<em>Baysal</em>',
  'hero.intro':
    'I’m a web design and coding student who learns by shipping real projects: a 3D horror game that runs in the browser, a five-language listings platform and software for businesses.',
  'hero.location': 'Türkiye — open to remote work',
  'hero.scroll': 'Scroll to explore',

  'about.label': '(01) About',
  'about.text':
    'I believe the fastest way to learn code is to build something people can actually use. That’s why every project here was made to <em>work</em>: a game you can finish, a marketplace you can post on, a forum you can argue in.',
  'about.side':
    'Right now I’m going deeper into Node.js back-ends, real-time 3D with Three.js and fast, accessible front-ends.',
  'about.cta': 'Get in touch',
  'about.map':
    'The map beside this text is real: every day’s commits since December 2025, 49 weeks and 848 commits across nine projects.',

  'work.label': '(02) Selected work',
  'work.title': 'Selected <em>work</em>',
  'work.p1.title': 'Almost There',
  'work.p1.type': 'Game · Three.js',
  'work.p1.desc':
    'A PS1-style psychological horror game: a house that keeps rearranging itself around one night, five days and one road.',
  'work.p1.h1': 'One HTML file, no separate image or model files',
  'work.p1.h2': 'Hand-written PS1 shader: snapped vertices, 360p render target, dithering',
  'work.p1.h3': 'English and Turkish, plus a Windows build with Electron',
  'work.p1.period': 'Oct 19 – Nov 1, 2026',
  'work.p1.cta': 'Play in the browser',
  'work.p1.alt': 'Almost There title screen',
  'work.p2.title': 'Cypilan',
  'work.p2.type': 'Listings platform · Full-stack',
  'work.p2.desc':
    'A listings marketplace for Cyprus with sign-up, posting, messaging and an admin panel, built end to end.',
  'work.p2.h1': 'Five languages, with a right-to-left layout for Farsi',
  'work.p2.h2': 'i18n scripts that keep every translation key in sync',
  'work.p2.h3': 'Real estate, vehicles, jobs, services and second-hand',
  'work.p2.period': 'Aug 8 – Oct 26, 2026',
  'work.p2.cta': 'View on GitHub',
  'work.p2.alt': 'Cypilan home page with listing categories',
  'work.p3.title': 'Distribution Tracking System',
  'work.p3.type': 'Business software · Full-stack',
  'work.p3.desc':
    'A distribution and stock tracking system for hotels and businesses: quick entry at the counter, with the rules enforced by the system.',
  'work.p3.h1': 'Role-based accounts: admin, staff and a root account',
  'work.p3.h2': 'Time rule per customer: live countdown in the UI, enforced on the server',
  'work.p3.h3': 'Stock ledger, end-of-day reports, Excel export and automatic backups',
  'work.p3.period': 'Aug 25 – Oct 26, 2026',
  'work.p3.cta': 'Request a demo',
  'work.p3.alt': 'Quick entry screen of the distribution tracking system on a phone',
  'work.p4.title': 'Okuryazmaz',
  'work.p4.type': 'Community · Full-stack',
  'work.p4.desc':
    'A new-generation literature forum: topics, quotes, book ratings and badges for a community of readers.',
  'work.p4.h1': 'JWT authentication, rate limiting and Helmet security headers',
  'work.p4.h2': 'Categories, quotes, book ratings, followers and badges',
  'work.p4.h3': 'Optional AI features powered by the Gemini API',
  'work.p4.period': 'May 14 – Oct 26, 2026',
  'work.p4.cta': 'View on GitHub',
  'work.p4.alt': 'Okuryazmaz forum home page',
  'work.p5.title': 'Boru Hattı Analiz Paneli',
  'work.p5.type': 'TÜBİTAK application · Dashboard',
  'work.p5.desc':
    'An analytics dashboard that monitors pipeline sensors, built as the interface of a TÜBİTAK project application.',
  'work.p5.h1': 'TÜBİTAK project application that passed the preliminary rounds',
  'work.p5.h2': 'Sensor simulation, live Chart.js charts and threshold alerts',
  'work.p5.h3': 'Gemini-powered assistant and a mobile-friendly Bootstrap UI',
  'work.p5.period': 'Mar – Jun 2026',
  'work.p5.cta': 'View on GitHub',
  'work.p5.alt': 'Boru Hattı Analiz Paneli live dashboard',
  'work.commits': 'Commits',
  'work.period': 'Period',
  'work.code': 'Code',

  'marquee.a': 'Web Design',
  'marquee.b': 'Front-end',
  'marquee.c': 'Three.js',
  'marquee.d': 'Node.js',

  'services.label': '(03) Skills',
  'services.title': 'What I <em>build</em> with',
  'services.s1.title': 'Front-end development',
  'services.s1.desc':
    'Semantic HTML, modern CSS and framework-free JavaScript: responsive interfaces that load fast on any device.',
  'services.s2.title': 'Back-end & databases',
  'services.s2.desc':
    'Express servers, sessions and JWT authentication, role-based access and SQLite databases.',
  'services.s3.title': 'Real-time 3D & games',
  'services.s3.desc':
    'Three.js scenes, custom GLSL shaders and browser games packaged for desktop with Electron.',
  'services.s4.title': 'Multilingual & AI features',
  'services.s4.desc':
    'Interfaces in five languages including right-to-left, Gemini API integrations and data dashboards.',

  'process.label': '(04) Journey',
  'process.title': 'Nine projects in <em>one year</em>',
  'process.s1.date': 'Dec 2025',
  'process.s1.title': 'First steps',
  'process.s1.desc':
    'Session handling in PHP, a framework-free JavaScript cart and a first try at 3D with Three.js.',
  'process.s2.date': 'Mar 2026',
  'process.s2.title': 'First real work',
  'process.s2.desc':
    'A corporate site for a thermal hotel and a live monitoring dashboard for a TÜBİTAK application.',
  'process.s3.date': 'May 2026',
  'process.s3.title': 'Into the back-end',
  'process.s3.desc': 'Okuryazmaz: the first full-stack project, with Node.js, JWT and SQLite.',
  'process.s4.date': 'Aug 2026',
  'process.s4.title': 'Built for real users',
  'process.s4.desc':
    'Five-language Cypilan and a distribution tracker for businesses: roles, reports and backups.',
  'process.s5.date': 'Oct 2026',
  'process.s5.title': 'My own game',
  'process.s5.desc':
    'Almost There: 429 commits in 13 days, a hand-written PS1 shader and a Windows build.',

  'stats.s1': 'Commits across projects',
  'stats.s2': 'Commits on Almost There',
  'stats.s3': 'Languages in Cypilan',
  'stats.s4': 'Technologies used',

  'contact.label': '(05) Contact',
  'contact.title.a': 'Internship, freelance or a question?',
  'contact.title.b': 'Let’s build something <em>together</em>.',
  'contact.text':
    'I’m open to internships and freelance work. Write to me and I’ll get back to you soon.',
  'contact.cta': 'Send an email',
  'contact.social': 'Code',

  'footer.rights': 'All rights reserved.',
  'footer.time': 'Local time',
  'footer.top': 'Back to top',
  'footer.credit': 'Designed & built by Mehmet Baysal',
  'fallback': 'Your browser does not support WebGL — enjoying the lightweight version.',
  'cursor.view': 'View',
  'cursor.mail': 'Say hi',
} as const;

export type DictKey = keyof typeof en;
export type Dict = Record<DictKey, string>;

const tr: Dict = {
  'meta.title': 'Mehmet Baysal — Web Tasarım & Kodlama Öğrencisi',
  'meta.description':
    'Web tasarımı ve kodlama öğrencisi Mehmet Baysal’ın portfolyosu: tarayıcıda çalışan bir korku oyunu, beş dilli bir ilan platformu, işletme yazılımları ve bir kitap forumu.',

  'skip': 'İçeriğe geç',
  'loader.label': 'Portfolyo yükleniyor',

  'nav.work': 'İşler',
  'nav.about': 'Hakkımda',
  'nav.services': 'Yetenekler',
  'nav.contact': 'İletişim',
  'nav.menu': 'Menü',
  'nav.close': 'Kapat',
  'header.status': 'Staj ve freelance işlere açığım',

  'hero.eyebrow': 'Web Tasarım & Kodlama Öğrencisi',
  'hero.title.a': 'Mehmet',
  'hero.title.b': '<em>Baysal</em>',
  'hero.intro':
    'Gerçek projeler yaparak öğrenen bir web tasarımı ve kodlama öğrencisiyim: tarayıcıda çalışan 3D bir korku oyunu, beş dilli bir ilan platformu ve işletmeler için yazılımlar.',
  'hero.location': 'Türkiye — uzaktan çalışmaya açık',
  'hero.scroll': 'Keşfetmek için kaydır',

  'about.label': '(01) Hakkımda',
  'about.text':
    'Kodlamayı öğrenmenin en hızlı yolunun, insanların gerçekten kullanabileceği bir şey yapmak olduğuna inanıyorum. Bu yüzden buradaki her proje <em>çalışsın</em> diye yapıldı: bitirilebilen bir oyun, ilan verilebilen bir pazaryeri, tartışılabilen bir forum.',
  'about.side':
    'Şu sıralar Node.js ile back-end, Three.js ile gerçek zamanlı 3D ve hızlı, erişilebilir arayüzler üzerine yoğunlaşıyorum.',
  'about.cta': 'Bana ulaş',
  'about.map':
    'Bu yazının yanındaki harita gerçek: Aralık 2025’ten bu yana her günün commit sayısı; 49 hafta, dokuz projede 848 commit.',

  'work.label': '(02) Öne çıkan işler',
  'work.title': 'Öne çıkan <em>işler</em>',
  'work.p1.title': 'Almost There',
  'work.p1.type': 'Oyun · Three.js',
  'work.p1.desc':
    'PS1 tarzı psikolojik korku oyunu: tek bir gecenin etrafında kendini yeniden düzenleyen bir ev, beş gün ve tek bir yol.',
  'work.p1.h1': 'Tek HTML dosyası; ayrı görsel ya da model dosyası yok',
  'work.p1.h2': 'Elle yazılmış PS1 shader’ı: oturan köşeler, 360p çizim, dithering',
  'work.p1.h3': 'Türkçe ve İngilizce; Electron ile Windows sürümü',
  'work.p1.period': '19 Eki – 1 Kas 2026',
  'work.p1.cta': 'Tarayıcıda oyna',
  'work.p1.alt': 'Almost There başlık ekranı',
  'work.p2.title': 'Cypilan',
  'work.p2.type': 'İlan platformu · Full-stack',
  'work.p2.desc':
    'Kıbrıs genelinde ilan pazaryeri: kayıt, ilan verme, mesajlaşma ve yönetim paneliyle uçtan uca bir ürün.',
  'work.p2.h1': 'Beş dil; Farsça için sağdan sola arayüz',
  'work.p2.h2': 'Tüm çeviri anahtarlarını senkron tutan i18n betikleri',
  'work.p2.h3': 'Emlak, vasıta, iş, hizmet ve ikinci el kategorileri',
  'work.p2.period': '8 Ağu – 26 Eki 2026',
  'work.p2.cta': 'GitHub’da incele',
  'work.p2.alt': 'Cypilan ana sayfası ve ilan kategorileri',
  'work.p3.title': 'Dağıtım Takip Sistemi',
  'work.p3.type': 'İşletme yazılımı · Full-stack',
  'work.p3.desc':
    'Oteller ve işletmeler için ürün dağıtım ve stok takip sistemi: tezgâhta hızlı kayıt, kuralları sistem uygular.',
  'work.p3.h1': 'Rol tabanlı hesaplar: yönetici, görevli ve kök hesap',
  'work.p3.h2': 'Müşteri başına zaman kuralı: arayüzde canlı geri sayım, sunucuda zorunlu',
  'work.p3.h3': 'Stok defteri, gün sonu raporu, Excel dökümü ve otomatik yedekleme',
  'work.p3.period': '25 Ağu – 26 Eki 2026',
  'work.p3.cta': 'Demo iste',
  'work.p3.alt': 'Dağıtım takip sisteminin telefondaki hızlı kayıt ekranı',
  'work.p4.title': 'Okuryazmaz',
  'work.p4.type': 'Topluluk · Full-stack',
  'work.p4.desc':
    'Yeni nesil edebiyat ve kitap forumu: konular, alıntılar, kitap puanları ve rozetlerle bir okur topluluğu.',
  'work.p4.h1': 'JWT ile kimlik doğrulama, istek sınırlama ve Helmet güvenlik başlıkları',
  'work.p4.h2': 'Kategoriler, alıntılar, kitap puanları, takip ve rozetler',
  'work.p4.h3': 'Gemini API ile isteğe bağlı yapay zekâ özellikleri',
  'work.p4.period': '14 May – 26 Eki 2026',
  'work.p4.cta': 'GitHub’da incele',
  'work.p4.alt': 'Okuryazmaz forum ana sayfası',
  'work.p5.title': 'Boru Hattı Analiz Paneli',
  'work.p5.type': 'TÜBİTAK başvurusu · Panel',
  'work.p5.desc':
    'Boru hattı sensörlerini izleyen analiz paneli; TÜBİTAK’a sunulan proje başvurusunun arayüzü olarak geliştirildi.',
  'work.p5.h1': 'TÜBİTAK proje başvurusu; ön elemeleri geçti',
  'work.p5.h2': 'Sensör simülasyonu, canlı Chart.js grafikleri ve eşik uyarıları',
  'work.p5.h3': 'Gemini destekli asistan ve mobil uyumlu Bootstrap arayüzü',
  'work.p5.period': 'Mar – Haz 2026',
  'work.p5.cta': 'GitHub’da incele',
  'work.p5.alt': 'Boru Hattı Analiz Paneli canlı izleme ekranı',
  'work.commits': 'Commit',
  'work.period': 'Dönem',
  'work.code': 'Kod',

  'marquee.a': 'Web Tasarımı',
  'marquee.b': 'Front-end',
  'marquee.c': 'Three.js',
  'marquee.d': 'Node.js',

  'services.label': '(03) Yetenekler',
  'services.title': 'Neyle <em>üretiyorum</em>',
  'services.s1.title': 'Front-end geliştirme',
  'services.s1.desc':
    'Semantik HTML, modern CSS ve framework’süz JavaScript: her cihazda hızlı açılan, duyarlı arayüzler.',
  'services.s2.title': 'Back-end & veritabanı',
  'services.s2.desc':
    'Express sunucuları, oturum ve JWT ile kimlik doğrulama, rol tabanlı yetkilendirme ve SQLite veritabanları.',
  'services.s3.title': 'Gerçek zamanlı 3D & oyun',
  'services.s3.desc':
    'Three.js sahneleri, özel GLSL shader’lar ve Electron ile masaüstüne paketlenen tarayıcı oyunları.',
  'services.s4.title': 'Çok dillilik & yapay zekâ',
  'services.s4.desc':
    'Sağdan sola dahil beş dilde arayüzler, Gemini API entegrasyonları ve veri panelleri.',

  'process.label': '(04) Yolculuk',
  'process.title': 'Bir yılda <em>dokuz proje</em>',
  'process.s1.date': 'Ara 2025',
  'process.s1.title': 'İlk adımlar',
  'process.s1.desc':
    'PHP ile oturum yönetimi, framework’süz JavaScript ile bir sepet ve Three.js ile ilk 3D denemesi.',
  'process.s2.date': 'Mar 2026',
  'process.s2.title': 'İlk gerçek işler',
  'process.s2.desc':
    'Bir termal otelin kurumsal sitesi ve TÜBİTAK başvurusu için canlı bir izleme paneli.',
  'process.s3.date': 'May 2026',
  'process.s3.title': 'Back-end’e geçiş',
  'process.s3.desc': 'Okuryazmaz: Node.js, JWT ve SQLite ile ilk full-stack proje.',
  'process.s4.date': 'Ağu 2026',
  'process.s4.title': 'Gerçek kullanıcılar için',
  'process.s4.desc':
    'Beş dilli Cypilan ve işletmeler için dağıtım takip sistemi: roller, raporlar ve yedekleme.',
  'process.s5.date': 'Eki 2026',
  'process.s5.title': 'Kendi oyunum',
  'process.s5.desc':
    'Almost There: 13 günde 429 commit, elle yazılmış PS1 shader’ı ve Windows sürümü.',

  'stats.s1': 'Projelerdeki commit',
  'stats.s2': 'Almost There’daki commit',
  'stats.s3': 'Cypilan’daki dil',
  'stats.s4': 'Kullanılan teknoloji',

  'contact.label': '(05) İletişim',
  'contact.title.a': 'Staj, freelance ya da bir soru?',
  'contact.title.b': 'Birlikte bir şey <em>üretelim</em>.',
  'contact.text': 'Staj ve freelance işlere açığım. Bana yaz, en kısa sürede dönüş yaparım.',
  'contact.cta': 'E-posta gönder',
  'contact.social': 'Kodlarım',

  'footer.rights': 'Tüm hakları saklıdır.',
  'footer.time': 'Yerel saat',
  'footer.top': 'Başa dön',
  'footer.credit': 'Tasarım & kodlama: Mehmet Baysal',
  'fallback': 'Tarayıcın WebGL desteklemiyor — hafif sürümün keyfini çıkar.',
  'cursor.view': 'İncele',
  'cursor.mail': 'Merhaba',
};

export const dict: Record<Lang, Dict> = { en, tr };
