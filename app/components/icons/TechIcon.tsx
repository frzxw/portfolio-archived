import {
  SiCloudflare,
  SiDocker,
  SiFastapi,
  SiGo,
  SiKubernetes,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiReact,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type TechSlug =
  | "typescript"
  | "react"
  | "nodedotjs"
  | "postgresql"
  | "python"
  | "fastapi"
  | "openai"
  | "docker"
  | "nextdotjs"
  | "vercel"
  | "cloudflare"
  | "go"
  | "kubernetes"
  | "prometheus";

type TechIconProps = {
  slug: string;
  size?: number;
  className?: string;
  title?: string;
};

const icons: Record<TechSlug, IconType> = {
  typescript: SiTypescript,
  react: SiReact,
  nodedotjs: SiNodedotjs,
  postgresql: SiPostgresql,
  python: SiPython,
  fastapi: SiFastapi,
  openai: SiOpenai,
  docker: SiDocker,
  nextdotjs: SiNextdotjs,
  vercel: SiVercel,
  cloudflare: SiCloudflare,
  go: SiGo,
  kubernetes: SiKubernetes,
  prometheus: SiPrometheus,
};

export function TechIcon({ slug, size = 16, className, title }: TechIconProps) {
  const key = slug.toLowerCase() as TechSlug;
  const Icon = icons[key];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} className={className} title={title ?? slug} />;
}
