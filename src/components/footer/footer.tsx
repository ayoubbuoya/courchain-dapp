"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden md:block pt-4 pb-3 px-4 border border-white rounded-xl ">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-8 ">
          <Link href="/" className="flex items-center gap-1 lg:w-[25%] px-4">
            <img className="max-w-6" src="/group-1171274801-1@2x.png" alt="" />

            <img className="max-w-26" src="/courchain.svg" alt="" />
          </Link>
          <p className="text-xl font-medium  text-gray-400 font-poppins ">
            © 2024 Courchain, all rights reserved.
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-5 py-2 font-bold text-white rounded-full font-inter bg-aqua-blue"
        >
          Retour en haut
        </button>
      </div>
    </footer>
  );
}
