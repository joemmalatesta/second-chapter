// 'use client'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Welcome {session?.user?.name}!</p>
      <img src={session?.user?.image!} alt="" className="rounded-full" />
      {/* Add more profile content here */}
    </div>
  );
}
