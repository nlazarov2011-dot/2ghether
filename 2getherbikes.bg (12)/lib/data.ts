import { Product, ServiceItem, LegalContent, TourPackage } from '../types';

export const COMPANY_INFO = {
  name: "\"Евро Код 1\" ЕООД",
  eik: "203949089",
  address: "Варна, ул. Братя Шкорпил 12",
  phone: "088 285 8774",
  phoneBooking: "+359 88 831 0500",
  email: "info@2getherbikes.bg",
  storeHours: "10:30 – 19:00",
  supportHours: "Пон-Пет 9:30 – 18:00",
  location: "бул. 8-ми Приморски Полк 125"
};

export const DELIVERY_RULES = {
  partner: "ЕКОНТ",
  costOffice: 7.50,
  costAddress: 12.00,
  freeThreshold: 49.90,
  deliveryDays: "3-5"
};

export const SERVICES: ServiceItem[] = [
  { id: 's1', name: 'Смяна на жило', price: 20, description: 'Демонтаж на старо жило/броня и монтаж на нови.' },
  { id: 's2', name: 'Центроване на капла', price: 15, description: 'Прецизно изправяне на радиални и аксиални отклонения.' },
  { id: 's3', name: 'Пълна профилактика', price: 60, description: 'Цялостно разглобяване, почистване и смазване на велосипеда.' },
  { id: 's4', name: 'Смяна на курбели', price: 25, description: 'Включва проверка на средното движение.' },
  { id: 's5', name: 'Обезвъздушаване на хидр. спирачка', price: 25, description: 'На спирачка. Включва спирачна течност.' },
  { id: 's6', name: 'Internal Routing (Вътрешно окабеляване)', price: 35, description: 'Прекарване на жило/броня през рамката.' },
];

