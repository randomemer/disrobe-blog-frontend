import { getActiveLinkNode } from "@/utils/editor-utils";
import deepEqual from "deep-equal";
import { useEffect, useState } from "react";

export function useLinkNode(editor) {
	const activeLinkNode = getActiveLinkNode(editor);
	const [linkNode, setLinkNode] = useState(activeLinkNode);

	useEffect(() => {
		if (!deepEqual(linkNode, activeLinkNode)) {
			setLinkNode(activeLinkNode);
		}
	}, [activeLinkNode, linkNode]);

	return linkNode;
}
