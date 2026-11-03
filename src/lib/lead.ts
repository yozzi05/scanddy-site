/** Общие типы и проверки заявки — используются формой и API */

export const leadTypes = {
  selection: "Подбор мебели",
  model: "Расчёт модели",
  project: "Проект дизайнера",
} as const;

export type LeadType = keyof typeof leadTypes;

export type ContactKind = "phone" | "email";

export type LeadPayload = {
  type: LeadType;
  contactKind: ContactKind;
  contact: string;
  message?: string;
  modelId?: string;
};

/** Только цифры абонентского номера без кода страны: 10 штук */
export function phoneDigits(input: string): string {
  // «+7» в поле — код страны, а не первая цифра номера
  const rest = input.trimStart().startsWith("+7") ? input.trimStart().slice(2) : input;
  let digits = rest.replace(/\D/g, "");
  // Вставили номер целиком: 8 900 … или 7 900 …
  if (digits.length >= 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

/** +7 (900) 123-45-67 */
export function formatPhone(digits: string): string {
  const d = digits.slice(0, 10);
  let out = "+7";
  if (d.length > 0) out += ` (${d.slice(0, 3)}`;
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += ` ${d.slice(3, 6)}`;
  if (d.length > 6) out += `-${d.slice(6, 8)}`;
  if (d.length > 8) out += `-${d.slice(8, 10)}`;
  return out;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(kind: ContactKind, value: string): string | null {
  if (kind === "phone") {
    return phoneDigits(value).length === 10 ? null : "Введите номер полностью: +7 и 10 цифр";
  }
  return emailRe.test(value.trim()) ? null : "Проверьте адрес почты";
}
