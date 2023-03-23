export function getObjectPublicURL(bucketPath: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/${
    process.env.FIREBASE_STORAGE_BUCKET
  }/o/${encodeURIComponent(bucketPath)}?alt=media`;
}

// export function createStoryContent(editor) {
//   return {
//     title: editor.title,
//     content: JSON.stringify(editor.children),
//     timestamp: Timestamp.now(),
//   };
// }

// export async function publishStory(editor, storyId) {
//   try {
//     await updateDoc(doc(db, "stories", storyId), {
//       is_published: true,
//       "data.live": createStoryContent(editor),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
