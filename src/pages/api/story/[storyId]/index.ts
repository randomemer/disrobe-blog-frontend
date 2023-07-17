import { StoryModel } from "@/modules/backend";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const storyId = req.query.storyId as string;

    switch (req.method) {
      case "GET": {
        const story = await StoryModel.query()
          .findById(storyId)
          .withGraphJoined({ draft: true, author: true });
        if (!story) return res.status(404).send(undefined);

        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(JSON.stringify(story.toJSON()));
      }

      // @TODO
      case "PUT": {
        return res.status(200).send(undefined);
      }

      default:
        return res.setHeader("Allow", "GET, PUT").status(405).send(undefined);
    }
  } catch (error) {
    res.status(500).send({
      error: (error as Error).name,
      message: (error as Error).message,
    });
  }
}
