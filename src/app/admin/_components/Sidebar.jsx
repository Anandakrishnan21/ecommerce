"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav({ children }) {
  return (
    <nav className="flex flex-col gap-2 overflow-y-auto scrollbar-hidden bg-stone-200 p-4">
      <div className="flex items-center gap-1">
        <Image src="/images/shopify.png" alt="logo" width="50" height="50" />
        <h1 className="font-semibold cursor-pointer">e-admin</h1>
      </div>
      {children}
    </nav>
  );
}

export function NavLink({ href, ...props }) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        "w-48 flex items-center gap-2 text-sm p-1 px-6 rounded-md",
        pathname === href
          ? "bg-white font-medium"
          : "hover:bg-white focus-visible:bg-white hover:text-black focus-visible:text-black text-neutral-600 duration-300"
      )}
    />
  );
}
