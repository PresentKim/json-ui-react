import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function DownloadButton({ small = false }: { small?: boolean }): JSX.Element {
  const href = useBaseUrl("/downloads/json-ui-react-examples.mcaddon");
  return (
    <a className={`button button--primary download-btn${small ? " small" : ""}`} href={href} download>
      예시 애드온 내려받기 (.mcaddon)
    </a>
  );
}
