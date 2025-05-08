import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // e.g., GitHub, Google, Credentials

  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedPage = nextUrl.pathname.startsWith('/dashboard');

      if (isOnProtectedPage && !isLoggedIn) {
        return false; // triggers redirect to signIn page
      }

      return true; // allow all others
    },
  },
} satisfies NextAuthConfig;
