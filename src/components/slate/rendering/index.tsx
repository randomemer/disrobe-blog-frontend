import { DefaultElement, useFocused, useSelected } from "slate-react";
import EditorImage from "@/components/slate/image";
import classNames from "classnames";
import {
  EBlockQuote,
  ELink,
  EParagraph,
  EOrderedList,
  EUnorderedList,
  EListItem,
} from "./styles";

import type { RenderLeafProps, RenderElementProps } from "slate-react";

export function SlateElement(props: RenderElementProps) {
  const { attributes, element, children } = props;

  const isFocused = useFocused();
  const isSelected = useSelected();

  const classes = classNames("editor-block", {
    "editor-block--selected": isFocused && isSelected,
  });

  switch (element.type) {
    /*
    case "title":
      const titleText = Node.string(element);
      const titleClasses = classNames(classes, {
        "title-placeholder": titleText === "",
      });
      return (
        <h1 className={titleClasses} {...attributes}>
          {children}
        </h1>
      );
    */

    case "heading":
      const Tag: keyof JSX.IntrinsicElements = `h${element.level}`;

      return (
        <Tag className={classes} {...attributes}>
          {children}
        </Tag>
      );

    case "paragraph":
      return (
        <EParagraph {...attributes} className={classes}>
          {children}
        </EParagraph>
      );

    case "blockquote":
      return (
        <EBlockQuote {...attributes} className={classes}>
          {children}
        </EBlockQuote>
      );

    case "link":
      return (
        <ELink href={element.url} {...attributes}>
          <InlineChromiumBugfix />
          {children}
          <InlineChromiumBugfix />
        </ELink>
      );

    case "bulleted-list":
      return (
        <EUnorderedList className={classes} {...attributes}>
          {children}
        </EUnorderedList>
      );

    case "numbered-list":
      return (
        <EOrderedList className={classes} {...attributes}>
          {children}
        </EOrderedList>
      );

    case "list-item":
      return <EListItem {...attributes}>{children}</EListItem>;

    case "image":
      return (
        <EditorImage element={element} attributes={attributes}>
          {children}
        </EditorImage>
      );

    default:
      return (
        <DefaultElement attributes={attributes} element={element}>
          {children}
        </DefaultElement>
      );
  }
}

export function SlateLeaf(props: RenderLeafProps) {
  const { attributes, children, leaf } = props;
  let el = <>{children}</>;

  /**
   * The following is a workaround for a Chromium bug where,
   * if you have an inline at the end of a block,
   * clicking the end of a block puts the cursor inside the inline
   * instead of inside the final {text: ''} node
   * https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
   */
  const style = leaf.text ? { paddingRight: "0.001em" } : undefined;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.code) {
    el = <code>{el}</code>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.strikethrough) {
    el = <s>{el}</s>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>;
  }

  return (
    <span style={style} {...attributes}>
      {el}
    </span>
  );
}

/**
 * Put this at the start and end of an inline component to work around this Chromium bug:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
 */
function InlineChromiumBugfix() {
  return (
    <span contentEditable={false} style={{ fontSize: 0 }}>
      ${String.fromCodePoint(160) /* Non-breaking space */}
    </span>
  );
}
