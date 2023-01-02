import { configureStore } from "@reduxjs/toolkit";
import articleDraftSlice from "./slices/article-draft";
import userProfileSlice from "./slices/user-data";

export default configureStore({
	reducer: {
		user_profile: userProfileSlice.reducer,
		article_draft: articleDraftSlice.reducer,
	},
	devTools:
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__(),
});
