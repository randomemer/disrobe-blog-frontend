import StoryAuthor from "@/components/author";
import { selectStories } from "@/modules/redux-store/slices/stories";
import { getStoryThumb } from "@/utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Node } from "slate";
import "./style.scss";

export default function Home() {
  const stories = useSelector(selectStories);

  // on Component Mount
  useEffect(() => {
    const rootDiv = document.getElementById("root");
    rootDiv?.classList.add("route--home");

    const header = document.querySelector("header");
    const observerOptions = {
      threshold: 0,
      rootMargin: `${-header.offsetHeight}px`,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        rootDiv?.classList.add("route--home");
      } else {
        rootDiv?.classList.remove("route--home");
      }
    }, observerOptions);

    observer.observe(document.querySelector(".splash-section"));

    return () => {
      observer.disconnect();
      rootDiv?.classList.remove("route--home");
    };
  }, []);

  return (
    <main className="home">
      <section className="splash-section">
        <div className="splash-container">
          <div className="splash-content">
            <h1>Stories on art, people and the world.</h1>
          </div>
        </div>
      </section>

      <div className="stories-section">
        <div className="stories-list">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </main>
  );
}

function StoryCard({ story, ...other }) {
  // TODO : change to live in production
  const { title, content } = story.data.draft;
  const paragraph = content.find((node) => node.type === "paragraph");
  const thumb = getStoryThumb(content);

  return (
    <div className="story-card" {...other}>
      <StoryAuthor authorId={story.author} storyId={story.id} />
      <div className="card-content">
        <div className="thumbnail-container">
          <img
            src={thumb?.url || ""}
            className="thumbnail"
            alt="Story Thumbnail"
          />
        </div>
        <div className="card-right">
          <h3 className="title">{title}</h3>
          <p className="gist">{paragraph ? Node.string(paragraph) : null}</p>
        </div>
      </div>
    </div>
  );
}
