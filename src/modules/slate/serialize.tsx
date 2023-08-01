import { Element, Text } from "slate";

import type { Descendant } from "slate";
import ImageWithFallback from "@/components/image";
import { Link, Typography } from "@mui/material";
import NextLink from "next/link";
import {
  BlockQuote,
  Code,
  Figure,
  List,
  ListItem,
  Paragraph,
} from "@/styles/story.styles";

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
    leaf = <Code component="code">{leaf}</Code>;
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
        return <Paragraph component="p">{children}</Paragraph>;

      case "image":
        return (
          <Figure>
            <ImageWithFallback ImageProps={{ src: node.url, alt: node.alt }} />
            <figcaption>{node.caption}</figcaption>
          </Figure>
        );

      case "blockquote":
        return <BlockQuote>{children}</BlockQuote>;

      case "link":
        return (
          <Link
            underline="hover"
            href={node.url}
            target="_blank"
            rel="noreferrer"
            component={NextLink}
          >
            {children}
          </Link>
        );

      case "numbered-list":
        return <List component="ol">{children}</List>;

      case "bulleted-list":
        return <List component="ul">{children}</List>;

      case "list-item":
        return <ListItem component="li">{children}</ListItem>;

      default:
        return <>{children}</>;
    }
  }
}
