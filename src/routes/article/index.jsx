import LogoFacebook from "@/assets/images/logos/facebook";
import LogoLinkedin from "@/assets/images/logos/linkedin";
import LogoTwitter from "@/assets/images/logos/twitter";
import SideBar from "@/components/sidebar";
import { analytics } from "@/modules/firebase";
import { serializeToHTML } from "@/modules/slate/serialize";
import { calcWordCount, getObjectPublicURL } from "@/utils";
import { IonIcon } from "@ionic/react";
import { logEvent } from "firebase/analytics";
import { link } from "ionicons/icons";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { Node } from "slate";
import "./style.scss";

export default function Story() {
  const data = useLoaderData();

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
  const location = useLocation();
  const params = useParams();
  const storyLink = `${window.location.origin}${location.pathname}`;

  const shareTwitter = () => {
    logEvent(analytics, "share", {
      item_id: params.id,
      content_type: "story",
      method: "twitter",
    });
  };

  const shareFacebook = () => {
    logEvent(analytics, "share", {
      item_id: params.id,
      content_type: "story",
      method: "facebook",
    });
  };

  const shareLinkedin = () => {
    logEvent(analytics, "share", {
      item_id: params.id,
      content_type: "story",
      method: "linkedin",
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(storyLink);
    logEvent(analytics, "share", {
      item_id: "",
      content_type: "story",
      method: "copy_link",
    });
  };

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
      <button className="share-link" onClick={copyLink}>
        <IonIcon icon={link} />
      </button>
    </div>
  );
}
