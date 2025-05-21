import NextAuth from "next-auth";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { Profile } from "next-auth";
import GitHub from "next-auth/providers/github";
// import type { Account, Profile } from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [GitHub],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({
            user,
            profile,
        }: {
            user: User;
            profile?: Profile & { id: string; login: string; bio?: string };
        }) {
            if (!profile) return false;

            const { name, email, image } = user;
            const { id, login, bio } = profile;

            const existingUser = await client
                .withConfig({ useCdn: false })
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id,
                    username: login,
                    name,
                    email,
                    image,
                    bio: bio || "",
                });
            }

            return true;
        },

        async jwt({
            token,
            profile,
        }: {
            token: JWT;
            profile?: Profile & { id: string };
        }) {
            if (profile?.id) {
                const user = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

                if (user) {
                    token.id = user?._id;
                }
            }

            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            if (token?.id && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});
