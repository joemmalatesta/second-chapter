import { MongoClient } from "mongodb";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
    callbacks: {
        async redirect({ url, baseUrl }) { return baseUrl }, 
        async signIn({user, account}){

            const {name, email} = user
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({name, email})
                })

                if (res.ok) {
                    return true;
                }
                console.log('failed to write user to db')
                return true;
                    }
    }
};
