import { useLinkNode } from "@/hooks/use-link-node";
import { LinkOutlined } from "@mui/icons-material";
import { Button, InputAdornment, Popper } from "@mui/material";
import { CheckboxMarkedOutline } from "mdi-material-ui";
import { useEffect, useRef, useState } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { LinkEditorBox, LinkEditorField } from "./styles";

export default function LinkEditor() {
  const editor = useSlate();
  const linkNodeEntry = useLinkNode();

  const [linkUrl, setLinkUrl] = useState(linkNodeEntry?.[0].url);

  const linkEl = useRef<HTMLElement>();

  // When link node entry alone changes, toggle link editor
  useEffect(() => {
    if (!linkNodeEntry) return;

    const [node] = linkNodeEntry;
    linkEl.current = ReactEditor.toDOMNode(editor, node);
    setLinkUrl(node.url);
  }, [editor, linkNodeEntry]);

  const saveLink = () => {
    if (!linkNodeEntry) return;

    const [, path] = linkNodeEntry;
    Transforms.setNodes(editor, { url: linkUrl }, { at: path });
  };

  return (
    <Popper
      open={linkNodeEntry !== undefined}
      anchorEl={linkEl.current}
      placement="top"
      modifiers={[
        {
          name: "offset",
          phase: "main",
          enabled: true,
          options: { offset: [0, 10] },
        },
      ]}
    >
      <LinkEditorBox>
        <LinkEditorField
          type="url"
          variant="standard"
          placeholder="Link"
          value={linkUrl}
          onChange={(event) => setLinkUrl(event.target.value)}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <LinkOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button type="button" onClick={saveLink}>
                  <CheckboxMarkedOutline />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </LinkEditorBox>
    </Popper>
  );
}
