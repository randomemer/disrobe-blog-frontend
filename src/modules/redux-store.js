import { configureStore, createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState: {
		value: null,
	},
	reducers: {
		update: (state, action) => {
			state.value = action.payload;
		},
	},
});

export default configureStore({
	reducer: {
		userProfile: userProfileSlice.reducer,
	},
});
