import { StorySnapshotModel } from "@/modules/backend";
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
      case "GET":
        const snapshot = await StorySnapshotModel.query().findById([
          snapshotId,
          storyId,
        ]);
        if (!snapshot) return res.status(404).send(undefined);

        return res.status(200).send(snapshot.toJSON());

      case "PUT":
        const data = await updateSchema.validate(req.body, {
          stripUnknown: true,
        });

        const model = await StorySnapshotModel.query().patchAndFetchById(
          [snapshotId, storyId],
          data
        );
        return res.status(200).send(model.toJSON());

      default:
        return res.status(405).setHeader("Allow", "GET, PUT").send(undefined);
    }
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error(error);
    res.status(500).send({ error: error.name, message: error.message });
  }
}
