import { app, db } from "@/modules/firebase";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import humanizeDuration from "humanize-duration";

// VALUES / OBJECTS

export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

export const WORD_REGEX = /\b\w+\b/gm;

export const readTimeHumanizer = humanizeDuration.humanizer({
  language: "short_en",
  languages: {
    short_en: {
      m: () => "min",
    },
  },
  units: ["m"],
  round: true,
});

// FUNCTIONS

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function emailValidator(text) {
  if (!EMAIL_REGEX.test(text)) {
    return "Not a valid email address";
  }
}

export function passwordValidator(text) {
  if (text.trim().length < 8) {
    return "Password too short";
  }
}

export function emptyValidator(text) {
  if (!text.trim()) {
    return "Field cannot be empty";
  }
}

export function createStoryContent(editor) {
  return {
    title: editor.title,
    content: JSON.stringify(editor.children),
    timestamp: Timestamp.now(),
  };
}

export async function publishStory(editor, storyId) {
  try {
    await updateDoc(doc(db, "stories", storyId), {
      is_published: true,
      "data.live": createStoryContent(editor),
    });
  } catch (error) {
    console.error(error);
  }
}

export function getObjectPublicURL(bucketPath) {
  const bucketName = app.options.storageBucket;

  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
    bucketPath
  )}?alt=media`;
}

export function calcWordCount(content) {
  let words = 0;
  let match;
  while ((match = WORD_REGEX.exec(content)) !== null) {
    if (match.index === WORD_REGEX.lastIndex) {
      WORD_REGEX.lastIndex++;
    }
    words += match.length;
  }

  return {
    words,
    read: readTimeHumanizer(words * 300),
  };
}
