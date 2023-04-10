export function getObjectPublicURL(bucketPath: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/${
    process.env.FIREBASE_STORAGE_BUCKET
  }/o/${encodeURIComponent(bucketPath)}?alt=media`;
}
