import { getObjectPublicURL } from "@/modules/backend/utils";
import { calcWordCount } from "@/utils";
import { useMemo } from "react";
import { Node } from "slate";
import {
  Author,
  AuthorDetails,
  AuthorImage,
  AuthorImageWrapper,
} from "./styles";

import StoryModel from "@/modules/backend/client/models/story";

export interface StoryAuthorProps {
  story: StoryModel;
}

export default function StoryAuthor(props: StoryAuthorProps) {
  const { story } = props;
  const { author } = story;

  const publish_date = story.created_at.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { read: readTime } = useMemo(() => {
    const { content } = story.draft;
    const contentString = content.map((node) => Node.string(node)).join("\n");
    return calcWordCount(contentString);
  }, [story]);

  const authorImage = getObjectPublicURL(author.picture);
  return (
    <Author className="story-author">
      <AuthorImageWrapper>
        <AuthorImage fill src={authorImage} alt={`author ${author.name}`} />
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
