import React from "react";
import Footer from "@theme-original/DocItem/Footer";
import type FooterType from "@theme/DocItem/Footer";
import type { WrapperProps } from "@docusaurus/types";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { translate } from "@docusaurus/Translate";
import { useSource } from "@site/src/lib/sources";

type Props = WrapperProps<typeof FooterType>;

// 페이지 하단 출처 표: 머리말 `sources`의 id마다 제목(링크), 라이선스, 커밋, 접근일.
export default function FooterWrapper(props: Props): React.ReactElement {
  const { frontMatter } = useDoc();
  const source = useSource();
  const ids = ((frontMatter as { sources?: string[] }).sources ?? []) as string[];
  return (
    <>
      {ids.length > 0 && (
        <table className="sources-table">
          <caption>{translate({ id: "jur.sources.caption", message: "출처" })}</caption>
          <thead>
            <tr>
              <th>id</th>
              <th>{translate({ id: "jur.sources.source", message: "출처" })}</th>
              <th>{translate({ id: "jur.sources.license", message: "라이선스" })}</th>
              <th>{translate({ id: "jur.sources.commit", message: "커밋" })}</th>
              <th>{translate({ id: "jur.sources.accessed", message: "접근일" })}</th>
            </tr>
          </thead>
          <tbody>
            {ids.map((id) => {
              const s = source(id);
              if (!s) throw new Error(`unknown source id ${id}`);
              return (
                <tr key={id}>
                  <td><code>{id}</code></td>
                  <td>{s.url ? <a href={s.url}>{s.title}</a> : `${s.title} (${s.path})`}</td>
                  <td>{s.license}</td>
                  <td>{s.commit ?? ""}</td>
                  <td>{s.accessed ?? ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Footer {...props} />
    </>
  );
}
