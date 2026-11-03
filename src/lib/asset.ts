/** Путь к файлу из public/ с учётом подпапки сайта (GitHub Pages) */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
