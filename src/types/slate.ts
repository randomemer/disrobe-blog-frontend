import type { BaseEditor, Descendant } from "slate";
import type { HistoryEditor } from "slate-history";
import type { ReactEditor } from "slate-react";

declare module "slate" {
  interface CustomTypes {
    Editor: SlateEditor;
    Element: SlateElement;
    Text: SlateText;
  }
}

/**
|--------------------------------------------------
|               Editor and Plugins
|--------------------------------------------------
*/

export type SlatePlugin<T> = <E extends SlateEditor>(editor: E) => T & E;

export type SlateEditor = BaseEditor &
  HistoryEditor &
  ReactEditor &
  InlinesEditor &
  VoidsEditor;

export interface InlinesEditor extends BaseEditor {}

export interface VoidsEditor extends BaseEditor {}

/**
|--------------------------------------------------
|               Elements, Nodes
|--------------------------------------------------
*/

export type EditorMarks = Omit<SlateText, "text">;

export type EditorMark = keyof EditorMarks;

export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

export type SlateText = {
  text: string;
  bold?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

export type HeadingElement = {
  type: "heading";
  level: HeadingLevels;
  children: Descendant[];
};

export type ParagraphElement = {
  type: "paragraph";
  children: Descendant[];
};

export type ImageElement = {
  type: "image";
  url: string;
  alt?: string;
  caption: string;
  children: Descendant[];
};

export type BlockquoteElement = {
  type: "blockquote";
  children: Descendant[];
};

export type LinkElement = {
  type: "link";
  url: string;
  children: Descendant[];
};

export type ListItemElement = {
  type: "list-item";
  children: Descendant[];
};

export type OrderedListElement = {
  type: "numbered-list";
  children: Descendant[];
};

export type UnorderedListElement = {
  type: "bulleted-list";
  children: Descendant[];
};

export type SlateElement =
  | HeadingElement
  | ParagraphElement
  | ImageElement
  | BlockquoteElement
  | LinkElement
  | ListItemElement
  | OrderedListElement
  | UnorderedListElement;
