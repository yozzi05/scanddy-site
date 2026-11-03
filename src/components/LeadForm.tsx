"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { getModel } from "@/data/models";
import {
  formatPhone,
  leadTypes,
  phoneDigits,
  validateContact,
  type ContactKind,
  type LeadType,
} from "@/lib/lead";

type OpenOptions = { type?: LeadType; modelId?: string };
type LeadContextValue = { openLead: (options?: OpenOptions) => void };

const LeadContext = createContext<LeadContextValue | null>(null);

export function useLead(): LeadContextValue {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside <LeadProvider>");
  return ctx;
}

/**
 * Сайт собирается статикой, поэтому заявка уходит напрямую на внешний
 * приёмник (CRM, форма-сервис, бот). Пока адрес не задан — режим предпросмотра.
 */
const leadsEndpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT || "";
const leadsEnabled = Boolean(leadsEndpoint);

const titles: Record<LeadType, string> = {
  selection: "Помочь с выбором",
  model: "Рассчитать комплектацию",
  project: "Обсудить проект",
};

const hints: Record<LeadType, string> = {
  selection: "Оставьте контакт — расскажем о моделях и поможем подобрать мебель под комнату.",
  model: "Оставьте контакт — уточним размеры и обивку и рассчитаем стоимость.",
  project: "Расскажите о проекте — подготовим подборку мебели и расчёт для вашего объекта.",
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [type, setType] = useState<LeadType>("selection");
  const [modelId, setModelId] = useState<string | undefined>();
  const [contactKind, setContactKind] = useState<ContactKind>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formId = useId();

  const openLead = useCallback((options: OpenOptions = {}) => {
    setType(options.type ?? (options.modelId ? "model" : "selection"));
    setModelId(options.modelId);
    setFieldError(null);
    setStatus({ kind: "idle" });
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  // Клик по затемнению вокруг окна закрывает форму
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  const model = modelId ? getModel(modelId) : undefined;
  const contactValue = contactKind === "phone" ? phone : email;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validateContact(contactKind, contactValue);
    setFieldError(error);
    if (error) return;

    if (!leadsEnabled) {
      setStatus({ kind: "error", message: "Заявка не отправлена: приём заявок на сайте ещё не подключён." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(leadsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          contactKind,
          typeLabel: leadTypes[type],
          contact: contactKind === "phone" ? `+7${phoneDigits(contactValue)}` : contactValue.trim(),
          message: message.trim() || undefined,
          modelId: type === "model" ? model?.id : undefined,
          modelName: type === "model" ? model?.name : undefined,
        }),
      });
      if (res.ok) {
        setStatus({ kind: "sent" });
        setMessage("");
        return;
      }
      setStatus({ kind: "error", message: "Не удалось отправить заявку. Попробуйте ещё раз чуть позже." });
    } catch {
      setStatus({ kind: "error", message: "Нет связи с сервером. Проверьте интернет и попробуйте ещё раз." });
    }
  }

  const availableTypes = (Object.keys(leadTypes) as LeadType[]).filter((t) => t !== "model" || model);

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      <dialog ref={dialogRef} className="lead" aria-labelledby={`${formId}-title`}>
        <div className="lead__panel">
          <div className="lead__head">
            <h2 id={`${formId}-title`} className="lead__title">
              {titles[type]}
            </h2>
            <button type="button" className="lead__close" onClick={close} aria-label="Закрыть форму">
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {!leadsEnabled && (
            <p className="lead__preview" role="note">
              Режим предпросмотра: приём заявок ещё не подключён, данные никуда не передаются.
            </p>
          )}

          {status.kind === "sent" ? (
            <div className="lead__done" role="status">
              <p className="lead__done-title">Заявка отправлена</p>
              <p>Мы свяжемся с вами, чтобы уточнить детали.</p>
              <button type="button" className="btn" onClick={close}>
                Закрыть
              </button>
            </div>
          ) : (
            <form className="lead__form" onSubmit={onSubmit} noValidate>
              <p className="lead__hint">{hints[type]}</p>

              <fieldset className="lead__group">
                <legend className="lead__label">Тема обращения</legend>
                <div className="segmented">
                  {availableTypes.map((t) => (
                    <label key={t} className="segmented__item">
                      <input
                        type="radio"
                        name="type"
                        value={t}
                        checked={type === t}
                        onChange={() => setType(t)}
                      />
                      <span>{leadTypes[t]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {type === "model" && model && (
                <div className="lead__model">
                  <span className="lead__model-name">{model.name}</span>
                  <span className="lead__model-meta">
                    {model.type} · {model.variant.toLowerCase()}
                  </span>
                  <input type="hidden" name="modelId" value={model.id} />
                </div>
              )}

              <fieldset className="lead__group">
                <legend className="lead__label">Как с вами связаться</legend>
                <div className="segmented">
                  {(["phone", "email"] as const).map((k) => (
                    <label key={k} className="segmented__item">
                      <input
                        type="radio"
                        name="contactKind"
                        value={k}
                        checked={contactKind === k}
                        onChange={() => {
                          setContactKind(k);
                          setFieldError(null);
                        }}
                      />
                      <span>{k === "phone" ? "Телефон" : "Почта"}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <label className="lead__label" htmlFor={`${formId}-contact`}>
                  {contactKind === "phone" ? "Телефон" : "Электронная почта"}
                  <span className="field__req"> — обязательно</span>
                </label>
                {contactKind === "phone" ? (
                  <input
                    id={`${formId}-contact`}
                    className="field__input"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+7 (900) 000-00-00"
                    value={phone}
                    onFocus={() => !phone && setPhone("+7")}
                    onBlur={() => phone === "+7" && setPhone("")}
                    onChange={(e) => setPhone(formatPhone(phoneDigits(e.target.value)))}
                    aria-invalid={fieldError ? true : undefined}
                    aria-describedby={fieldError ? `${formId}-err` : undefined}
                    required
                  />
                ) : (
                  <input
                    id={`${formId}-contact`}
                    className="field__input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="name@example.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={fieldError ? true : undefined}
                    aria-describedby={fieldError ? `${formId}-err` : undefined}
                    required
                  />
                )}
                {fieldError && (
                  <p id={`${formId}-err`} className="field__error">
                    {fieldError}
                  </p>
                )}
              </div>

              <div className="field">
                <label className="lead__label" htmlFor={`${formId}-message`}>
                  Пожелания <span className="field__opt">— необязательно</span>
                </label>
                <textarea
                  id={`${formId}-message`}
                  className="field__input field__input--area"
                  rows={3}
                  placeholder={
                    type === "project"
                      ? "Тип объекта, количество мебели, сроки"
                      : "Размер комнаты, нужная мебель, цвет обивки"
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                />
              </div>

              {status.kind === "error" && (
                <p className="lead__error" role="alert">
                  {status.message}
                </p>
              )}

              <div className="lead__actions">
                <button type="submit" className="btn" disabled={status.kind === "sending"}>
                  {status.kind === "sending" ? "Отправляем…" : "Отправить заявку"}
                </button>
                <p className="lead__legal">Цена индивидуальная: рассчитываем после уточнения комплектации.</p>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </LeadContext.Provider>
  );
}

/** Кнопка или ссылка, открывающая форму */
export function LeadButton({
  type,
  modelId,
  variant = "primary",
  className,
  children,
}: OpenOptions & {
  variant?: "primary" | "light" | "link" | "link-light";
  className?: string;
  children: React.ReactNode;
}) {
  const { openLead } = useLead();
  const cls =
    variant === "primary"
      ? "btn"
      : variant === "light"
        ? "btn btn--light"
        : variant === "link"
          ? "arrow-link"
          : "arrow-link arrow-link--light";
  return (
    <button
      type="button"
      className={[cls, className].filter(Boolean).join(" ")}
      onClick={() => openLead({ type, modelId })}
      aria-haspopup="dialog"
    >
      {children}
      {variant.startsWith("link") && <Arrow />}
    </button>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
      <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
