import { getActiveLinkNode } from "@/utils/editor-utils";
import deepEqual from "deep-equal";
import { useEffect, useState } from "react";
import { useSlate } from "slate-react";

export function useLinkNode() {
  const editor = useSlate();
  const activeLinkNode = getActiveLinkNode(editor);
  const [linkNode, setLinkNode] = useState(activeLinkNode);

  useEffect(() => {
    if (!deepEqual(linkNode, activeLinkNode)) {
      setLinkNode(activeLinkNode);
    }
  }, [activeLinkNode, linkNode]);

  return linkNode;
}
