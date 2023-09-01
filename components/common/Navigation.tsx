"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Navigation({
  navLinks,
}: {
  navLinks: { href: string; name: string }[];
}) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        if (link.name === "") return <Separator />;
        const isActive = pathname === link.href;

        return (
          <Link
            className={
              (isActive ? "text-primary" : "text-foreground") + " text-[20px]"
            }
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
