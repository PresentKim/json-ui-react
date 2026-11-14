import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import addon from "../generated/addon.json";

// navbar 오른쪽 끝(모바일은 사이드바 메뉴)에 하나만 두는 통합 테스트 애드온 다운로드.
export default function AddonDownload({ mobile = false }: { mobile?: boolean }): JSX.Element {
  const href = useBaseUrl(`/downloads/${addon.file}`);
  const kb = Math.max(1, Math.round(addon.bytes / 1024));
  const meta = `${addon.label} · ${kb} KB`;
  const cls = mobile ? "menu__link" : "navbar__item navbar__link addon-download";
  return (
    <a className={cls} href={href} download={addon.file} title={meta}>
      {"통합 테스트 애드온 다운로드"}
      <small className="addon-download-meta" style={{ marginLeft: "0.5rem", opacity: 0.8 }}>
        {meta}
      </small>
    </a>
  );
}
