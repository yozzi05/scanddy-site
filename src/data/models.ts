/**
 * Данные моделей для главной и будущего каталога.
 *
 * Тексты переведены и адаптированы с официальных страниц коллекций SITS,
 * габариты взяты из PDF-карточек SITS (допуск ±2 см) для того варианта,
 * который показан на фото. До публичного запуска всё это нужно сверить
 * с фактическими характеристиками продукции Scanddy (поле `verification`).
 */

export type ModelCategory = "sofa" | "armchair";

export type Dimensions = {
  /** Ширина, см */
  width: number;
  /** Глубина, см */
  depth: number;
  /** Высота, см */
  height: number;
  /** Высота сиденья, см */
  seatHeight?: number;
};

export type ModelImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Фото на белом студийном фоне — на сайте кладём его на подложку */
  studio?: boolean;
  /** Увеличение студийного кадра в карточке, чтобы мебель занимала кадр */
  zoom?: number;
  /** Оригинал на sits.eu */
  sourceUrl: string;
};

export type FurnitureModel = {
  id: string;
  name: string;
  category: ModelCategory;
  /** Тип мебели в подписи: «Модульный диван», «Кресло» */
  type: string;
  /** Показанный на фото вариант */
  variant: string;
  description: string;
  /** Габариты показанного варианта; `null`, если вариант не подтверждён */
  dimensions: Dimensions | null;
  images: {
    studio?: ModelImage;
    interior?: ModelImage;
  };
  source: {
    collectionUrl: string;
    productCardUrl: string;
    /** Вариант в терминах карточки SITS */
    sitsVariant: string;
  };
  verification: {
    /** Характеристики сверены с продукцией Scanddy */
    specsConfirmed: boolean;
    /** Компания подтвердила право на публичное использование фото */
    photoRightsConfirmed: boolean;
  };
};

const SITS = "https://sits.eu";

export const models: FurnitureModel[] = [
  {
    id: "brandon",
    name: "Brandon",
    category: "sofa",
    type: "Модульный диван",
    variant: "Трёхместный модуль с оттоманкой",
    description:
      "Спокойная простая форма, которая легко собирается в модульную систему: от прямого дивана до большой угловой композиции с оттоманкой.",
    dimensions: { width: 348, depth: 235, height: 83, seatHeight: 46 },
    images: {
      studio: {
        src: "/images/sits/brandon-set3-studio.webp",
        width: 1395,
        height: 930,
        alt: "Модульный диван Brandon с оттоманкой в светлой ткани",
        studio: true,
        zoom: 1.08,
        sourceUrl: `${SITS}/static/003981ddd3a3d50866b2b20f888da81b/10acd/BRANDON_set3_stipa_4_nature_2_2.webp`,
      },
      interior: {
        src: "/images/sits/brandon-set3-interior-wide.webp",
        width: 1395,
        height: 930,
        alt: "Модульный диван Brandon с оттоманкой в светлой гостиной с деревянными балками",
        sourceUrl: `${SITS}/static/798e1b4a98a7ac893b010a5071ab2f0b/10acd/BRANDON_interior_set3_stipa_4_nature_1-2.webp`,
      },
    },
    source: {
      collectionUrl: `${SITS}/collection/brandon/`,
      productCardUrl: `${SITS}/static/91f4b0c7a6d05910ecd680437be2b26f/BRANDON-3.pdf`,
      sitsVariant: "set 3: 3 seater + divan",
    },
    verification: { specsConfirmed: false, photoRightsConfirmed: false },
  },
  {
    id: "moa",
    name: "Moa",
    category: "sofa",
    type: "Диван",
    variant: "Трёхместный",
    description:
      "Плавные изогнутые линии и деревянные опоры. Современный диван с характером, который задаёт тон всей комнате.",
    dimensions: { width: 223, depth: 91, height: 82, seatHeight: 46 },
    images: {
      studio: {
        src: "/images/sits/moa-3seater-studio.webp",
        width: 1395,
        height: 930,
        alt: "Трёхместный диван Moa с округлыми подлокотниками в кремовой ткани",
        studio: true,
        zoom: 1.12,
        sourceUrl: `${SITS}/static/594330e0c82ed692ea1758f33d3467a0/10acd/MOA_3seater_bloom_1_cream_1_3.webp`,
      },
    },
    source: {
      collectionUrl: `${SITS}/collection/moa/`,
      productCardUrl: `${SITS}/static/90883d8fa6cf6a8d7ababc542fde9618/MOA-3.pdf`,
      sitsVariant: "3 seater",
    },
    verification: { specsConfirmed: false, photoRightsConfirmed: false },
  },
  {
    id: "elsa",
    name: "Elsa",
    category: "armchair",
    type: "Кресло",
    variant: "С высокой спинкой",
    description:
      "Классические пропорции, выразительные подлокотники и тонкие деревянные ножки. Подушка под шею добавляет комфорта.",
    dimensions: { width: 83, depth: 91, height: 103, seatHeight: 44 },
    images: {
      studio: {
        src: "/images/sits/elsa-armchair-studio.webp",
        width: 1395,
        height: 930,
        alt: "Кресло Elsa с высокой спинкой в тёплой бежевой ткани",
        studio: true,
        zoom: 1.55,
        sourceUrl: `${SITS}/static/e3798b9901fb4b4d0f8ca50c1ceb76cf/10acd/ELSA_armchair_spicy_3_warm_beige-_1.webp`,
      },
    },
    source: {
      collectionUrl: `${SITS}/collection/elsa/`,
      productCardUrl: `${SITS}/static/5a6fc06d95ba2d422cdeb23558ec0641/ELSA-2.pdf`,
      sitsVariant: "armchair",
    },
    verification: { specsConfirmed: false, photoRightsConfirmed: false },
  },
  {
    id: "julia",
    name: "Julia",
    category: "armchair",
    type: "Кресло",
    variant: "На металлических опорах",
    description:
      "Мягкое кресло с подушками на перьевом наполнении. Можно выбрать степень мягкости, чехол и опоры.",
    dimensions: { width: 70, depth: 78, height: 81, seatHeight: 45 },
    images: {
      studio: {
        src: "/images/sits/julia-armchair-studio.webp",
        width: 1395,
        height: 930,
        alt: "Кресло Julia на тонких металлических ножках в светло-бежевой ткани",
        studio: true,
        zoom: 2,
        sourceUrl: `${SITS}/static/ea7aeeaf1e42ae403b3acdfb052b3df1/10acd/JULIA_armchair_caleido_3790_light_beige_2.webp`,
      },
    },
    source: {
      collectionUrl: `${SITS}/collection/julia/`,
      productCardUrl: `${SITS}/static/cb373acb80999b0a0591e004f71cd127/JULIA-4.pdf`,
      sitsVariant: "armchair",
    },
    verification: { specsConfirmed: false, photoRightsConfirmed: false },
  },
];

