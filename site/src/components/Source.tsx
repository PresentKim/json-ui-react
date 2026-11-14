import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function Source({ data }: { data: { file: string; code: string }[] }): JSX.Element {
  return (
    <>
      {data.map((s) => (
        <CodeBlock key={s.file} language="tsx" title={s.file}>
          {s.code}
        </CodeBlock>
      ))}
    </>
  );
}
