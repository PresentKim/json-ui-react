import React, { useEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import { useLocation } from "@docusaurus/router";

const TranslateIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
    />
  </svg>
);

// navbar 오른쪽의 언어 전환 아이콘 버튼과 목록. 모바일 사이드바에는 두지 않는다(상단바에 항상 보인다).
export default function LocaleSwitch({ mobile = false }: { mobile?: boolean }): JSX.Element {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const utils = useAlternatePageUtils();
  const { search, hash } = useLocation();
  const baseUrl = useBaseUrl("/");
  const label = translate({ id: "jur.locale.label", message: "언어 선택" });
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLSpanElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent): void => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (mobile) return <></>;

  return (
    <span className="jur-locale jur-navbar-icon-wrap" ref={root}>
      <button
        ref={btn}
        type="button"
        className="jur-locale__btn jur-navbar-icon"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="jur-locale-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <TranslateIcon />
      </button>
      <ul id="jur-locale-menu" className="jur-locale__menu" hidden={!open}>
        {locales.map((locale) => {
          const url = utils.createUrl({ locale, fullyQualified: false });
          const href = `${url.startsWith("/") ? url : baseUrl + url}${search}${hash}`;
          const active = locale === currentLocale;
          return (
            <li key={locale}>
              <a
                className={active ? "jur-locale__link jur-locale__link--active" : "jur-locale__link"}
                href={href}
                lang={localeConfigs[locale]?.htmlLang ?? locale}
                aria-current={active ? "true" : undefined}
                target="_self"
              >
                {localeConfigs[locale]?.label ?? locale}
              </a>
            </li>
          );
        })}
      </ul>
    </span>
  );
}
