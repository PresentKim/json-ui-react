import React, { useEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import addon from "../generated/addon.json";

const LABEL = "통합 테스트 애드온 다운로드";

const DownloadIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

const GithubIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"
    />
  </svg>
);

export function GithubLink({ mobile = false }: { mobile?: boolean }): JSX.Element {
  const props = {
    href: "https://github.com/PresentKim/json-ui-react",
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "GitHub 저장소",
    title: "GitHub 저장소",
  };
  // 모바일에서도 상단바 아이콘이 항상 보이므로 사이드바에는 중복 항목을 두지 않는다.
  if (mobile) return <></>;
  return (
    <a className="jur-navbar-icon header-github-link" {...props}>
      <GithubIcon />
    </a>
  );
}

// navbar 오른쪽 끝의 다운로드 아이콘 버튼과 팝오버. 모바일 사이드바에서는 직접 다운로드 링크.
export default function AddonDownload({ mobile = false }: { mobile?: boolean }): JSX.Element {
  const href = useBaseUrl(`/downloads/${addon.file}`);
  const kb = Math.max(1, Math.round(addon.bytes / 1024));
  const meta = `${addon.label} · ${kb} KB`;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const copy = (): void => {
    void navigator.clipboard?.writeText(addon.file).then(() => setCopied(true));
  };

  return (
    <span className="addon-pop jur-navbar-icon-wrap" ref={root}>
      <button
        ref={btn}
        type="button"
        className="addon-pop__btn jur-navbar-icon"
        aria-label={LABEL}
        title={LABEL}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="addon-pop-panel"
        onClick={() => {
          setOpen((o) => !o);
          setCopied(false);
        }}
      >
        <DownloadIcon />
      </button>
      <div id="addon-pop-panel" className="addon-pop__panel" role="dialog" aria-label="통합 테스트 애드온" hidden={!open}>
        <strong className="addon-pop__title">통합 테스트 애드온</strong>
        <div className="addon-pop__file">
          <code>{addon.file}</code>
          <button type="button" className="button button--sm button--secondary" onClick={copy}>
            {copied ? "복사됨" : "복사"}
          </button>
        </div>
        <div className="addon-pop__meta">{meta}</div>
        <p className="addon-pop__hint">모든 예시가 들어 있는 애드온 하나. 게임의 팩 이름·설명 버전이 파일명과 같은지 확인</p>
        <a className="button button--primary button--block" href={href} download={addon.file}>
          다운로드
        </a>
      </div>
    </span>
  );
}
