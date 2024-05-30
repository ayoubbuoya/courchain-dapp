import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    image: string;
    role: string;
    id: string;
    byGoogle: boolean;
    username: string;
    picture: string;
    bio: string;
    skills: string[];
    certifications: string[];
    education: string[];
    phone: string;
    isMentor: boolean;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    test: string;
    isMentor: boolean;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
      id?: string | null;
      byGoogle?: boolean;
      username?: string | null;
      picture?: string | null;
      bio?: string | null;
      skills?: string[] | null;
      certifications?: string[] | null;
      education?: string[] | null;
      phone?: string | null;
      isMentor?: boolean | null;
    };
  }
}
