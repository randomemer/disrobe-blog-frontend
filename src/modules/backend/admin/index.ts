import admin from "firebase-admin";
import serviceAccount from "./secret.json";

import type { ServiceAccount } from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: "stories-blog-15b84.appspot.com",
  });
}

export default admin;
