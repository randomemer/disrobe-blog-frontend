import { StorySettingsContext } from "@/contexts/story-settings";
import { useContext } from "react";

export default function useStorySettings() {
  const { storyData, setStoryData } = useContext(StorySettingsContext);

  return [storyData, setStoryData] as const;
}
