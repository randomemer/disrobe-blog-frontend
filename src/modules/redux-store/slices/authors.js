import { authors } from "@/modules/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { documentId, getDocs, query, where } from "firebase/firestore";

export const fetchAuthors = createAsyncThunk(
  "authors/fetchMany",
  async (ids) => {
    // get all of the authors
    const authorQueryRef = query(authors, where(documentId(), "in", ids));
    const authorQuerySnap = await getDocs(authorQueryRef);

    return authorQuerySnap.docs.map((doc) => doc.data());
  }
);

export const authorsSlice = createSlice({
  name: "authors",
  initialState: {
    value: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.push(...action.payload);
    });

    builder.addCase(fetchAuthors.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

// selectors
export const selectAuthorById = (state, id) => {
  return state.authors.value.find((author) => author.id === id);
};
export const selectAuthorExists = (state, id) => id in state.authors;
