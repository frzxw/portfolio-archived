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
  SiTailwindcss,
  SiSupabase,
  SiRedis,
  SiFlutter,
  SiExpress,
  SiVite,
  SiRadixui,
  SiI18Next,
  SiMongodb,
} from "react-icons/si";
import { AzFunctions, AzSQLDatabase, CosmosDBcolor } from "azure-react-icons";
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
  | "prometheus"
  | "tailwindcss"
  | "supabase"
  | "azurefunctions"
  | "azuresql"
  | "cosmosdb"
  | "redis"
  | "flutter"
  | "expressjs"
  | "vite"
  | "radixui"
  | "i18n";

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
  tailwindcss: SiTailwindcss,
  supabase: SiSupabase,
  azurefunctions: AzFunctions,
  azuresql: AzSQLDatabase,
  cosmosdb: CosmosDBcolor,
  redis: SiRedis,
  flutter: SiFlutter,
  expressjs: SiExpress,
  vite: SiVite,
  radixui: SiRadixui,
  i18n: SiI18Next,
};

export function TechIcon({ slug, size = 16, className, title }: TechIconProps) {
  const key = slug.toLowerCase() as TechSlug;
  const Icon = icons[key];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} className={className} title={title ?? slug} />;
}