/** Подборка на главной: два дивана и два кресла */
export const featuredModelIds = ["brandon", "moa", "elsa", "julia"] as const;

export function getModel(id: string): FurnitureModel | undefined {
  return models.find((m) => m.id === id);
}

export function formatDimensions(d: Dimensions): string {
  return `${d.width} × ${d.depth} × ${d.height} см`;
}

/**
 * Интерьерные кадры для разделов главной. Модель на снимке сверена
 * с коллекцией по имени файла и странице SITS.
 */
export const editorialImages = {
  hero: {
    modelId: "brandon",
    caption: "Brandon — модульный диван с оттоманкой",
    desktop: {
      src: "/images/sits/brandon-set3-interior-wide.webp",
      width: 1395,
      height: 930,
      sourceUrl: `${SITS}/static/798e1b4a98a7ac893b010a5071ab2f0b/10acd/BRANDON_interior_set3_stipa_4_nature_1-2.webp`,
    },
    mobile: {
      src: "/images/sits/brandon-set3-interior-mobile.webp",
      width: 1395,
      height: 930,
      sourceUrl: `${SITS}/static/c5aec2c51b7ee9e23acb8909efe6b15c/10acd/BRANDON_interior_set3_stipa_4_nature_3.webp`,
    },
    alt: "Модульный диван Brandon с оттоманкой в светлой гостиной с деревянными балками и ковром",
  },
  sofas: {
    modelId: "stella",
    caption: "Stella — угловой модульный диван",
    src: "/images/sits/stella-set4-interior.webp",
    width: 1395,
    height: 930,
    alt: "Угловой диван Stella в оливковой ткани в просторной гостиной",
    sourceUrl: `${SITS}/static/cb3b60eae9ea53bf2e61ad67b6f08dee/10acd/STELLA__interior_set4_heather_6_olive_brown_1.webp`,
  },
  armchairs: {
    modelId: "alma",
    caption: "Alma — кресло",
    src: "/images/sits/alma-armchair-interior.webp",
    width: 680,
    height: 930,
    alt: "Кресло Alma в светлой фактурной ткани у окна с лёгкими шторами",
    sourceUrl: `${SITS}/static/2afb3bdf6ca2ece567269372563ff6bc/25660/ALMA_interior_armchair_rock_1_natural_1.webp`,
  },
  consultation: {
    modelId: "jenny",
    caption: "Jenny — трёхместный диван",
    src: "/images/sits/jenny-3seater-interior.webp",
    width: 1395,
    height: 930,
    alt: "Трёхместный диван Jenny в тёплой бежевой ткани у белой стены",
    sourceUrl: `${SITS}/static/d633f815267e4978e1fb8f5b79cadfec/10acd/JENNY_interior_3seater_verA_wildflower_2_cold_beige_1.webp`,
  },
} as const;
