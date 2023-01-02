import { auth, db } from "@/modules/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	addDoc,
	collection,
	doc,
	Timestamp,
	updateDoc,
} from "firebase/firestore";

export const createArticleDraft = createAsyncThunk(
	"article_draft/create",
	async (content) => {
		const articles = collection(db, "articles");
		const docRef = await addDoc(articles, {
			author: auth.currentUser.uid,
			is_published: false,
			data: {
				draft: content,
			},
			created_at: Timestamp.now(),
		});
		return docRef.id;
	}
);

export const updateArticleDraft = createAsyncThunk(
	"article_draft/update",
	async (content, { getState }) => {
		const state = getState();
		const articles = collection(db, "articles");
		const docRef = doc(articles, state.article_draft.id);
		return await updateDoc(docRef, {
			"data.draft": content,
		});
	}
);

const articleDraftSlice = createSlice({
	name: "article_draft",
	initialState: {
		id: null,
		status: "idle",
		error: null,
		savedAt: null,
	},
	reducers: {
		setArticleID: (state, action) => {
			state.id = action.payload;
		},
		setSavedAt: (state, action) => {
			state.savedAt = action.payload;
		},
	},
	extraReducers(builder) {
		// create
		builder.addCase(createArticleDraft.pending, (state) => {
			state.status = "pending";
		});

		builder.addCase(createArticleDraft.fulfilled, (state, action) => {
			state.status = "fulfilled";
			state.id = action.payload;
			console.log(action.payload);
		});

		builder.addCase(createArticleDraft.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.error;
		});

		// update
		builder.addCase(updateArticleDraft.pending, (state) => {
			state.status = "pending";
		});

		builder.addCase(updateArticleDraft.fulfilled, (state) => {
			state.status = "fulfilled";
		});

		builder.addCase(updateArticleDraft.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.error;
		});
	},
});

export const selectArticleDraftID = (state) => state.article_draft.id;
export const selectArticleSavedAt = (state) => state.article_draft.savedAt;
export const selectSavingStatus = (state) => state.article_draft.status;

export default articleDraftSlice;
