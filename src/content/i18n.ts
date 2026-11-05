export const languages = ['en', 'tr'] as const;
export type Lang = (typeof languages)[number];

const en = {
  'meta.title': 'Mehmet Baysal — Web Developer & Game Development',
  'meta.description':
    'Portfolio of Mehmet Baysal, web developer and Web Design & Coding student: a hotel website in production, a horror game on itch.io, a five-language listings platform and business software.',

  'skip': 'Skip to content',
  'loader.label': 'Loading portfolio',

  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.services': 'Skills',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.close': 'Close',
  'header.status': 'Open to internships & freelance',

  'hero.eyebrow': 'Web Developer · Game Development',
  'hero.title.a': 'Mehmet',
  'hero.title.b': '<em>Baysal</em>',
  'hero.intro':
    'I’m a Web Design & Coding student, and I take my own work from idea to launch: from a hotel’s live website to a horror game published on itch.io.',
  'hero.location': 'Antalya, Türkiye — open to remote work',
  'hero.scroll': 'Scroll to explore',

  'about.label': '(01) About',
  'about.text':
    'I believe the fastest way to learn code is to build something people can actually use. That’s why every project here was made to <em>work</em>: a game you can finish, a marketplace you can post on, a forum you can argue in.',
  'about.side':
    'I’m a second-year Web Design & Coding student at Burdur Mehmet Akif Ersoy University. Years of hotel work taught me teamwork and communication; now I’m looking for an internship where I can grow on work that real users touch.',
  'about.cta': 'Get in touch',
  'about.photo': 'Portrait of Mehmet Baysal',
  'about.map':
    'The map beside this text is real: every day’s commits since December 2025, 49 weeks and 848 commits across nine projects.',

  'work.label': '(02) Selected work',
  'work.title': 'Selected <em>work</em>',
  'work.p1.title': 'Almost There',
  'work.p1.type': 'Game · Three.js',
  'work.p1.desc':
    'A PS1-style psychological horror game: a house that keeps rearranging itself around one night, five days and one road.',
  'work.p1.h1': 'Live on itch.io for the browser and Windows; about 100 players so far',
  'work.p1.h2': 'Hand-written PS1 shader: vertex snapping, 360p render, dithering',
  'work.p1.h3':
    'About 40 minutes, code-drawn textures and procedural Web Audio sound, all in one HTML file',
  'work.p1.period': 'Oct 19 – Nov 1, 2026',
  'work.p1.cta': 'Play on itch.io',
  'work.p1.alt': 'Almost There title screen',
  'work.p2.title': 'Cypilan',
  'work.p2.type': 'Listings platform · Full-stack',
  'work.p2.desc':
    'A digital listings and marketplace platform for Cyprus, with an architecture designed and built from scratch.',
  'work.p2.h1': 'Turkish, English, Greek, Russian and Farsi, right-to-left included',
  'work.p2.h2': 'npm scripts that sync translations and scan for missing text',
  'work.p2.h3': 'Real estate, vehicles, jobs, services and second-hand',
  'work.p2.period': 'Aug 8 – Oct 26, 2026',
  'work.p2.cta': 'View on GitHub',
  'work.p2.alt': 'Cypilan home page with listing categories',
  'work.p3.title': 'Distribution Tracking System',
  'work.p3.type': 'Business software · Full-stack',
  'work.p3.desc':
    'A distribution and stock tracking system for hotels and businesses: quick entry at the counter, with the rules enforced by the system.',
  'work.p3.h1': 'Role-based accounts: admin, staff and a root account',
  'work.p3.h2': 'A 4-hour pickup rule enforced on the server, with a live countdown',
  'work.p3.h3':
    'Stock management, a special approval flow, end-of-day period close and Excel export',
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
  'work.p5.h3': 'Serverless: runs entirely in the browser with a mobile-friendly Bootstrap UI',
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
  'marquee.e': 'Game Development',

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
    'Three.js scenes, hand-written GLSL shaders, procedural sound with the Web Audio API and desktop builds with Electron.',
  'services.s4.title': 'Tools & integrations',
  'services.s4.desc':
    'Git and GitHub on every project, GitHub Pages deployments, Gemini API features, Chart.js dashboards and five-language interfaces.',

  'experience.label': '(04) Experience',
  'experience.title': 'Experience & <em>education</em>',
  'experience.group.web': 'Web work',
  'experience.group.hotel': 'Tourism & hospitality',
  'experience.group.hotel.note':
    'Where I picked up teamwork and the habit of talking to people, long before my first commit.',
  'experience.e1.date': 'Mar 2026',
  'experience.e1.role': 'Freelance Web Developer',
  'experience.e1.place': 'Altuncu Premium Thermal Hotel',
  'experience.e1.desc':
    'Built the hotel’s corporate website from scratch in plain HTML, CSS and JavaScript and took it live. A Node.js script assembles the shared components, IntersectionObserver keeps images light, and the contact form notifies hotel management instantly on WhatsApp through a webhook.',
  'experience.e2.date': 'Freelance',
  'experience.e2.role': 'Google Business Profile & QR menus',
  'experience.e2.place': 'Altuncu Premium Thermal Hotel · Dark Blue Cafe',
  'experience.e2.desc':
    'Google Business Profile support for Altuncu Premium Thermal Hotel and Dark Blue Cafe in Manisa, plus QR menus for Altuncu Cafe and Dark Blue Cafe.',
  'experience.e3.date': 'Apr – Jul 2024',
  'experience.e3.role': 'Minibar Attendant',
  'experience.e3.place': 'Liberty Lara, Antalya · full-time',
  'experience.e4.date': 'Aug 2021 – Sep 2023',
  'experience.e4.role': 'Waiter, Bellhop & Commis',
  'experience.e4.place': 'İskele Park Termal, Armutlu/Yalova',
  'experience.edu.label': 'Education',
  'experience.edu.school': 'Burdur Mehmet Akif Ersoy University',
  'experience.edu.program': 'Web Design & Coding · associate degree, 2nd year',
  'experience.edu.date': '2025 – 2027',
  'experience.cert.label': 'Certificates · BTK Akademi',
  'experience.cert.c1': 'Introduction to the World of AI',
  'experience.cert.c2': 'Digital Engineering & Digital Transformation',
  'experience.cert.c3': 'IT Law',
  'experience.cert.c4': 'Project & Risk Management',
  'experience.cert.c5': 'Presentation Techniques & Communication Management in Entrepreneurship',
  'experience.cert.c6': 'Introduction to Social Media Expertise',
  'experience.cert.c7': 'English B2',
  'experience.lang.label': 'Languages',
  'experience.lang.tr': 'Turkish — native',
  'experience.lang.en': 'English — B2',

  'process.label': '(05) Journey',
  'process.title': 'Nine projects in <em>one year</em>',
  'process.s1.date': 'Dec 2025',
  'process.s1.title': 'First steps',
  'process.s1.desc':
    'Session handling in PHP, a framework-free JavaScript cart and a first try at 3D with Three.js.',
  'process.s2.date': 'Mar 2026',
  'process.s2.title': 'First real work',
  'process.s2.desc':
    'The corporate site of Altuncu Premium Thermal Hotel and a live monitoring dashboard for a TÜBİTAK application.',
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
  'stats.s2': 'Players reached by Almost There',
  'stats.s3': 'Languages in Cypilan',
  'stats.s4': 'BTK Akademi certificates',

  'contact.label': '(06) Contact',
  'contact.title.a': 'Internship, freelance or a question?',
  'contact.title.b': 'Let’s build something <em>together</em>.',
  'contact.text':
    'I’m open to internships and freelance work. Write to me and I’ll get back to you soon.',
  'contact.cta': 'Send an email',
  'contact.cv': 'Download my CV',
  'contact.social': 'Profiles',

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
  'meta.title': 'Mehmet Baysal — Web Geliştirici & Oyun Geliştirme',
  'meta.description':
    'Web geliştirici ve Web Tasarımı ve Kodlama öğrencisi Mehmet Baysal’ın portfolyosu: yayındaki bir otel sitesi, itch.io’da bir korku oyunu, beş dilli bir ilan platformu ve işletme yazılımları.',

  'skip': 'İçeriğe geç',
  'loader.label': 'Portfolyo yükleniyor',

  'nav.work': 'İşler',
  'nav.about': 'Hakkımda',
  'nav.services': 'Yetenekler',
  'nav.experience': 'Deneyim',
  'nav.contact': 'İletişim',
  'nav.menu': 'Menü',
  'nav.close': 'Kapat',
  'header.status': 'Staj ve freelance işlere açığım',

  'hero.eyebrow': 'Web Geliştirici · Oyun Geliştirme',
  'hero.title.a': 'Mehmet',
  'hero.title.b': '<em>Baysal</em>',
  'hero.intro':
    'İşlerini fikirden yayına kendi taşıyan bir Web Tasarımı ve Kodlama öğrencisiyim: bir otelin yayındaki web sitesinden itch.io’da yayınlanan bir korku oyununa kadar.',
  'hero.location': 'Antalya, Türkiye — uzaktan çalışmaya açık',
  'hero.scroll': 'Keşfetmek için kaydır',

  'about.label': '(01) Hakkımda',
  'about.text':
    'Kodlamayı öğrenmenin en hızlı yolunun, insanların gerçekten kullanabileceği bir şey yapmak olduğuna inanıyorum. Bu yüzden buradaki her proje <em>çalışsın</em> diye yapıldı: bitirilebilen bir oyun, ilan verilebilen bir pazaryeri, tartışılabilen bir forum.',
  'about.side':
    'Burdur Mehmet Akif Ersoy Üniversitesi Web Tasarımı ve Kodlama 2. sınıf öğrencisiyim. Otelcilikte geçen yıllar bana ekip çalışmasını ve iletişimi kazandırdı; şimdi gerçek kullanıcıya dokunan işlerde gelişebileceğim bir staj arıyorum.',
  'about.cta': 'Bana ulaş',
  'about.photo': 'Mehmet Baysal’ın portresi',
  'about.map':
    'Bu yazının yanındaki harita gerçek: Aralık 2025’ten bu yana her günün commit sayısı; 49 hafta, dokuz projede 848 commit.',

  'work.label': '(02) Öne çıkan işler',
  'work.title': 'Öne çıkan <em>işler</em>',
  'work.p1.title': 'Almost There',
  'work.p1.type': 'Oyun · Three.js',
  'work.p1.desc':
    'PS1 tarzı psikolojik korku oyunu: tek bir gecenin etrafında kendini yeniden düzenleyen bir ev, beş gün ve tek bir yol.',
  'work.p1.h1': 'itch.io’da tarayıcı ve Windows sürümüyle yayında; yaklaşık 100 oyuncuya ulaştı',
  'work.p1.h2': 'Elle yazılmış PS1 shader’ı: vertex snapping, 360p çizim, dithering',
  'work.p1.h3':
    'Yaklaşık 40 dakika; kodla çizilen dokular ve Web Audio ile prosedürel ses, hepsi tek HTML dosyasında',
  'work.p1.period': '19 Eki – 1 Kas 2026',
  'work.p1.cta': 'itch.io’da oyna',
  'work.p1.alt': 'Almost There başlık ekranı',
  'work.p2.title': 'Cypilan',
  'work.p2.type': 'İlan platformu · Full-stack',
  'work.p2.desc':
    'Kıbrıs için dijital ilan ve pazar yeri platformu; mimarisi sıfırdan tasarlanıp geliştirildi.',
  'work.p2.h1': 'Türkçe, İngilizce, Yunanca, Rusça ve Farsça; sağdan sola dahil',
  'work.p2.h2': 'Çevirileri senkronize eden ve eksik metinleri tarayan npm betikleri',
  'work.p2.h3': 'Emlak, vasıta, iş, hizmet ve ikinci el kategorileri',
  'work.p2.period': '8 Ağu – 26 Eki 2026',
  'work.p2.cta': 'GitHub’da incele',
  'work.p2.alt': 'Cypilan ana sayfası ve ilan kategorileri',
  'work.p3.title': 'Dağıtım Takip Sistemi',
  'work.p3.type': 'İşletme yazılımı · Full-stack',
  'work.p3.desc':
    'Oteller ve işletmeler için ürün dağıtım ve stok takip sistemi: tezgâhta hızlı kayıt, kuralları sistem uygular.',
  'work.p3.h1': 'Rol tabanlı hesaplar: yönetici, görevli ve kök hesap',
  'work.p3.h2': 'Sunucu tarafında zorunlu tutulan 4 saatlik alım kuralı ve canlı geri sayım',
  'work.p3.h3':
    'Stok yönetimi, özel onay akışı, gün sonu raporuyla dönem kapanışı ve Excel’e aktarma',
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
  'work.p5.h3': 'Sunucusuz: tamamen tarayıcıda çalışan, mobil uyumlu Bootstrap arayüzü',
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
  'marquee.e': 'Oyun Geliştirme',

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
    'Three.js sahneleri, elle yazılmış GLSL shader’lar, Web Audio API ile prosedürel ses ve Electron ile masaüstü sürümleri.',
  'services.s4.title': 'Araçlar & entegrasyonlar',
  'services.s4.desc':
    'Her projede Git ve GitHub, GitHub Pages ile yayın, Gemini API özellikleri, Chart.js panelleri ve beş dilli arayüzler.',

  'experience.label': '(04) Deneyim',
  'experience.title': 'Deneyim & <em>eğitim</em>',
  'experience.group.web': 'Web işleri',
  'experience.group.hotel': 'Turizm ve otelcilik',
  'experience.group.hotel.note':
    'Ekip çalışmasını ve insanlarla iletişim alışkanlığını, ilk commit’imden çok önce burada kazandım.',
  'experience.e1.date': 'Mar 2026',
  'experience.e1.role': 'Serbest Web Geliştirici',
  'experience.e1.place': 'Altuncu Premium Termal Otel',
  'experience.e1.desc':
    'Otelin kurumsal web sitesini framework kullanmadan HTML, CSS ve JavaScript ile sıfırdan geliştirip yayına aldım. Ortak bileşenler için Node.js betiği, IntersectionObserver ile görsel optimizasyonu ve iletişim formundan otel yönetimine webhook ile anlık WhatsApp bildirimi.',
  'experience.e2.date': 'Serbest',
  'experience.e2.role': 'Google İşletme Profili & QR menü',
  'experience.e2.place': 'Altuncu Premium Termal Otel · Dark Blue Cafe',
  'experience.e2.desc':
    'Altuncu Premium Termal Otel ve Manisa’daki Dark Blue Cafe için Google İşletme Profili desteği; Altuncu Cafe ve Dark Blue Cafe için QR menüler.',
  'experience.e3.date': 'Nis – Tem 2024',
  'experience.e3.role': 'Minibar Görevlisi',
  'experience.e3.place': 'Liberty Lara, Antalya · tam zamanlı',
  'experience.e4.date': 'Ağu 2021 – Eyl 2023',
  'experience.e4.role': 'Garson, Belboy ve Komi',
  'experience.e4.place': 'İskele Park Termal, Armutlu/Yalova',
  'experience.edu.label': 'Eğitim',
  'experience.edu.school': 'Burdur Mehmet Akif Ersoy Üniversitesi',
  'experience.edu.program': 'Web Tasarımı ve Kodlama · önlisans, 2. sınıf',
  'experience.edu.date': '2025 – 2027',
  'experience.cert.label': 'Sertifikalar · BTK Akademi',
  'experience.cert.c1': 'Yapay Zekâ Dünyasına Giriş',
  'experience.cert.c2': 'Dijital Mühendislik ve Dijital Dönüşüm',
  'experience.cert.c3': 'Bilişim Hukuku',
  'experience.cert.c4': 'Proje ve Risk Yönetimi',
  'experience.cert.c5': 'Girişimcilikte Sunum Teknikleri ve İletişim Yönetimi',
  'experience.cert.c6': 'Sosyal Medya Uzmanlığına Giriş',
  'experience.cert.c7': 'İngilizce B2',
  'experience.lang.label': 'Diller',
  'experience.lang.tr': 'Türkçe — anadil',
  'experience.lang.en': 'İngilizce — B2',

  'process.label': '(05) Yolculuk',
  'process.title': 'Bir yılda <em>dokuz proje</em>',
  'process.s1.date': 'Ara 2025',
  'process.s1.title': 'İlk adımlar',
  'process.s1.desc':
    'PHP ile oturum yönetimi, framework’süz JavaScript ile bir sepet ve Three.js ile ilk 3D denemesi.',
  'process.s2.date': 'Mar 2026',
  'process.s2.title': 'İlk gerçek işler',
  'process.s2.desc':
    'Altuncu Premium Termal Otel’in kurumsal sitesi ve TÜBİTAK başvurusu için canlı bir izleme paneli.',
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
  'stats.s2': 'Almost There’ın ulaştığı oyuncu',
  'stats.s3': 'Cypilan’daki dil',
  'stats.s4': 'BTK Akademi sertifikası',

  'contact.label': '(06) İletişim',
  'contact.title.a': 'Staj, freelance ya da bir soru?',
  'contact.title.b': 'Birlikte bir şey <em>üretelim</em>.',
  'contact.text': 'Staj ve freelance işlere açığım. Bana yaz, en kısa sürede dönüş yaparım.',
  'contact.cta': 'E-posta gönder',
  'contact.cv': 'CV’mi indir',
  'contact.social': 'Profiller',

  'footer.rights': 'Tüm hakları saklıdır.',
  'footer.time': 'Yerel saat',
  'footer.top': 'Başa dön',
  'footer.credit': 'Tasarım & kodlama: Mehmet Baysal',
  'fallback': 'Tarayıcın WebGL desteklemiyor — hafif sürümün keyfini çıkar.',
  'cursor.view': 'İncele',
  'cursor.mail': 'Merhaba',
};

export const dict: Record<Lang, Dict> = { en, tr };
