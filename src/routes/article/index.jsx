import SideBar from "@/components/sidebar";
import { serializeToHTML } from "@/modules/slate/serialize";
import { calcWordCount, getObjectPublicURL } from "@/utils";
import { useLoaderData } from "react-router-dom";
import "./style.scss";
import { Node } from "slate";
import { IonIcon } from "@ionic/react";
import { linkOutline } from "ionicons/icons";
import LogoFacebook from "@/assets/images/logos/facebook";
import LogoTwitter from "@/assets/images/logos/twitter";
import LogoLinkedin from "@/assets/images/logos/linkedin";

// import LogoTwitter from "@/assets/images/logos/twitter.svg";

export default function Story() {
  const data = useLoaderData();

  console.log(data);
  const { story, author } = data;

  let { title, content } = story.data.draft; // TODO : change to story.data.live later
  content = JSON.parse(content);

  return (
    <main className="app-main">
      <article className="story">
        <div className="story-heading-container">
          <div className="story-byline">
            <StoryAuthor author={author} story={story} content={content} />
            <SocialsArea />
          </div>
          <h1 className="story-heading">{title}</h1>
        </div>
        <div className="story-content">{serializeToHTML(content)}</div>
      </article>
      <SideBar />
    </main>
  );
}

function StoryAuthor({ author, story, content }) {
  const publish_date = story.created_at.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const contentString = content.map((node) => Node.string(node)).join("\n");
  const { read: readTime } = calcWordCount(contentString);

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

function SocialsArea() {
  return (
    <div className="story-sharing">
      <button className="share-twitter">
        <LogoTwitter className="social-icon" />
      </button>
      <button className="share-facebook">
        <LogoFacebook className="social-icon" />
      </button>
      <button className="share-linkedin">
        <LogoLinkedin className="social-icon" />
      </button>
      <button className="share-link">
        <IonIcon icon={linkOutline} />
      </button>
    </div>
  );
}
