/**
 * Сведения о компании. Контакты и направления взяты со старого сайта
 * scanddyy-mebel.ru и публикуются только после подтверждения компанией:
 * пока `confirmed: false`, они видны лишь в режиме предпросмотра.
 */

/** Предпросмотр: сайт ещё не прошёл согласование с компанией */
export const isPreview = process.env.NEXT_PUBLIC_SITE_MODE !== "public";

export const company = {
  brand: "Scanddy",
  region: "Дагестан",
  contacts: {
    email: { value: "scanddyy05@gmail.com", confirmed: false },
    telegram: { value: "https://t.me/scanddyy", label: "@scanddyy", confirmed: false },
  },
  directions: {
    /** Комплектация коммерческих объектов (HoReCa) */
    horeca: { confirmed: false },
  },
} as const;

export function isVisible(item: { confirmed: boolean }): boolean {
  return item.confirmed || isPreview;
}
