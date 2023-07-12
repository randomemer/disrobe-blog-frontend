import { getActiveLinkNode } from "@/modules/utils/editor-utils";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useSlate } from "slate-react";

export function useLinkNode() {
  const editor = useSlate();
  const activeLinkNode = getActiveLinkNode(editor);
  const [linkNode, setLinkNode] = useState(activeLinkNode);

  useEffect(() => {
    if (!_.isEqual(linkNode, activeLinkNode)) {
      setLinkNode(activeLinkNode);
    }
  }, [activeLinkNode, linkNode]);

  return linkNode;
}
