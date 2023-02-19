import { selectAuthorById } from "@/modules/redux-store/slices/authors";
import { selectStoryById } from "@/modules/redux-store/slices/stories";
import { calcWordCount, getObjectPublicURL } from "@/utils";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Node } from "slate";
import "./style.scss";

export default function StoryAuthor({ storyId, authorId }) {
  const author = useSelector((state) => selectAuthorById(state, authorId));
  const story = useSelector((state) => selectStoryById(state, storyId));

  const publish_date = new Date(
    story.created_at.seconds * 1000
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { read: readTime } = useMemo(() => {
    const { content } = story.data.draft;
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
