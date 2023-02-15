import { auth, db } from "@/modules/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const createStoryDraft = createAsyncThunk(
  "story_draft/create",
  async (content) => {
    const stories = collection(db, "stories");
    const docRef = await addDoc(stories, {
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

export const updateStoryDraft = createAsyncThunk(
  "story_draft/update",
  async (content, { getState }) => {
    const state = getState();
    const stories = collection(db, "stories");
    const docRef = doc(stories, state.story_draft.id);
    return await updateDoc(docRef, {
      "data.draft": content,
    });
  }
);

const storyDraftSlice = createSlice({
  name: "story_draft",
  initialState: {
    id: null,
    status: "idle",
    error: null,
    savedAt: null,
  },
  reducers: {
    setStoryID: (state, action) => {
      state.id = action.payload;
    },
    setSavedAt: (state, action) => {
      state.savedAt = action.payload;
    },
  },
  extraReducers(builder) {
    // create
    builder.addCase(createStoryDraft.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(createStoryDraft.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.id = action.payload;
      console.log(action.payload);
    });

    builder.addCase(createStoryDraft.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });

    // update
    builder.addCase(updateStoryDraft.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(updateStoryDraft.fulfilled, (state) => {
      state.status = "fulfilled";
    });

    builder.addCase(updateStoryDraft.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

export const selectStoryDraftID = (state) => state.story_draft.id;
export const selectStorySavedAt = (state) => state.story_draft.savedAt;
export const selectSavingStatus = (state) => state.story_draft.status;

export default storyDraftSlice;
