import { calcWordCount, getObjectPublicURL } from "@/utils";
import { useMemo } from "react";
import { Node } from "slate";
import "./style.scss";

export default function StoryAuthor({ story, author }) {
  const publish_date = story.created_at.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { read: readTime } = useMemo(() => {
    let { content } = story.data.draft;
    content = JSON.parse(content);
    const contentString = content.map((node) => Node.string(node)).join("\n");
    return calcWordCount(contentString);
  }, [story]);

  const authorImage = getObjectPublicURL(author.picture);
  return (
    <div className="story-author">
      <img
        src={authorImage}
        className="author-image"
        alt={`author ${author.name}`}
      />
      <div className="author-details">
        <span className="author-name">{author.name}</span>
        <div className="story-info">
          <span>{publish_date}</span>
          <span>●</span>
          <span>{readTime} read</span>
        </div>
      </div>
    </div>
  );
}
