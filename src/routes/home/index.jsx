import { selectStories } from "@/modules/redux-store/slices/stories";
import { useSelector } from "react-redux";
import "./style.scss";

export default function Home() {
  const stories = useSelector((state) => selectStories(state));

  console.log(stories);

  return (
    <main className="home">
      {stories.map((story) => {
        // TODO : change to live in production
        let { title, content } = story.data.draft;

        return (
          <div key={story.id}>
            <h3>{title}</h3>
            <p></p>
          </div>
        );
      })}
    </main>
  );
}
