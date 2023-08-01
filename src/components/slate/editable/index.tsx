import LinkEditor from "@/components/slate/link-editor";
import { SlateElement, SlateLeaf } from "@/components/slate/rendering";
import { StyledEditable } from "@/components/story-editor/styles";
import useEditorConfig from "@/hooks/use-editor-config";
import { useLinkNode } from "@/hooks/use-link-node";
import { Fragment, useCallback } from "react";

import type { RenderElementProps, RenderLeafProps } from "slate-react";

export default function StoryEditable() {
  const { onKeyDown } = useEditorConfig();
  const linkNode = useLinkNode();

  const renderElement = useCallback(
    (props: RenderElementProps) => <SlateElement {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <SlateLeaf {...props} />,
    []
  );

  return (
    <Fragment>
      <StyledEditable
        autoFocus
        spellCheck
        className="article-editor"
        onKeyDown={onKeyDown}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
      {linkNode ? <LinkEditor /> : null}
    </Fragment>
  );
}
