import { createContext } from "react";
import { useImmer } from "use-immer";

import type { PropsWithChildren } from "react";
import type { Updater } from "use-immer";
import { AsyncStatus } from "@/types";
import type { StoryJoinedJSON } from "@/types/backend";
import { Descendant } from "slate";
import { DEFAULT_PARAGRAPH } from "@/modules/utils/editor-utils";

export interface EditorContextData {
  status: AsyncStatus;
  title: string;
  content: Descendant[];
  story?: StoryJoinedJSON;
}

export interface EditorProviderValue {
  data: EditorContextData;
  setData: Updater<EditorContextData>;
}

const initialData: EditorContextData = {
  status: AsyncStatus.IDLE,
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
