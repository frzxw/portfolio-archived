import Link from "next/link";
import type { PropsWithChildren } from "react";
import { cn } from "./cn";

type TextLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}>;

export function TextLink({
  href,
  className,
  external = true,
  ariaLabel,
  children,
}: TextLinkProps) {
  const rel = external ? "noreferrer" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <Link
      href={href}
      className={cn("link", className)}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
