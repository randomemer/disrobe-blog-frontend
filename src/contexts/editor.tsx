"use client";

import { createContext } from "react";
import { useImmer } from "use-immer";

import type { PropsWithChildren } from "react";
import type { Updater } from "use-immer";
import type { AsyncStatus } from "@/types";
import type { StoryJSON } from "@/types/backend";
import { Descendant } from "slate";
import { DEFAULT_PARAGRAPH } from "@/utils/editor-utils";

export interface EditorContextData {
  status: AsyncStatus;
  title: string;
  content: Descendant[];
  story?: StoryJSON;
}

export interface EditorProviderValue {
  data: EditorContextData;
  setData: Updater<EditorContextData>;
}

const initialData: EditorContextData = {
  status: "idle",
  title: "",
  content: [DEFAULT_PARAGRAPH],
};

export const EditorContext = createContext<EditorProviderValue>({
  data: initialData,
  setData: () => {},
});

export function EditorProvider(props: PropsWithChildren) {
  const [data, setData] = useImmer<EditorContextData>(initialData);

  return (
    <EditorContext.Provider value={{ data, setData }}>
      {props.children}
    </EditorContext.Provider>
  );
}
