import admin from "@/modules/backend/admin";
import fs from "fs";
import sharp from "sharp";
import { parseForm } from "@/utils/node";

import type { NextApiRequest, NextApiResponse } from "next";
import { IMAGE_SIZE_LIMIT } from "@/utils/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pathParam = req.query.path as string[];
    const bucketPath = pathParam.join("/");

    const storage = admin.storage();
    const bucket = storage.bucket();

    switch (req.method) {
      case "POST":
        const { files } = await parseForm(req);

        const formFile = Array.isArray(files.file) ? files.file[0] : files.file;
        let buffer = fs.readFileSync(formFile.filepath);
        fs.unlinkSync(formFile.filepath); // cleanup downloaded file

        if (formFile.size > IMAGE_SIZE_LIMIT) {
          // compress image, attempt jpeg conversion
          const image = sharp(buffer).jpeg({ quality: 50 });
          buffer = await image.toBuffer();
        }

        // save to bucket
        const fileRef = bucket.file(bucketPath);
        await fileRef.save(buffer);

        res.status(200).send({
          bucket_path: bucketPath,
        });

        break;

      default:
        // unsupported method
        res.status(405).send(undefined);
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).send({ error: error.name, message: error.message });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
