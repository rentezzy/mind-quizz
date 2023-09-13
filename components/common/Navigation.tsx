"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation({
  navLinks,
}: {
  navLinks: { href: string; name: string }[];
}) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link, index) => {
        if (link.name === "") return <Separator key={link.href} />;
        const isActive = pathname === link.href;

        return (
          <Link
            className={
              (isActive ? "text-primary" : "text-foreground") + " text-[20px]"
            }
            href={link.href}
            key={index}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
