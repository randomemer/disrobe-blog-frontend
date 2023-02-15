import reduxStore from "@/modules/redux-store";
import { fetchStories } from "@/modules/redux-store/slices/stories";

export default async function homeRouteLoader({ request, params }) {
  return await reduxStore.dispatch(fetchStories({}));
}
