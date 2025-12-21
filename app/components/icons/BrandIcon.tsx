import type { ComponentType } from "react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

export type BrandIconName = "github" | "linkedin" | "x";

type BrandIconProps = {
  name: BrandIconName;
  size?: number;
  className?: string;
  title?: string;
};

const ICONS: Record<BrandIconName, ComponentType<{ size?: number; className?: string }>> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
};

export function BrandIcon({ name, size = 16, className, title }: BrandIconProps) {
  const Icon = ICONS[name];

  if (title) {
    return (
      <span title={title} className={className}>
        <Icon size={size} />
      </span>
    );
  }

  return <Icon size={size} className={className} />;
}
