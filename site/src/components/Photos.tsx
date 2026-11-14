import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import photos from "../photos.json";

function Img({ id, file }: { id: string; file: string }): JSX.Element {
  const src = useBaseUrl(`/img/components/${id}/${file}`);
  return <img src={src} alt={file} loading="lazy" />;
}

export default function Photos({ id }: { id: string }): JSX.Element {
  const files: string[] = (photos as Record<string, string[]>)[id] ?? [];
  if (files.length === 0) return <div className="photo-empty">실측 사진 준비 중</div>;
  return (
    <div className="photo-grid">
      {files.map((f) => (
        <Img key={f} id={id} file={f} />
      ))}
    </div>
  );
}
