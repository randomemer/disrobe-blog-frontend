import SideBar from "@/components/sidebar";
import { serializeToHTML } from "@/modules/slate/serialize";
import { useLoaderData } from "react-router-dom";
import "./style.scss";

export default function Story() {
  const { story } = useLoaderData();

  let { title, content } = story.data.draft; // TODO : change to story.data.live later
  content = JSON.parse(content);

  return (
    <main className="app-main">
      <article className="story">
        <div className="story-heading-container">
          <h1 className="story-heading">{title}</h1>
        </div>
        <div className="story-content">{serializeToHTML(content)}</div>
      </article>
      <SideBar />
    </main>
  );
}
