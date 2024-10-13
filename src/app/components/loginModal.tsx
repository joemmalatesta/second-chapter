"use client";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const { status, data: session } = useSession();

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		setError("");

		try {
			const result = await signIn("google");

			if (result?.error) {
				throw new Error(result.error);
			}

			// If there's no error, NextAuth will handle the redirect
		} catch (err) {
			setError("Google Sign-In failed");
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-bold mb-4">{status === "authenticated" ? "Log out" : "Login"}</h2>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
				{status === "authenticated" && <p className="text-sm mb-4">Logged in as: {session?.user?.email}</p>}
				{status === "authenticated" ? (
					<button
						onClick={() => {
							signOut();
						}}
						className="w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						{isLoading ? "Signing out..." : "Sign out"}
					</button>
				) : (
					<button
						onClick={handleGoogleSignIn}
						className="w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						{isLoading ? (
							"Signing in..."
						) : (
							<>
								<img src="/googleLogo.svg" alt="" className="w-6 h-6 mr-2" />
								Sign in with Google
							</>
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default LoginModal;
