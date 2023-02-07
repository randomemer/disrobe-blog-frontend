import LinkEditor from "@/components/slate/link-editor";
import useEditorConfig from "@/hooks/use-editor-config";
import { useLinkNode } from "@/hooks/use-link-node";
import { Fragment, useCallback } from "react";
import { Editable } from "slate-react";
import { SlateElement, SlateLeaf } from "../rendering";

export default function ArticleEditable() {
  const { onKeyDown } = useEditorConfig();
  const linkNode = useLinkNode();

  const renderElement = useCallback((props) => <SlateElement {...props} />, []);
  const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, []);

  return (
    <Fragment>
      <Editable
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
