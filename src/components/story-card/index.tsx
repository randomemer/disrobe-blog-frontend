import StoryAuthor from "@/components/author";
import { combineURLQuery, getContentString } from "@/modules/utils";
import { CONTENT_MODE } from "@/modules/utils/config";
import {
  Gist,
  StoryCardContent,
  StoryCardItem,
  StoryCardRight,
  StoryCardTitle,
  StoryThumbnail,
  StoryThumbnailLink,
} from "./styles";
import $clamp from "clamp-js";
import { useEffect, useRef } from "react";

import type { StoryJoinedJSON } from "@/types/backend";
import { PlainLink } from "@/styles/shared";

export interface StoryCardProps {
  story: StoryJoinedJSON;
  contentMode?: "live" | "draft";
}

export default function StoryCard(props: StoryCardProps) {
  const { story, contentMode } = props;
  const gistRef = useRef<HTMLDivElement>(null);

  const { title, content } = story[contentMode || CONTENT_MODE]!;

  const path = combineURLQuery(`/story/${story.id}`, {
    utm_source: "website",
    utm_medium: "homepage_list",
    utm_campaign: "featured_stories",
    utm_content: story.id,
  });

  const listener = () => {
    if (gistRef.current) {
      $clamp(gistRef.current, { clamp: "auto" });
    }
  };

  useEffect(() => {
    listener();
    visualViewport?.addEventListener("resize", listener);

    return () => visualViewport?.removeEventListener("resize", listener);
  }, []);

  return (
    <StoryCardItem>
      <StoryAuthor story={story} />
      <StoryCardContent>
        <StoryThumbnailLink href={path}>
          <StoryThumbnail
            ImageProps={{
              src: story.settings.meta_img ?? undefined,
              alt: undefined,
            }}
          />
        </StoryThumbnailLink>
        <PlainLink href={path} sx={{ display: "flex", flex: 2 }}>
          <StoryCardRight>
            <StoryCardTitle>{title}</StoryCardTitle>
            <Gist ref={gistRef}>{getContentString(content)}</Gist>
          </StoryCardRight>
        </PlainLink>
      </StoryCardContent>
    </StoryCardItem>
  );
}
