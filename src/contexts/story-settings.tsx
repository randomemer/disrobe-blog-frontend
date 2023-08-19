import { AsyncStatus } from "@/types";
import { StoryJoinedJSON } from "@/types/backend";
import { createContext, PropsWithChildren } from "react";
import { Updater, useImmer } from "use-immer";

export interface StorySettingsContextData {
  story: StoryJoinedJSON | null;
  status: AsyncStatus;
}

export interface StorySettingsProviderValue {
  storyData: StorySettingsContextData;
  setStoryData: Updater<StorySettingsContextData>;
}

const initialData: StorySettingsContextData = {
  story: null,
  status: AsyncStatus.PENDING,
};

export const StorySettingsContext = createContext<StorySettingsProviderValue>({
  storyData: initialData,
  setStoryData: () => {},
});

export default function StorySettingsProvider(props: PropsWithChildren) {
  const [storyData, setStoryData] = useImmer(initialData);

  return (
    <StorySettingsContext.Provider value={{ storyData, setStoryData }}>
      {props.children}
    </StorySettingsContext.Provider>
  );
}
