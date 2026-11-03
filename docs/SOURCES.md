# Источники и что подтвердить перед публикацией

## Изображения (сохранены в `public/images/sits/`)

Все фото — с официальных страниц коллекций SITS. **Право Scanddy на их публичное использование должно быть подтверждено.**

| Файл | Где на сайте | Модель / вариант | Оригинал |
|---|---|---|---|
| brandon-set3-interior-wide.webp | Первый экран (десктоп) | Brandon, set 3 | https://sits.eu/static/798e1b4a98a7ac893b010a5071ab2f0b/10acd/BRANDON_interior_set3_stipa_4_nature_1-2.webp |
| brandon-set3-interior-mobile.webp | Первый экран (телефон) | Brandon, set 3 | https://sits.eu/static/c5aec2c51b7ee9e23acb8909efe6b15c/10acd/BRANDON_interior_set3_stipa_4_nature_3.webp |
| stella-set4-interior.webp | Категория «Диваны» | Stella, set 4 | https://sits.eu/static/cb3b60eae9ea53bf2e61ad67b6f08dee/10acd/STELLA__interior_set4_heather_6_olive_brown_1.webp |
| alma-armchair-interior.webp | Категория «Кресла» | Alma, кресло | https://sits.eu/static/2afb3bdf6ca2ece567269372563ff6bc/25660/ALMA_interior_armchair_rock_1_natural_1.webp |
| brandon-set3-studio.webp | Карточка Brandon | Brandon, set 3 | https://sits.eu/static/003981ddd3a3d50866b2b20f888da81b/10acd/BRANDON_set3_stipa_4_nature_2_2.webp |
| moa-3seater-studio.webp | Карточка Moa | Moa, 3 seater | https://sits.eu/static/594330e0c82ed692ea1758f33d3467a0/10acd/MOA_3seater_bloom_1_cream_1_3.webp |
| elsa-armchair-studio.webp | Карточка Elsa | Elsa, armchair | https://sits.eu/static/e3798b9901fb4b4d0f8ca50c1ceb76cf/10acd/ELSA_armchair_spicy_3_warm_beige-_1.webp |
| julia-armchair-studio.webp | Карточка Julia | Julia, armchair | https://sits.eu/static/ea7aeeaf1e42ae403b3acdfb052b3df1/10acd/JULIA_armchair_caleido_3790_light_beige_2.webp |
| jenny-3seater-interior.webp | Блок «Персональный подбор» | Jenny, 3 seater ver. A | https://sits.eu/static/d633f815267e4978e1fb8f5b79cadfec/10acd/JENNY_interior_3seater_verA_wildflower_2_cold_beige_1.webp |

## Тексты и габариты

Описания переведены и адаптированы со страниц коллекций, габариты взяты из PDF-карточек SITS (допуск ±2 см, Ш × Г × В):

| Модель | Вариант на фото | Габариты | Страница | Карточка |
|---|---|---|---|---|
| Brandon | set 3: 3-местный + оттоманка | 348 × 235 × 83 | https://sits.eu/collection/brandon/ | https://sits.eu/static/91f4b0c7a6d05910ecd680437be2b26f/BRANDON-3.pdf |
| Moa | 3-местный | 223 × 91 × 82 | https://sits.eu/collection/moa/ | https://sits.eu/static/90883d8fa6cf6a8d7ababc542fde9618/MOA-3.pdf |
| Elsa | кресло | 83 × 91 × 103 | https://sits.eu/collection/elsa/ | https://sits.eu/static/5a6fc06d95ba2d422cdeb23558ec0641/ELSA-2.pdf |
| Julia | кресло | 70 × 78 × 81 | https://sits.eu/collection/julia/ | https://sits.eu/static/cb373acb80999b0a0591e004f71cd127/JULIA-4.pdf |

Stella, Alma и Jenny используются только как интерьерные кадры, без габаритов.

## Подтвердить у компании

1. Право на публичное использование фотографий SITS.
2. Что Scanddy выпускает модели Brandon, Moa, Elsa, Julia, Stella, Alma и Jenny, под какими названиями, и совпадают ли их габариты и материалы с карточками SITS. Флаг `verification.specsConfirmed` в `src/data/models.ts`.
3. Параметры, которые может выбрать покупатель (блок «Производство»: конфигурация, обивка, мягкость, опоры).
4. Контакты: scanddyy05@gmail.com и Telegram @scanddyy (со старого сайта). Флаги `confirmed` в `src/data/company.ts`.
5. Работает ли направление HoReCa: после подтверждения поставить `directions.horeca.confirmed: true`, и ссылка «Комплектация коммерческих объектов» появится сама.
6. Актуальный логотип: сейчас используется текстовый знак.
7. Куда отправлять заявки (CRM, почта, Telegram-бот).

На сайте нарочно не упоминаются: партнёрство с SITS, материалы, гарантии, сроки и условия для дизайнеров.

## Включение публичного режима

- `NEXT_PUBLIC_SITE_MODE=public`: неподтверждённые контакты скрываются, пометка о предварительной версии и запрет индексации (noindex) исчезают.
- `NEXT_PUBLIC_LEADS_ENDPOINT=<url>`: форма отправляет заявку POST-запросом в JSON на этот адрес, плашка предпросмотра исчезает. Сайт собран статикой для GitHub Pages, поэтому приёмник должен быть внешним и принимать запросы с другого домена (CORS).

Переменные для GitHub Pages задаются в `.github/workflows/pages.yml`.
