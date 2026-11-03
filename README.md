# Scanddy — сайт, этап 1

Next.js (App Router) + TypeScript, статическая сборка. Страницы: `/` и `/obivka`, форма заявки.

Сайт: https://yozzi05.github.io/scanddy-site/ — публикуется автоматически при push в `main` (`.github/workflows/pages.yml`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # статика в out/
```

- Данные моделей: `src/data/models.ts`. Сведения о компании и флаги подтверждения: `src/data/company.ts`.
- Источники изображений и список того, что нужно подтвердить: `docs/SOURCES.md`.
- Скриншоты проверки: `screenshots/`.
