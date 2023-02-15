import { stories } from "@/modules/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, limit, query, where } from "firebase/firestore";
import { fetchAuthors, selectAuthorExists } from "./authors";

export const fetchStories = createAsyncThunk(
  "authors/fetch",
  async (options, { getState, dispatch }) => {
    // fetch the stories as per options
    const queryRef = query(
      stories,
      limit(25)
      // where("is_published", "==", true)
    );
    const querySnap = await getDocs(queryRef);

    // make a list of authors which dont exist
    const state = getState();
    const authorIds = new Set();

    querySnap.docs.forEach((doc) => {
      const id = doc.data().author;
      const exists = selectAuthorExists(state, id);
      if (!exists) authorIds.add(id);
    });

    await dispatch(fetchAuthors([...authorIds]));

    return querySnap.docs.map((doc) => doc.data());
  }
);

export const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    value: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStories.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.push(...action.payload);
    });

    builder.addCase(fetchStories.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

// selectors
export const selectStories = (state) => state.stories.value;
