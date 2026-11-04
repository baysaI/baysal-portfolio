export const languages = ['en', 'tr'] as const;
export type Lang = (typeof languages)[number];

const en = {
  'meta.title': 'Mehmet Baysal — Web Design & Coding Student',
  'meta.description':
    'Portfolio of Mehmet Baysal, a web design and coding student: a browser horror game, a five-language listings platform, a book forum and more.',

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
    'I’m a web design and coding student who learns by shipping real projects: a 3D horror game that runs in the browser, a five-language listings platform, a book forum with AI features.',
  'hero.location': 'Türkiye — open to remote work',
  'hero.scroll': 'Scroll to explore',

  'about.label': '(01) About',
  'about.text':
    'I believe the fastest way to learn code is to build something people can actually use. That’s why every project here was made to <em>work</em>: a game you can finish, a marketplace you can post on, a forum you can argue in.',
  'about.side':
    'Right now I’m going deeper into Node.js back-ends, real-time 3D with Three.js and fast, accessible front-ends.',
  'about.cta': 'Get in touch',

  'work.label': '(02) Selected work',
  'work.title': 'Selected <em>work</em>',
  'work.p1.title': 'Almost There',
  'work.p1.type': 'Browser game · PS1-style horror',
  'work.p1.desc':
    'A psychological horror game in a single HTML file. Hand-written PS1 shader, textures drawn in code, five in-game days, English and Turkish, plus a Windows build with Electron.',
  'work.p1.cta': 'Play in the browser',
  'work.p2.title': 'Cypilan',
  'work.p2.type': 'Listings marketplace · Full-stack',
  'work.p2.desc':
    'A digital marketplace for Cyprus: real estate, vehicles, second-hand, jobs and services. Five languages including right-to-left Farsi, with scripts that keep every translation in sync.',
  'work.p2.cta': 'View on GitHub',
  'work.p3.title': 'Okuryazmaz',
  'work.p3.type': 'Book forum · Full-stack',
  'work.p3.desc':
    'A new-generation literature and book forum. JWT authentication, rate limiting and security headers, with optional AI features powered by the Gemini API.',
  'work.p3.cta': 'View on GitHub',
  'work.p4.title': 'Altuncu Premium',
  'work.p4.type': 'Hotel website · Front-end',
  'work.p4.desc':
    'Corporate website for a thermal hotel in Armutlu, Yalova: rooms, thermal pools, spa, gallery and contact across seven responsive pages.',
  'work.p4.cta': 'View on GitHub',

  'others.label': '(03) More projects',
  'others.title': 'Smaller builds, <em>real</em> lessons',
  'others.cta': 'GitHub',
  'others.o1.desc':
    'Monitoring dashboard that simulates pipeline sensors, with live charts, alerts and an optional AI assistant.',
  'others.o2.desc':
    'Distribution tracker for a role-play server: role-based accounts, live countdowns and a four-hour rule enforced on the server.',
  'others.o3.desc':
    'A 3D virtual pet: feed it, play with it and watch its hunger and happiness change. Progress is saved in the browser.',
  'others.o4.desc':
    'Storefront for an imported snack shop in vanilla JavaScript, with a sliding cart that survives page reloads.',
  'others.o5.desc':
    'A classic PHP login template (original by Bharathi Kannan N) rebuilt with a modern, responsive interface.',

  'marquee.a': 'Web Design',
  'marquee.b': 'Front-end',
  'marquee.c': 'Three.js',
  'marquee.d': 'Node.js',

  'services.label': '(04) Skills',
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

  'process.label': '(05) Approach',
  'process.title': 'From idea to <em>live link</em>',
  'process.s1.title': 'Idea',
  'process.s1.desc':
    'I start with the problem: who will use it and what do they need? A quick sketch and a short feature list come first.',
  'process.s2.title': 'Design',
  'process.s2.desc': 'Colours, type and page flow, with the mobile layout planned from the start.',
  'process.s3.title': 'Code',
  'process.s3.desc':
    'Small steps and frequent commits. Security and performance are part of the work, not an afterthought.',
  'process.s4.title': 'Ship',
  'process.s4.desc':
    'Pushed to GitHub, put online, improved with feedback and always documented with a README.',

  'stats.s1': 'Public projects',
  'stats.s2': 'Commits across projects',
  'stats.s3': 'Technologies used',
  'stats.s4': 'Languages in Cypilan',

  'contact.label': '(06) Contact',
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
    'Web tasarımı ve kodlama öğrencisi Mehmet Baysal’ın portfolyosu: tarayıcıda çalışan bir korku oyunu, beş dilli bir ilan platformu, bir kitap forumu ve daha fazlası.',

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
    'Gerçek projeler yaparak öğrenen bir web tasarımı ve kodlama öğrencisiyim: tarayıcıda çalışan 3D bir korku oyunu, beş dilli bir ilan platformu, yapay zekâ destekli bir kitap forumu.',
  'hero.location': 'Türkiye — uzaktan çalışmaya açık',
  'hero.scroll': 'Keşfetmek için kaydır',

  'about.label': '(01) Hakkımda',
  'about.text':
    'Kodlamayı öğrenmenin en hızlı yolunun, insanların gerçekten kullanabileceği bir şey yapmak olduğuna inanıyorum. Bu yüzden buradaki her proje <em>çalışsın</em> diye yapıldı: bitirilebilen bir oyun, ilan verilebilen bir pazaryeri, tartışılabilen bir forum.',
  'about.side':
    'Şu sıralar Node.js ile back-end, Three.js ile gerçek zamanlı 3D ve hızlı, erişilebilir arayüzler üzerine yoğunlaşıyorum.',
  'about.cta': 'Bana ulaş',

  'work.label': '(02) Öne çıkan işler',
  'work.title': 'Öne çıkan <em>işler</em>',
  'work.p1.title': 'Almost There',
  'work.p1.type': 'Tarayıcı oyunu · PS1 tarzı korku',
  'work.p1.desc':
    'Tek bir HTML dosyasında çalışan psikolojik korku oyunu. Elle yazılmış PS1 shader’ı, kodla çizilen dokular, beş oyun günü, Türkçe ve İngilizce dil desteği ve Electron ile Windows sürümü.',
  'work.p1.cta': 'Tarayıcıda oyna',
  'work.p2.title': 'Cypilan',
  'work.p2.type': 'İlan pazaryeri · Full-stack',
  'work.p2.desc':
    'Kıbrıs için dijital ilan pazaryeri: emlak, vasıta, ikinci el, iş ilanları ve hizmetler. Sağdan sola Farsça dahil beş dil ve tüm çevirileri senkron tutan betikler.',
  'work.p2.cta': 'GitHub’da incele',
  'work.p3.title': 'Okuryazmaz',
  'work.p3.type': 'Kitap forumu · Full-stack',
  'work.p3.desc':
    'Yeni nesil edebiyat ve kitap forumu. JWT ile kimlik doğrulama, istek sınırlama ve güvenlik başlıkları; Gemini API ile isteğe bağlı yapay zekâ özellikleri.',
  'work.p3.cta': 'GitHub’da incele',
  'work.p4.title': 'Altuncu Premium',
  'work.p4.type': 'Otel web sitesi · Front-end',
  'work.p4.desc':
    'Yalova Armutlu’daki bir termal otelin kurumsal web sitesi: odalar, termal havuzlar, spa, galeri ve iletişim; yedi duyarlı sayfa.',
  'work.p4.cta': 'GitHub’da incele',

  'others.label': '(03) Diğer projeler',
  'others.title': 'Küçük projeler, <em>gerçek</em> dersler',
  'others.cta': 'GitHub',
  'others.o1.desc':
    'Boru hattı sensörlerini simüle eden izleme paneli: canlı grafikler, uyarılar ve isteğe bağlı yapay zekâ asistanı.',
  'others.o2.desc':
    'Bir rol yapma sunucusu için dağıtım takip paneli: rol tabanlı hesaplar, canlı geri sayım ve sunucuda zorunlu tutulan dört saat kuralı.',
  'others.o3.desc':
    '3D sanal evcil hayvan: besle, oyna, açlık ve mutluluk değerlerini takip et. İlerleme tarayıcıda saklanır.',
  'others.o4.desc':
    'İthal atıştırmalık mağazası için framework’süz JavaScript ile yazılmış vitrin; sayfa yenilense de kaybolmayan kayan sepet.',
  'others.o5.desc':
    'Klasik bir PHP giriş şablonunun (orijinali Bharathi Kannan N’ye ait) modern ve duyarlı arayüzle yenilenmiş hali.',

  'marquee.a': 'Web Tasarımı',
  'marquee.b': 'Front-end',
  'marquee.c': 'Three.js',
  'marquee.d': 'Node.js',

  'services.label': '(04) Yetenekler',
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

  'process.label': '(05) Yaklaşım',
  'process.title': 'Fikirden <em>canlı linke</em>',
  'process.s1.title': 'Fikir',
  'process.s1.desc':
    'Önce problemi anlıyorum: kim kullanacak, neye ihtiyacı var? Kısa bir eskiz ve özellik listesiyle başlıyorum.',
  'process.s2.title': 'Tasarım',
  'process.s2.desc': 'Renkler, tipografi ve sayfa akışı; mobil görünümü en baştan planlıyorum.',
  'process.s3.title': 'Kodlama',
  'process.s3.desc':
    'Küçük adımlar ve sık commit. Güvenlik ve performans sona bırakılmaz, işin parçasıdır.',
  'process.s4.title': 'Yayın',
  'process.s4.desc':
    'GitHub’a yüklenir, yayına alınır, geri bildirimle iyileştirilir ve her zaman bir README ile belgelenir.',

  'stats.s1': 'Herkese açık proje',
  'stats.s2': 'Projelerdeki commit',
  'stats.s3': 'Kullanılan teknoloji',
  'stats.s4': 'Cypilan’daki dil',

  'contact.label': '(06) İletişim',
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
