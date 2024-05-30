"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CartLink() {
  const pathname = usePathname();
  return (
    <Link href={"/cart"}>
      {pathname === "/cart" ? (
        <img className="max-w-7" src="/group-1171274821.svg" alt="" />
      ) : (
        <img className="max-w-7 text-white-900" src="/cilcart.svg" alt="" />
      )}
    </Link>
  );
}
