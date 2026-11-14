// Merged source registry (site/scripts/merge-sources.mjs) with the current locale's overrides applied.
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import sources from "@site/src/data/sources.json";

export type Src = {
  title: string;
  url?: string;
  path?: string;
  license: string;
  commit?: string;
  author?: string;
  accessed?: string;
  redistribute?: boolean;
};
type Entry = Src & { [locale: string]: unknown };
const registry = sources as unknown as Record<string, Entry>;

export function useSource(): (id: string) => Src | undefined {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  return (id) => {
    const e = registry[id];
    if (!e) return undefined;
    const over = locale !== i18n.defaultLocale ? (e[locale] as Partial<Src> | undefined) : undefined;
    return over ? { ...e, ...over } : e;
  };
}
