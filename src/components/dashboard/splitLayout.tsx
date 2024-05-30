"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import { Session } from "next-auth";
import Header from "./header";

export default function SplitLayout({ session }: { session: Session | null }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}
