import { AuthorModel } from "@/modules/backend";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    switch (req.method) {
      case "GET":
        const story = await AuthorModel.query().findById(id);
        if (!story) return res.status(404).send(undefined);

        return res.status(200).send(story.toJSON());

      case "POST":
        return;

      default:
        // @TODO add Allow header
        return res.status(405).send(undefined);
    }

    // StorySnapshotModel.query().where({});
  } catch (error) {
    if (!(error instanceof Error)) return;
    res.status(500).send({ error: error.name, message: error.message });
  }
}
