# Mehmet Baysal — Portfolyo

Web tasarımı ve kodlama öğrencisi Mehmet Baysal'ın kişisel portfolyosu. Kaydırdıkça şekil değiştiren gerçek zamanlı bir 3D sahne üzerine kurulu, iki dilli (TR / EN).
Personal portfolio of Mehmet Baysal, a web design and coding student, built around a real-time 3D scene that transforms as you scroll.

**Canlı site:** https://baysai.github.io/baysal-portfolio/

## Sitedeki projeler

| Proje                                                                          | Ne                                                   | Teknolojiler                         |
| ------------------------------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------ |
| [Almost There](https://github.com/baysaI/almost-there)                         | PS1 tarzı psikolojik korku oyunu, tarayıcıda oynanır | Three.js, GLSL, Electron             |
| [Cypilan](https://github.com/baysaI/cypilan)                                   | Kıbrıs için beş dilli ilan pazaryeri                 | Node.js, Express, EJS, SQLite        |
| [Okuryazmaz](https://github.com/baysaI/okuryazmaz)                             | Edebiyat ve kitap forumu                             | Node.js, Express, SQLite, Gemini API |
| [Altuncu Premium](https://github.com/baysaI/altuncu-premium)                   | Termal otel kurumsal web sitesi                      | HTML, CSS, JavaScript                |
| [Boru Hattı Analiz Paneli](https://github.com/baysaI/BoruHattiAnalizKodlamasi) | Sensör izleme paneli                                 | Bootstrap, jQuery, Chart.js          |
| [Sigara Takip Sistemi](https://github.com/baysaI/sigara-takip-sistemi)         | Rol yapma sunucusu için dağıtım takip paneli         | Node.js, Express, SQLite             |
| [Oiia Cat](https://github.com/baysaI/oiia-cat)                                 | 3D sanal evcil hayvan                                | Three.js                             |
| [Munch](https://github.com/baysaI/vanilla-js-shopping-cart)                    | Atıştırmalık mağazası vitrini ve sepet               | Vanilla JavaScript                   |
| [PHP Login Template](https://github.com/baysaI/simple-php-auth)                | Modernleştirilmiş PHP giriş şablonu                  | PHP, MySQL                           |

![Preview](public/og.jpg)

## Öne çıkanlar · Highlights

- **Sıvı chrome heykel:** GPU'da simplex noise ile deforme edilen icosphere. Normaller her vertex'te yeniden hesaplanır, prosedürel stüdyo ışıklarını (PMREM) yansıtır. Fare yüzeye değdiğinde halka dalgalar oluşur.
- **Parçacık morph sistemi:** 26.000'e kadar parçacık 8 formasyon arasında (toz, kabuk, monolit, yörünge, açık kitap, dalga alanı, düğüm, halka) kaydırmayla birebir senkron dönüşür. Her öne çıkan projenin kendi formu var.
- **Scroll director:** Her bölüm canlı ScrollTrigger konumlarına bağlı keyframe'lerle 3D sahne durumuna eşlenir; easing ve sönümleme ile sinematik bir his verir.
- **Post-processing:** Bloom, kaydırma hızına duyarlı kromatik sapma, vinyet, film greni.
- **Etkileşim:** Lenis smooth scroll, pinlenmiş proje sahnesi, yatay süreç akışı, hıza duyarlı marquee, manyetik butonlar, özel imleç, kelime kelime metin animasyonları.
- **Performans:** three.js ayrı chunk olarak preloader sırasında yüklenir, cihaz seviyesine göre kalite (high / medium / low), FPS düşerse otomatik çözünürlük azaltma, ekran kapalıyken render durdurma.
- **Erişilebilirlik:** `prefers-reduced-motion` desteği, klavye odak stilleri, skip link, WebGL yoksa CSS chrome küre yedeği, JavaScript olmadan da okunabilen HTML.
- **SEO:** İçerik build sırasında HTML'e gömülür, Open Graph görseli, JSON-LD.

## Teknolojiler · Stack

Vite · TypeScript · Three.js · GLSL · GSAP (ScrollTrigger) · Lenis · Fontsource (Inter Tight, Instrument Serif, Geist Mono)

## Başlangıç · Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ klasörüne üretim build'i
npm run preview    # build'i yerelde önizle
npm run typecheck
npm run format
```

Node.js 20+ önerilir.

## İçeriği düzenleme · Editing content

Tüm içerik tek yerde toplanmıştır — HTML'e dokunmanız gerekmez:

| Dosya                   | Ne içerir                                                                     |
| ----------------------- | ----------------------------------------------------------------------------- |
| `src/content/site.ts`   | İsim, e-posta, konum, sosyal linkler, projeler, diğer projeler, istatistikler |
| `src/content/i18n.ts`   | Tüm metinler (EN + TR). `<em>` ile vurgulu italik kelimeler eklenebilir       |
| `src/styles/tokens.css` | Renkler, tipografi ölçeği, boşluklar, animasyon eğrileri                      |
| `src/webgl/shapes.ts`   | Parçacık formasyonları (her proje bir formasyonla eşleşir)                    |
| `src/webgl/director.ts` | Hangi bölümde 3D sahnenin nasıl görüneceği                                    |

Yeni bir proje eklemek için `site.ts` içindeki `archive` listesine bir satır, `i18n.ts` içine de TR ve EN açıklamasını eklemek yeterli.

Dil seçimi sırasıyla `?lang=tr` parametresi → kayıtlı tercih → tarayıcı dili ile belirlenir.

## Mimari · Architecture

```
src/
  app.ts              boot sırası: metin → scroll → arayüz → 3D → preloader → intro
  content/            site verisi, çeviriler, build-time HTML parçaları
  core/               cihaz algılama, Lenis + ScrollTrigger, pointer, performans
  ui/                 header, preloader, imleç, reveal'lar, iş/süreç/marquee bölümleri
  webgl/              stage, ortam ışığı, heykel, parçacıklar, post-processing, director
build/html-content.ts Vite eklentisi: metinleri ve tekrarlanan blokları HTML'e gömer
```

## Yayına alma · Deployment

`main` dalına her push'ta `.github/workflows/deploy.yml` siteyi GitHub Pages'e yayınlar.
İlk seferde repo ayarlarından **Settings → Pages → Source: GitHub Actions** seçilmelidir.
`vite.config.ts` göreli `base: './'` kullandığı için build herhangi bir statik hosting'de (Netlify, Vercel, Cloudflare Pages) de çalışır.

## Lisans

Kod: MIT. Simplex noise: Ashima Arts (MIT, bkz. `THIRD_PARTY_NOTICES.md`). Fontlar: SIL Open Font License.
