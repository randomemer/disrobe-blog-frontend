import { calcWordCount, getMediaURL } from "@/modules/utils";
import { useMemo } from "react";
import { Node } from "slate";
import {
  Author,
  AuthorDetails,
  AuthorImage,
  AuthorImageWrapper,
} from "./styles";

import { StoryModel } from "@/modules/backend";
import { ModelObject } from "objection";

export interface StoryAuthorProps {
  story: ModelObject<StoryModel>;
}

export default function StoryAuthor(props: StoryAuthorProps) {
  const { story } = props;
  const { author } = story;

  const publish_date = new Date(story.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { read: readTime } = useMemo(() => {
    const { content } = story.draft;
    const contentString = content.map((node) => Node.string(node)).join("\n");
    return calcWordCount(contentString);
  }, [story]);

  return (
    <Author className="story-author">
      <AuthorImageWrapper>
        <AuthorImage
          fill
          src={author.picture && getMediaURL(author.picture)}
          alt={`author ${author.name}`}
        />
      </AuthorImageWrapper>

      <AuthorDetails>
        <span className="author-name">{author.name}</span>
        <div className="story-info">
          <span>{publish_date}</span>
          <span>●</span>
          <span>{readTime} read</span>
        </div>
      </AuthorDetails>
    </Author>
  );
}
