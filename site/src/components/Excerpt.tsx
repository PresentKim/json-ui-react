import React from "react";
import { translate } from "@docusaurus/Translate";
import { useSource } from "@site/src/lib/sources";

// 출처 원문 발췌 상자. src는 레지스트리 id이고, 재배포 가능(redistribute: true)한 출처만 쓴다(site:check가 검사).
export default function Excerpt(props: {
  src: string;
  title?: string;
  path?: string;
  children?: React.ReactNode;
}): React.ReactElement {
  const s = useSource()(props.src);
  if (!s) throw new Error(`Excerpt: unknown source id ${props.src}`);
  const label = translate({ id: "jur.excerpt.label", message: "발췌" });
  const license = translate({ id: "jur.excerpt.license", message: "라이선스" });
  const commit = translate({ id: "jur.excerpt.commit", message: "커밋" });
  return (
    <blockquote className="excerpt">
      <div className="excerpt__head">
        {label}: {s.url ? <a href={s.url}>{props.title ?? s.title}</a> : (props.title ?? s.title)}
        {props.path ? ` · ${props.path}` : ""} · {s.title} · {license} {s.license}
        {s.commit ? ` · ${commit} ${s.commit}` : ""}
      </div>
      {props.children}
    </blockquote>
  );
}
