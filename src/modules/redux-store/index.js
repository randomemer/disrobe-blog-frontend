import { configureStore } from "@reduxjs/toolkit";
import { authorsSlice } from "./slices/authors";
import { storiesSlice } from "./slices/stories";
import storyDraftSlice from "./slices/story-draft";
import userProfileSlice from "./slices/user-data";

export default configureStore({
  reducer: {
    user_profile: userProfileSlice.reducer,
    story_draft: storyDraftSlice.reducer,
    authors: authorsSlice.reducer,
    stories: storiesSlice.reducer,
  },
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});
