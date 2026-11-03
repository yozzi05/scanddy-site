import Link from "next/link";
import { company, isPreview, isVisible } from "@/data/company";
import { navLinks } from "./nav";

export function Footer() {
  const { email, telegram } = company.contacts;
  const showEmail = isVisible(email);
  const showTelegram = isVisible(telegram);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link href="/" className="wordmark">
            Scanddy
          </Link>
          <p>Мебельная фабрика · {company.region}</p>
        </div>

        <nav className="footer__nav" aria-label="Разделы сайта">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contacts">
          <p className="footer__label">Контакты</p>
          <ul>
            {showEmail && (
              <li>
                <a href={`mailto:${email.value}`}>{email.value}</a>
              </li>
            )}
            {showTelegram && (
              <li>
                <a href={telegram.value} rel="noopener noreferrer" target="_blank">
                  Telegram {telegram.label}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container footer__base">
        <span>© {new Date().getFullYear()} Scanddy</span>
        {isPreview && <span>Предварительная версия сайта: контакты и характеристики уточняются</span>}
      </div>
    </footer>
  );
}
