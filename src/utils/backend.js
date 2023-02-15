export const storyConveter = {
  fromFirestore: (snapshot, options) => {
    const story = snapshot.data();

    story.id = snapshot.id;
    story.created_at = story.created_at.toJSON();

    const { live, draft } = story.data;
    if (live) {
      story.data.live.content = JSON.parse(live.content);
      story.data.live.timestamp = live.timestamp.toJSON();
    }

    if (draft) {
      story.data.draft.content = JSON.parse(draft.content);
      story.data.draft.timestamp = draft.timestamp.toJSON();
    }

    return story;
  },
};

export const authorConverter = {
  fromFirestore: (snapshot, options) => {
    const author = snapshot.data();
    author.id = snapshot.id;
    return author;
  },
};
