import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

const key = JSON.parse(process.env.SERVICE_ACCOUNT_KEY!) as ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(key),
    storageBucket: "stories-blog-15b84.appspot.com",
  });
}

export default admin;
