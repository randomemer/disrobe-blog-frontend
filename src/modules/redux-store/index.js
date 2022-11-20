import { configureStore } from "@reduxjs/toolkit";

import userProfileSlice from "./slices/user-data";

export default configureStore({
	reducer: {
		"user-profile": userProfileSlice.reducer,
	},
	devTools:
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__(),
});
