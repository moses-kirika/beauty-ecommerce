import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // You can add custom logic here to check if user exists in your database
            // For now, we'll allow all sign-ins
            return true;
        },
        async session({ session, token }) {
            // Add user id to session
            if (session.user) {
                session.user.id = token.sub as string;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            // Persist OAuth access token and user id to the token
            if (account) {
                token.accessToken = account.access_token;
            }
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
