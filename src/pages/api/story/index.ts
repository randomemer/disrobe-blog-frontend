import { StoryModel } from "@/modules/backend";
import { autoId } from "@/modules/utils";
import { v4 } from "uuid";
import { array, object, string } from "yup";

import type { NextApiRequest, NextApiResponse } from "next";

const createSchema = object({
  author_id: string().required(),
  draft: object({
    title: string().required(),
    content: array().required(),
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST": {
        const validated = await createSchema.validate(req.body, {
          stripUnknown: true,
        });

        const storyId = autoId();
        const draftSnapId = v4();

        const story = await StoryModel.query().insertGraphAndFetch({
          id: storyId,
          author_id: validated.author_id,
          draft_snap_id: draftSnapId,
          draft: {
            id: draftSnapId,
            story_id: storyId,
            ...validated.draft,
          },
        } as any);
        return res.status(200).send(story.toJSON());
      }

      default:
        return res.setHeader("Allow", "GET, POST").status(405).send(undefined);
    }
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error(error);
    res.status(500).send({ error: error.name, message: error.message });
  }
}
