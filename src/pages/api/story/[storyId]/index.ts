import { StoryModel, StorySnapshotModel } from "@/modules/backend";
import admin from "@/modules/backend/admin";
import { extractBearerToken } from "@/modules/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { ModelObject } from "objection";
import { v4 } from "uuid";

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
          .withGraphJoined({
            draft: true,
            author: true,
            live: true,
            settings: true,
          });
        if (!story) return res.status(404).end();

        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(story.toJSON());
      }

      case "POST": {
        const authorization = req.headers.authorization;
        const token = extractBearerToken(authorization);
        if (!token) {
          res.status(401);
          return res.send({ message: "Bearer token not present or invalid" });
        }

        const decoded = await admin.auth().verifyIdToken(token);

        const publish = req.query.publish as string | undefined;

        if (publish === "true") {
          const story = await StoryModel.query()
            .findById(storyId)
            .withGraphJoined({
              draft: true,
              author: true,
              live: true,
              settings: true,
            });

          if (!story) return res.status(404).send(undefined);
          if (story.author_id !== decoded.uid) {
            res.status(401);
            return res.send({
              message: "Failed to verify ownership of content",
            });
          }

          const { draft, live } = story;

          if (live) {
            const updated = await StoryModel.query().upsertGraphAndFetch({
              id: storyId,
              is_published: true,
              live: {
                id: live.id,
                story_id: storyId,
                title: draft.title,
                content: draft.content,
              } as ModelObject<StorySnapshotModel>,
            });

            return res.status(200).send(updated.toJSON());
          } else {
            const snapId = v4();
            const published = await StoryModel.query().upsertGraphAndFetch(
              {
                id: storyId,
                is_published: true,
                live_snap_id: snapId,
                live: {
                  id: snapId,
                  story_id: storyId,
                  title: draft.title,
                  content: draft.content,
                } as ModelObject<StorySnapshotModel>,
              },
              { insertMissing: true }
            );

            return res.status(200).send(published.toJSON());
          }
        } else if (publish === "false") {
          //@TODO : unpublish story
        } else {
          return res.status(201).send(undefined);
        }
      }

      default:
        return res.setHeader("Allow", "GET, POST").status(405).send(undefined);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: (error as Error).name,
      message: (error as Error).message,
    });
  }
}
