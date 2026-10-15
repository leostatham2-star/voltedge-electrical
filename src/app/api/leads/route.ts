import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, source } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "That email address looks off." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 4) {
      return NextResponse.json({ error: "A short description helps us help you." }, { status: 400 });
    }

    const lead = await db.lead.create({
      data: {
        name: name.trim().slice(0, 120),
        email: email.trim().slice(0, 200),
        phone: typeof phone === "string" ? phone.trim().slice(0, 40) : null,
        service: typeof service === "string" ? service.trim().slice(0, 120) : null,
        message: message.trim().slice(0, 2000),
        source: typeof source === "string" ? source.slice(0, 40) : "website",
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("Lead submission failed:", err);
    return NextResponse.json({ error: "Something went wrong on our end." }, { status: 500 });
  }
}
