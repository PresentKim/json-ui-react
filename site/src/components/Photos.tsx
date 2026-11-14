import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";
import photos from "../photos.json";

function Img({ id, file }: { id: string; file: string }): JSX.Element {
  const src = useBaseUrl(`/img/components/${id}/${file}`);
  return <img src={src} alt={file} loading="lazy" />;
}

// legacy: 사진이 이전 버전(한국어 글자) 애드온으로 찍힌 것이면 한 줄 안내를 붙인다.
export default function Photos({ id, legacy = false }: { id: string; legacy?: boolean }): JSX.Element {
  const files: string[] = (photos as Record<string, string[]>)[id] ?? [];
  if (files.length === 0)
    return (
      <div className="photo-empty">
        <Translate id="jur.photos.empty">실측 사진 준비 중</Translate>
      </div>
    );
  return (
    <>
      {legacy && (
        <p className="photo-note">
          <Translate id="jur.photos.legacy">사진은 이전 버전(한국어 글자)으로 찍은 것이다.</Translate>
        </p>
      )}
      <div className="photo-grid">
        {files.map((f) => (
          <Img key={f} id={id} file={f} />
        ))}
      </div>
    </>
  );
}
