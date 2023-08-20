import { StoryModel, StorySnapshotModel } from "@/modules/backend";
import admin from "@/modules/backend/admin";
import { extractBearerToken } from "@/modules/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { array, object, string } from "yup";

const updateSchema = object({
  title: string().trim(),
  content: array(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const storyId = req.query.storyId as string;
    const snapshotId = req.query.snapshotId as string;

    switch (req.method) {
      case "GET": {
        const snapshot = await StorySnapshotModel.query().findById([
          snapshotId,
          storyId,
        ]);
        if (!snapshot) return res.status(404).send(undefined);

        return res.status(200).send(snapshot.toJSON());
      }

      case "PATCH": {
        // 1. validate auth
        const authorization = req.headers.authorization;
        const token = extractBearerToken(authorization);
        if (!token) {
          res.status(401);
          return res.send({ message: "Bearer token not present or invalid" });
        }

        const decoded = await admin.auth().verifyIdToken(token);

        // 2. Check ownership of snapshot
        const check = await StoryModel.query()
          .select("id")
          .where("author_id", decoded.uid);

        if (check.length === 0) {
          res.status(401);
          return res.send({ message: "Failed to verify ownership of content" });
        }

        // 3. verify data and update snapshot
        const data = await updateSchema.validate(req.body, {
          stripUnknown: true,
        });

        const snapshot = await StorySnapshotModel.query().patchAndFetchById(
          [snapshotId, storyId],
          data
        );
        return res.status(200).send(snapshot.toJSON());
      }

      default: {
        return res.status(405).setHeader("Allow", "GET, PATCH").send(undefined);
      }
    }
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error(error);
    res.status(500).send({ error: error.name, message: error.message });
  }
}
