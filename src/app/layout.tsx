"use client";

// react
import { useEffect } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// app
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NetworkId, CONTRACTID } from "../lib/config";

// wallet-selector
import { Wallet } from "@/wallets/near-wallet";

import SessionWrapper from "@/components/sessionWrapper";
import { ToastContainer, toast } from "react-toastify";
import { useWalletStore } from "@/stores/wallet";
import { useCoursesStore } from "@/stores/courses";
import { getSession, useSession } from "next-auth/react";
import { useCurrentUserStore } from "@/stores/currentUser";
import { useLoadingStore } from "@/stores/loading";

// Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setWallet, setSignedAccountId, signedAccountId, wallet } =
    useWalletStore();
  const { allCourses, setAllCourses } = useCoursesStore();
  const { session, setSession, setCurrentUser } = useCurrentUserStore();
  const { setIsLoading } = useLoadingStore();

  async function fetchCourses() {
    setIsLoading(true);
    const courses = await wallet.viewMethod({
      contractId: CONTRACTID,
      method: "get_courses",
    });
    setAllCourses(courses);
    setIsLoading(false);
  }

  async function getCurrentSession() {
    setIsLoading(true);
    const session = await getSession();
    setSession(session);
    setIsLoading(false);
    return session;
  }

  async function checkWalletAndServerUserDetails() {
    if (!wallet) {
      return;
    }

    const sess = session ? session : await getCurrentSession();
    if (!sess) {
      return;
    }
    // get user details from session
    const userSer = sess?.user;
    // get user details from wallet
    const userWall = await wallet.viewMethod({
      contractId: CONTRACTID,
      method: "get_user_by_id",
      args: {
        id: signedAccountId,
      },
    });

    if (!userWall) {
      console.info("User not found in wallet.");
      console.info("Creating user in wallet...");
      await wallet.callMethod({
        contractId: CONTRACTID,
        method: "create_user",
        args: {
          name: sess?.user?.name,
          email: sess?.user?.email,
          username: sess?.user?.username,
          phone: sess?.user?.phone,
          by_google: sess?.user?.byGoogle,
          bio: sess?.user?.bio,
          skills: [],
          certifications: [],
          education: [],
          picture: sess?.user?.image,
          created_at: new Date().getTime(),
        },
      });
    }

    if (userSer && userWall) {
      // check if user details are same in wallet and session
      if (
        userSer.email !== userWall.email ||
        userSer.username !== userWall.username
      ) {
        console.info("User details are not same in wallet and session.");
        toast.error("User details are not same in wallet and session.", {
          autoClose: 2000,
        });
        // wait 1 second before continuing
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const loadingToast = toast.loading("Logging out of wallet...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await wallet.signOut();
        toast.update(loadingToast, {
          render: "Logged out of wallet succesfully.",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.warning("PLease Login with correct wallet account.", {
          autoClose: 5000,
        });
      } else {
        console.log("User from Blockchain : ", userWall);
        setCurrentUser(userWall);
      }
    }
  }

  useEffect(() => {
    getCurrentSession();
    const data = {
      networkId: NetworkId,
      createAccessKeyFor: CONTRACTID,
    };
    const wallet: any = new Wallet(JSON.stringify(data));
    wallet.startUp(setSignedAccountId);
    setWallet(wallet);
  }, []);

  useEffect(() => {
    if (!wallet) {
      return;
    }

    fetchCourses();

    if (!signedAccountId) {
      return;
    }

    checkWalletAndServerUserDetails();
  }, [wallet, signedAccountId]);

  return (
    <SessionWrapper>
      <html lang="en">
        <body className="w-full relative">
          {children}
          <ToastContainer />
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </SessionWrapper>
  );
}
