import { Resend } from "resend";
import { NextResponse } from "next/server";
import { env } from "process";

export async function POST(request: Request) {
  console.log("Received a POST request to /api/login");

  const resend = new Resend(process.env.RESEND_KEY);

  await resend.emails.send({
    from: "Halee <haleetisler@gmail.com>",
    to: ["haleet525@gmail.com"],
    subject: "hello world",
    html: "<p>it works!</p>",
  });
}