export const PRODUCTS: Product[] = [
  // BIKES
  {
    id: "orbea-alma-h10-eagle",
    slug: "orbea-alma-h10-eagle-ice-green",
    brand: "Orbea",
    category: "Планински",
    name: "Orbea Alma H10-EAGLE (Ice Green - Ocean)",
    price: 3059.00,
    inStock: true,
    sizes: ["M", "L", "XL"],
    description: "Alma H10 е създаден за скорост. С лека хидроформована алуминиева рамка, 12-скоростна система SRAM NX Eagle и RockShox въздушна вилка, този велосипед е готов както за състезания, така и за дълги планински преходи. Включва и Dropper колче за по-голям контрол при спускане.",
    images: [
      "https://2getherbikes.bg/image/cache/catalog/1-produkti/Velosipedi/Planinski%20velosipedi/orbea/orbea%20alma%20h10/orbea-alma-h10-eagle-l-ice-green-ocean%20(1)-1000x1000.jpg"
    ],
    specs: {
      "Рамка": "Orbea Alma Hydro Alloy, Boost 12x148, BSA BB, Internal cable routing",
      "Вилка": "RockShox Judy Silver TK Remote Solo Air 100 QR15x110 Boost",
      "Чашки": "Acros Alloy 1-1/8 - 1-1/2\" Integrated",
      "Курбели": "SRAM Stylo 6K Eagle Dub Boost 32t Steel",
      "Команди": "SRAM NX Eagle",
      "Касета": "SRAM PG-1230 Eagle 11-50t 12-Speed",
      "Заден дерайльор": "SRAM NX Eagle",
      "Верига": "SRAM NX Eagle 12-Speed",
      "Кормило": "Alloy, 31.8mm, Flat, 740mm, Sweep 9",
      "Лапа": "Alloy forged, -7º",
      "Спирачки": "Shimano MT201 Hydraulic Disc",
      "Капли": "Alloy, Tubeless, 25c, 32H",
      "Гуми": "Maxxis Ikon 2.20\" FB 60 TPI Dual",
      "Колче за седалка": "OC Mountain Control MC20, 27.2mm, Dropper, Travel 80mm",
      "Команда за колче": "OC Squidlock MP20-D Dropper Remote",
      "Седалка": "Selle Italia Model X FecAlloy Rail 145x248mm",
      "Заключване (Remote)": "Rock Shox PopLoc"
    }
  },
  {
    id: "orbea-oiz-m-ltd-xx",
    slug: "orbea-oiz-m-ltd-xx",
    brand: "Orbea",
    category: "Планински",
    name: "Orbea Oiz M-LTD XX (Digital Lavender)",
    price: 16639.00,
    inStock: true,
    sizes: ["M", "L", "XL"],
    description: "Върхът на XC еволюцията. Oiz M-LTD не е просто лек; това е 120-милиметрова машина за Световната купа. Оборудван с най-леката електронна група на пазара (Sram XX SL) и върхово окачване Fox Factory Kashima, този велосипед е създаден за подиуми.",
    images: [
      "https://2getherbikes.bg/image/cache/catalog/1-produkti/Velosipedi/Planinski%20velosipedi/orbea/orbea%20oiz/orbea-oiz-m-ltd-xx-m-digital-lavender-carbon-black-mouse-grey-1000x1000.jpg"
    ],
    specs: {
      "Рамка": "Orbea Oiz Carbon OMX, Fiberlink, Boost, BSA, SIC, UFO, I-line shock",
      "Шок": "Fox i-line DPS Factory 120mm Remote Push-Unlock Evol Kashima custom tune 190x45mm",
      "Вилка": "Fox 34 Float SC Factory 120 FIT4 Remote-Adj Push-Unlock QR15x110",
      "Чашки": "Alloy 1-1/2\", Black Oxidated Bearing",
      "Курбели": "Sram XX SL Eagle Dub Black 34t",
      "Команди": "Sram AXS Pod Ultimate",
      "Касета": "Sram XX-1299 Eagle SL 10-52t 12-Speed",
      "Заден дерайльор": "Sram XX Eagle SL AXS",
      "Верига": "Sram XX-SL Eagle 12-Speed",
      "Кормило": "OC MP10 Mountain Performance Carbon, Width 760, Sweep 9",
      "Лапа": "OC Mountain Performance MP10 Alu SL, -10º",
      "Спирачки": "Sram Level Ultimate Carbon 2 piston Hydraulic Disc",
      "Капли": "Oquo Mountain Performance MP30LTD",
      "Гуми": "Maxxis Rekon Race 2.40\" WT 120 TPI Exo TLR",
      "Предна ос": "Fox Kabolt Boost",
      "Колче за седалка": "Fox Transfer SL Factory Kashima Dropper 31.6",
      "Седалка": "Selle Italia SLR Boost Fill Carbon Rail Ø7x9 mm",
      "Дистанционно (Lockout)": "OC Squidlock MP20 Remote, Dropper, Suspension 3 Pos"
    }
  },
  {
    id: "santa-cruz-v10-8-cc",
    slug: "santa-cruz-v10-8-cc-s-kit-mx-md",
    brand: "Santa Cruz",
    category: "Планински",
    name: "SANTA CRUZ V10 8 CC S-kit MX MD Gloss Black Sparkle",
    price: 15399.00,
    inStock: true,
    sizes: ["MD", "LG", "XL"],
    description: "Легендарен Downhill велосипед, създаден за най-тежките трасета в света. VPP окачване, CC карбонова рамка и безкомпромисна окомплектовка S-kit. Тази машина е готова за старт веднага щом я извадите от кашона.",
    images: [
      "https://2getherbikes.bg/image/cache/catalog/1-produkti/Velosipedi/Planinski%20velosipedi/santa%20cruz%20v10/santa-cruz-v10-8-cc-s-kit-mx-md-gloss-black-sparkle-1000x1000.jpg",
      "https://2getherbikes.bg/image/cache/catalog/1-produkti/Velosipedi/Planinski%20velosipedi/santa%20cruz%20v10/santa-cruz-v10-8-cc-mx-sm-frame-set-gloss-black-sparkle%20(2)-1000x1000.jpg",
      "https://2getherbikes.bg/image/cache/catalog/1-produkti/Velosipedi/Planinski%20velosipedi/santa%20cruz%20v10/santa-cruz-v10-8-cc-mx-sm-frame-set-gloss-black-sparkle%20(3)-1000x1000.jpg",
      "https://2getherbikes.bg/image/cache/catalog/1-produkti/Velosipedi/Planinski%20velosipedi/santa%20cruz%20v10/santa-cruz-v10-8-cc-mx-sm-frame-set-gloss-black-sparkle%20(5)-1000x1000.jpg"
    ],
    specs: {
      "Тегло": "16.69 kg",
      "Материал на рамката": "Carbon CC",
      "Ход на рамката": "208mm VPP™",
      "Вилка": "RockShox BoXXer Base, 200mm",
      "Шок": "RockShox Vivid Select+ Coil",
      "Размер гуми": "MX (Mixed: 29 предна / 27.5 задна)",
      "Спирачки": "SRAM Maven Bronze",
      "Скоростна с-ма": "SRAM GX DH, 7spd",
      "Курбели": "SRAM Descendant DH, 165mm, 36t",
      "Касета": "SRAM PG720 DH, 11-25t",
      "Верига": "SRAM PC1110, 11spd",
      "Кормило": "OneUp Aluminum Bar",
      "Лапа": "OneUp Direct Mount Stem",
      "Главини": "Industry Nine 1/1 (20x110 Boost / 12x157 HG)",
      "Капли": "Reserve 30|HD AL 6069 / Raceface ARC 30 HD",
      "Предна Гума": "Maxxis Minion DHR II / Assegai 29x2.5 (DH Casing)",
      "Задна Гума": "Maxxis Minion DHR II 27.5x2.5 (DH Casing)",
      "Средно движение": "SRAM DUB 83mm Threaded BB",
      "Чашки": "Cane Creek 50 IS41 Headset",
      "Колче за седалка": "RaceFace Chester, 31.6",
      "Седалка": "Fizik Alpaca Gravita X5"
    }
  },
  {
    id: "giant-talon-3",
    slug: "giant-talon-3-metallic-black",
    brand: "Giant",
    category: "Планински",
    name: "Giant Talon 3 (Metallic Black)",
    price: 1299.00,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    description: "Представяме ви Talon 3 на световния лидер GIANT. С лека и издръжлива алуминиева рамка ALUXX и класически хардтейл дизайн, този велосипед е идеалният избор за XC терени и дълги планински преходи. Балансирано управление с 29-инчови капли и надеждни хидравлични спирачки.",
    images: [
      "https://2getherbikes.bg/image/cache/catalog/1-produkti/Velosipedi/Planinski%20velosipedi/Giant/5849_Talon3GEM%20%D0%BC%D0%B5%D1%82%D0%B0%D0%BB%D0%B8%D0%BA%20%D1%87%D0%B5%D1%80%D0%B5%D0%BD%202-1000x1000.jpg"
    ],
    specs: {
      "Рамка": "ALUXX-Grade Aluminium, disc. Compatible with fenders & kickstand",
      "Вилка": "SR Suntour XCE coil spring, 100mm travel (80mm XS)",
      "Цвят": "Metallic Black",
      "Кормило": "Giant Connect Trail, 780x31.8",
      "Лапа": "Giant Sport, 7-degree",
      "Колче за седалка": "Giant Sport, 30.9",
      "Седалка": "Giant custom",
      "Педали": "MTB caged",
      "Команди": "Shimano SL-M315",
      "Преден дерайльор": "Shimano M315",
      "Заден дерайльор": "Shimano Tourney",
      "Спирачки": "Tektro TKD 143, hydraulic",
      "Спирачни лостчета": "Tektro TKD 143, hydraulic",
      "Касета": "Shimano MF-TZ500, 14x28",
      "Верига": "KMC Z7",
      "Курбели": "ProWheel forged, 22/36",
      "Средно движение": "Cartridge",
      "Шини": "Giant GX03V 29, alloy, double wall, 21mm inner width",
      "Главини": "Giant Tracker Sport QR, loose ball",
      "Гуми": "Maxxis Ikon 29x2.2, wire bead"
    }
  },
  {
    id: "orbea-orca-m30-slate-blue",
    slug: "orbea-orca-m30-slate-blue-halo-silver",
    brand: "Orbea",
    category: "Шосейни",
    name: "Orbea Orca M30 (Slate Blue - Halo Silver)",
    price: 5199.00,
    inStock: true,
    sizes: ["51", "53", "55", "57"],
    description: "Най-лекият и способен шосеен велосипед в класа си. Новата Orbea Orca M30 разполага с OMR 2024 карбонова рамка с пълна интеграция на кабелите (ICR) за безупречна аеродинамика. Оборудван с надеждната 12-скоростна система Shimano 105, този велосипед е създаден за дълги изкачвания и скоростни отсечки.",
    images: [
      "https://2getherbikes.bg/image/cache/catalog/1-produkti/Velosipedi/Planinski%20velosipedi/orbea/orbea%20orca%20m30/orbea-orca-m30-53-slate-blue-halo-silver-1000x1000.jpg"
    ],
    specs: {
      "Рамка": "Orbea Orca carbon OMR 2024, monocoque, internal cable routing, powermeter compatible",
      "Вилка": "Orbea Orca OMR ICR 2024, full carbon, 1-1/8\" - 1,5\" tapered",
      "Чашки": "FSA 1-1/2\" Integrated Aluminium Cup",
      "Курбели": "Shimano 105 R7100 34x50t",
      "Команди": "Shimano R7120",
      "Касета": "Shimano 105 R7100 11-34t 12-Speed",
      "Преден дерайльор": "Shimano 105 R7100",
      "Заден дерайльор": "Shimano 105 R7100",
      "Верига": "Shimano M6100",
      "Кормило": "OC Road Performance RP31-R, Rise 15, Reach 70, Drop 125",
      "Лапа": "OC Road Performance RP21, -6º",
      "Спирачки": "Shimano R7170 Hydraulic Disc",
      "Капли": "Alloy, Tubeless, 700c, 19c, 28H",
      "Гуми": "Vittoria Zafiro V Rigid bead 700x28c",
      "Предна ос": "Orbea Thru Axle 12x100mm M12x2 P1 Solid",
      "Задна ос": "Orbea Thru Axle 12x142mm M12x2 P1 Solid",
      "Колче за седалка": "Carbon, 27.2mm, Setback 20",
      "Седалка": "Fizik Aliante R5",
      "Гюделин": "Orbea Eva"
    }
  },
  
  // MERCH
  { 
    id: 'tshirt-white-santa-cruz',
    slug: 't-shirt-2gether-santa-cruz-white',
    name: 'T-Shirt 2GETHER x SANTA CRUZ (White)', 
    price: 39.90, 
    brand: '2GETHER', 
    category: 'Merchandise', 
    images: [
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20white/Artboard%207-1000x1000.png',
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20white/Artboard%206-1000x1000.png',
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20white/Screenshot_9-1000x1000.png',
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20white/Screenshot_66-1000x1000.png'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    description: '<strong>2GETHER x SANTA CRUZ - Chapter One</strong><br/><br/>Това не е просто тениска. Тениската е част от първият официален merch drop на 2GETHER.<br/><br/><strong>ИНСТРУКЦИИ ЗА ПОДДРЪЖКА</strong><br/>• Пране на 30°C<br/>• Без използване на белина<br/>• Да НЕ се суши в сушилня<br/>• Да се глади САМО на ниска температура<br/><br/><em>Количествата са ограничени.</em>',
    specs: { 
      material: '100% Cotton',
      fit: 'Regular Fit'
    }
  },
  { 
    id: 'tshirt-black-santa-cruz', 
    slug: 't-shirt-2gether-santa-cruz-black',
    name: 'T-Shirt 2GETHER x SANTA CRUZ (Black)', 
    price: 39.90, 
    brand: '2GETHER', 
    category: 'Merchandise', 
    images: [
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20black/Artboard%202%20copy%202-1000x1000.png',
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20black/Artboard%205-1000x1000.png',
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20black/Screenshot_112-1000x1000.png',
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20black/Screenshot_2-1000x1000.png',
      'https://2getherbikes.bg/image/cache/catalog/1-a/tshirt%20black/Screensho6854t_1-1000x1000.png'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    description: '<strong>2GETHER x SANTA CRUZ - Chapter One</strong><br/><br/>Това не е просто тениска. Тениската е част от първият официален merch drop на 2GETHER.<br/><br/><strong>ИНСТРУКЦИИ ЗА ПОДДРЪЖКА</strong><br/>• Пране на 30°C<br/>• Без използване на белина<br/>• Да НЕ се суши в сушилня<br/>• Да се глади САМО на ниска температура<br/><br/><em>Количествата са ограничени.</em>',
    specs: { 
      material: '100% Cotton',
      fit: 'Regular Fit'
    }
  },
  {
    id: "hoodie-2gether-santa-cruz",
    slug: "hoodie-2gether-santa-cruz",
    brand: "2GETHER",
    category: "Merchandise",
    name: "Hoodie 2GETHER x SANTA CRUZ",
    price: 79.90,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: '<strong>2GETHER x SANTA CRUZ - Chapter One</strong><br/><br/>Това не е просто суитчър. Той е част от първият официален merch drop на 2GETHER.<br/><br/><strong>ИНСТРУКЦИИ ЗА ПОДДРЪЖКА</strong><br/>• Пране на 30°C<br/>• Без използване на белина<br/>• Да НЕ се суши в сушилня<br/>• Да се глади САМО на ниска температура<br/><br/><em>Количествата са ограничени.</em>',
    images: [
      "https://2getherbikes.bg/image/cache/catalog/1-a/hoodie/Artboard%201-1000x1000.png",
      "https://2getherbikes.bg/image/cache/catalog/1-a/hoodie/Artboard%202-1000x1000.png",
      "https://2getherbikes.bg/image/cache/catalog/1-a/hudi1/Screenshot_3[1]-1000x1000.png",
      "https://2getherbikes.bg/image/cache/catalog/1-a/hudi1/Screenshot_3[1]-1000x1000.png",
      "https://2getherbikes.bg/image/cache/catalog/1-a/hudi1/Screenshot_2[1]-1000x1000.png",
      "https://2getherbikes.bg/image/cache/catalog/1-a/hudi1/Screenshot_7[1]-1000x1000.png"
    ],
    specs: {
      material: 'Premium Cotton Blend',
      fit: 'Regular/Oversized'
    }
  }
];

export const TOURS: TourPackage[] = [
  {
    id: 'sur-ron-light',
    name: 'Sur-Ron Light Bee X',
    description: 'Лек и пъргав, идеален за начинаещи. Лесен за управление, но с достатъчно мощност.',
    image: 'https://image.made-in-china.com/155f0j00UWhbzJsBZgop/Big-Tire-Electric-Bike-Surron-Light-Bee-X-2023-Ready-Stock.webp',
    prices: [
      { duration: '1 час', price: 120 },
      { duration: '2 часа', price: 150 },
      { duration: '3 часа', price: 180 },
    ],
    suitability: 'За начинаещи'
  },
  {
    id: 'sur-ron-ultra',
    name: 'Sur-Ron Ultra Bee 2023',
    description: 'Мощен електрически кросов мотор с 3 режима (Eco, Dynamic, Sport). За хора над 165см.',
    image: 'https://mcn-images.bauersecure.com/wp-images/217380/1440x960/sur-ron-ultra-bee-01.jpg?mode=max&quality=90&scale=down',
    prices: [
      { duration: '1 час', price: 200 },
      { duration: '2 часа', price: 250 },
      { duration: '3 часа', price: 300 },
    ],
    suitability: 'За напреднали / Високи'
  }
];

export const OFFROAD_CONTENT = {
  heroTitle: "ОФРОУД ПРИКЛЮЧЕНИЕ",
  poeticText: "Гората утихва. Въздухът е кристално чист. А моторът под теб - безшумен... докато не докоснеш газта. В този миг всичко оживява...",
  heroImage: "https://2getherbikes.bg/image/catalog/IMG_3855.jpg",
  location: {
    title: "Локация",
    description: "Аладжа манастир – едно от най-мистичните и вдъхновяващи места около Варна.",
    image: "https://2getherbikes.bg/image/catalog/IMG_3855.jpg"
  },
  included: [
    "Професионален водач",
    "Екипировка (каска, очила, ризница)",
    "Инструктаж",
    "Гъвкав маршрут"
  ],
  requirements: [
    "Възраст: 11+ години",
    "Ръст: 145см+",
    "Тегло: до 120кг",
    "Не е необходима шофьорска книжка"
  ]
};

export const LEGAL_TERMS: Record<string, LegalContent> = {
  terms: {
    title: "Общи условия",
    content: [
      "Тези общи условия уреждат взаимоотношенията между \"Евро Код 1\" ЕООД и Потребителите на електронните (интернет) страници и услуги, намиращи се на домейн 2getherbikes.bg.",
      "С натискането на обект, картинка, линк (различен от този на Общите условия) или бутон, разположен на уебсайта c изключение на линка към настоящите Общи условия, cе счита, че Вие приемате или сте съгласни с описаните по-долу Общи условия.",
      "1. РЕГИСТРАЦИЯ: Можете да поръчате стоки от онлайн магазина като „Гост” или като „Регистриран потребител”. При регистрация трябва да въведете адреса, който ще се използва за доставка, Вашето име и фамилия, e-mail, телефон(и) за връзка. Необходимо е да изберете и парола.",
      "2. ПОВЕРИТЕЛНОСТ НА ДАННИТЕ: Личните данни, които получаваме при регистрацията, ще бъдат използвани единствено за обслужване на потребителите – приемане и изпълнение на поръчки, доставяне на информация под формата на информационен бюлетин и връзка с потребителите в случай на възникнали проблеми, свързани с поръчката.",
      "3. ПОРЪЧКА: Поръчките се приемат на сайта 24 часа в денонощието, включително в почивните дни и на официалните празници.",
      "4. ЦЕНИ: Всички цени са в Български лева с включен ДДС. Цените на продуктите не включват цената за доставка.",
    ]
  },
  delivery: {
    title: "Доставка и Плащане",
    content: [
      "Доставките се извършват чрез куриерска фирма Еконт Експрес.",
      "Цената на доставката до офис на Еконт е фиксирана на 7.50 лв.",
      "Цената на доставката до адрес на клиента е фиксирана на 12.00 лв.",
      "При поръчки над 49.90 лв доставката е БЕЗПЛАТНА до офис на куриер.",
      "Срокът за доставка е от 1 до 3 работни дни за налични продукти.",
      "Всички пратки се изпращат с опция 'Преглед и тест' преди плащане.",
      "Плащането се извършва чрез Наложен платеж при получаване на стоката.",
    ]
  },
  privacy: {
    title: "Политика за поверителност",
    content: [
      "Ние от 2GETHER BIKES уважаваме вашата поверителност и се ангажираме да защитаваме личните ви данни.",
      "Събираме само необходимата информация за обработка на вашите поръчки.",
      "Не споделяме вашите данни с трети лица, освен с куриерските фирми за целите на доставката.",
      "Имате право по всяко време да поискате изтриване на вашите лични данни от нашата система.",
      "Използваме 'бисквитки' (cookies) за подобряване на потребителското изживяване на сайта.",
    ]
  }
};