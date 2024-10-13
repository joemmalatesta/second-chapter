import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;


// export async function POST(request: Request) {
// 	console.log("Received a POST request to /api/login");
// 	const body = await request.json();
// 	const { provider } = body;

// 	if (!provider) {
// 		return NextResponse.json({ error: "Provider is required" }, { status: 400 });
// 	}

// 	console.log(`Login attempt with provider: ${provider}`);

// 	if (provider === "google") {
// 		// Use the NextAuth handler for Google sign-in
// 		return handler(request as any, {
// 			query: { providerId: "google" },
// 		} as any) as Promise<NextResponse>;
// 	}

// 	// Handle other providers or return an error for unsupported providers
// 	return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
// }

// // Make sure to export the GET and HEAD methods as well
// export const GET = handler;
// export const HEAD = handler;
