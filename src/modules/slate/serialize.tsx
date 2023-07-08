import { Element, Text } from "slate";

import type { Descendant } from "slate";
import ImageWithFallback from "@/components/image";
import { Typography } from "@mui/material";

export function serializeToHTML(content: Descendant[]) {
  return (
    <>
      {content.map((element, index) => (
        <HTMLElement key={index} node={element} />
      ))}
    </>
  );
}

function TextNodeToHTML({ node }: { node: Text }) {
  let leaf = <>{node.text}</>;
  if (node.bold) {
    leaf = <strong>{leaf}</strong>;
  }
  if (node.italic) {
    leaf = <em>{leaf}</em>;
  }
  if (node.strikethrough) {
    leaf = <s>{leaf}</s>;
  }
  if (node.underline) {
    leaf = <u>{leaf}</u>;
  }
  if (node.code) {
    leaf = <code>{leaf}</code>;
  }
  return leaf;
}

function HTMLElement({ node }: { node: Element | Text }): JSX.Element {
  if (Text.isText(node)) {
    return <TextNodeToHTML node={node} />;
  } else {
    const children = node.children.map((n, i) => (
      <HTMLElement key={i} node={n} />
    ));

    switch (node.type) {
      case "heading":
        return <Typography variant={`h${node.level}`}>{children}</Typography>;

      case "paragraph":
        return <p>{children}</p>;

      case "image":
        return (
          <figure>
            <ImageWithFallback ImageProps={{ src: node.url, alt: node.alt }} />
            <figcaption>{node.caption}</figcaption>
          </figure>
        );

      case "blockquote":
        return <blockquote>{children}</blockquote>;

      case "link":
        return (
          <a href={node.url} target="_blank" rel="noreferrer">
            {children}
          </a>
        );

      case "numbered-list":
        return <ol>{children}</ol>;

      case "bulleted-list":
        return <ul>{children}</ul>;

      case "list-item":
        return <li>{children}</li>;

      default:
        return <>{children}</>;
    }
  }
}
