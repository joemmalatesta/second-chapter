import { NextResponse } from "next/server";
import { Resend } from "resend";
//EMAIL API
const resend = new Resend(process.env.RESEND_KEY);

export async function POST(request: Request) {
  console.log("Received a POST request to /api/login");

  sendemail();

  return NextResponse.json({ message: "Login endpoint reached" });
}

const sendemail = async () => {
  try {
    const email = await resend.emails.send({
      from: "Halee <haleetisler@gmail.com>",
      to: ["haleet525@gmail.com"],
      subject: "hello world",
      html: "<p>it works!</p>",
    });
    console.log("Email sent successfully:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
