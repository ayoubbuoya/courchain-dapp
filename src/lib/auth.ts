import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import initAdminBlockchainConnection from "./blockchain";
import { CONTRACTID } from "./config";

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger, isNewUser, session }) {
      if (trigger === "update") {
        console.log("Trigger Update");
        // token.test = session.test;
        token.isMentor = session.isMentor;
        return token;
      }

      // token.test = "test1";
      // default value

      if (user) {
        token.user_id = user.id;
        token.role = user.role;
        token.byGoogle = user.byGoogle;
        token.username = user.username;
        token.picture = user.picture;
        token.bio = user.bio;
        token.skills = user.skills;
        token.certifications = user.certifications;
        token.education = user.education;
        token.phone = user.phone;
        token.isMentor = user.isMentor;
      }

      return token;
    },
    async session({ session, token, user, newSession, trigger }) {
      // console.log("Token Session : ", token);

      if (token) {
        session.user.id = token.user_id as string;
        session.user.role = token.role as string;
        session.user.byGoogle = token.byGoogle as boolean;
        session.user.username = token.username as string;
        session.user.picture = token.picture as string;
        session.user.bio = token.bio as string;
        session.user.skills = token.skills as string[];
        session.user.certifications = token.certifications as string[];
        session.user.education = token.education as string[];
        session.user.phone = token.phone as string;
        // session.test = token.test as string;
        session.isMentor = token.isMentor as boolean;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const adminAccount = await initAdminBlockchainConnection();
          const userBlockchainData = await adminAccount.viewFunction({
            contractId: CONTRACTID,
            methodName: "get_user_by_email",
            args: {
              email: user.email,
            },
          });

          console.log("User Blockchain Data : ", userBlockchainData);

          if (userBlockchainData) {
            user.role = userBlockchainData.role;
            user.id = userBlockchainData.account_id;
            user.byGoogle = userBlockchainData.byGoogle;
            user.username = userBlockchainData.username;
            user.picture = userBlockchainData.picture;
            user.bio = userBlockchainData.bio;
            user.skills = userBlockchainData.skills;
            user.certifications = userBlockchainData.certifications;
            user.education = userBlockchainData.education;
            user.phone = userBlockchainData.phone;
          } else {
            user.role = "user";
            user.byGoogle = true;
            user.username = user.email.split("@")[0];
            user.picture = user.image;
            user.phone = "";
          }

          user.isMentor = false;
          console.log("Returning User : ", user);

          return true;
        } catch (e) {
          console.error(e);
          return false;
        }
      }

      return true;
    },
  },
};
