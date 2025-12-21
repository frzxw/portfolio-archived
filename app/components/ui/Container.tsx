import type { PropsWithChildren } from "react";
import { cn } from "./cn";

type ContainerProps = PropsWithChildren<{ className?: string }>;

export function Container({ className, children }: ContainerProps) {
  return <div className={cn("centered", className)}>{children}</div>;
}
