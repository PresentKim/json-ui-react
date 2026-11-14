import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default function Excerpt({ data }: { data: { text: string } }): JSX.Element {
  return <CodeBlock language="json">{data.text}</CodeBlock>;
}
