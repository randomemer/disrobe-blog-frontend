import { db } from "@/modules/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

export const fetchUserProfile = createAsyncThunk(
	"user-profile/fetch-user",
	async (uid) => {
		const docRef = doc(db, "authors", uid);
		const fetchedDoc = await getDoc(docRef);
		return fetchedDoc.data();
	}
);

const userProfileSlice = createSlice({
	name: "user-profile",
	initialState: {
		value: null,
		status: "idle",
		error: null,
	},
	reducers: {
		update: (state, action) => {
			state.value = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchUserProfile.pending, (state) => {
			state.status = "pending";
		});

		builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
			state.status = "fulfilled";
			state.value = action.payload;
		});

		builder.addCase(fetchUserProfile.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.error;
		});
	},
});

// export const selectUser = (state) => state.value;

export default userProfileSlice;
