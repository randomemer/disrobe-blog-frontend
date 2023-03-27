import admin from "@/modules/backend/admin";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pathParam = req.query.path as string[];
    const bucketPath = pathParam.join("/");

    const storage = admin.storage();
    const bucket = storage.bucket();
    const mediaRef = bucket.file(bucketPath);

    const [file] = await mediaRef.get();
    const metadata = file.metadata;

    res.writeHead(200, {
      "Content-Type": metadata.contentType,
      "Content-Length": metadata.size,
    });

    const readStream = file.createReadStream();
    readStream.pipe(res);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).send({ error: error.name, message: error.message });
    }
  }
}
