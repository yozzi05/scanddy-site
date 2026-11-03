import { NextResponse } from "next/server";
import { getModel } from "@/data/models";
import { leadTypes, phoneDigits, validateContact, type LeadPayload } from "@/lib/lead";

/**
 * Приём заявок. Пока LEADS_WEBHOOK_URL не задан, заявки не принимаются
 * и API честно отвечает 503 — форма показывает режим предпросмотра.
 */
export async function POST(request: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { type, contactKind, contact, message, modelId } = body;
  if (!type || !(type in leadTypes) || (contactKind !== "phone" && contactKind !== "email")) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (typeof contact !== "string" || validateContact(contactKind, contact)) {
    return NextResponse.json({ ok: false, error: "invalid_contact" }, { status: 422 });
  }
  const model = modelId ? getModel(modelId) : undefined;
  if (modelId && !model) {
    return NextResponse.json({ ok: false, error: "unknown_model" }, { status: 422 });
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const lead = {
    type,
    typeLabel: leadTypes[type],
    contactKind,
    contact: contactKind === "phone" ? `+7${phoneDigits(contact)}` : contact.trim(),
    message: typeof message === "string" ? message.slice(0, 2000) : "",
    modelId: model?.id ?? null,
    modelName: model?.name ?? null,
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
