"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LeadButton } from "./LeadForm";
import { navLinks } from "./nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="container header__bar">
        <Link href="/" className="wordmark" aria-label="Scanddy — на главную">
          Scanddy
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname.replace(/\/$/, "") === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__cta">
          <LeadButton type="selection" className="btn--compact">
            Помочь с выбором
          </LeadButton>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? "Закрыть" : "Меню"}</span>
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="container" aria-label="Меню">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div onClick={() => setOpen(false)}>
            <LeadButton type="selection">Помочь с выбором</LeadButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
