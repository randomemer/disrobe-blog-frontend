import type { SlatePlugin, VoidsEditor } from "@/types/slate";

const VOID_ELEMENTS = ["image"];

const withVoids: SlatePlugin<VoidsEditor> = function (editor) {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return VOID_ELEMENTS.includes(element.type) ? true : isVoid(element);
  };

  return editor;
};

export default withVoids;
