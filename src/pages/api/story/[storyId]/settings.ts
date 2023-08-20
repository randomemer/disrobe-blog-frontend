import { StoryModel, StorySettingsModel } from "@/modules/backend";
import admin from "@/modules/backend/admin";
import { extractBearerToken } from "@/modules/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const storyId = req.query.storyId as string;

  try {
    switch (req.method) {
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
        const [story] = await StoryModel.query()
          .select("id")
          .where("author_id", "=", decoded.uid);

        if (!story) {
          res.status(401);
          return res.send({ message: "Failed to verify ownership of content" });
        }

        story.$relatedQuery<any>("settings");

        // 3. verify data and update settings
        let model = StorySettingsModel.fromJson(req.body, { patch: true });
        const result = await StoryModel.relatedQuery<any>("settings")
          .for(storyId)
          .patch(model);

        return res
          .status(200)
          .send({ updateCount: result, data: model.toJSON() });
      }

      default: {
        return res.status(405).setHeader("Allow", "PATCH").end();
      }
    }
  } catch (error) {
    if (!(error instanceof Error)) return;
    return res.status(500).send({ name: error.name, message: error.message });
  }
}
