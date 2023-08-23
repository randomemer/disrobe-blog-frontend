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

        if (publish === "true") {
          const { draft, live } = story;

          if (live) {
            const updated = await StoryModel.query().upsertGraphAndFetch(
              {
                id: storyId,
                is_published: true,
                live: {
                  id: live.id,
                  story_id: storyId,
                  title: draft.title,
                  content: draft.content,
                } as ModelObject<StorySnapshotModel>,
              },
              { noDelete: true }
            );

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
              { insertMissing: true, noDelete: true }
            );

            return res.status(200).send(published.toJSON());
          }
        } else if (publish === "false") {
          const unpublished = await StoryModel.transaction(async (trx) => {
            if (story.live_snap_id) {
              await StorySnapshotModel.query(trx).deleteById(
                story.live_snap_id
              );
            }
            await StoryModel.query(trx).findById(story.id).patch({
              is_published: false,
              live_snap_id: null,
            });

            return await StoryModel.query(trx)
              .findById(story.id)
              .withGraphJoined({
                draft: true,
                author: true,
                live: true,
                settings: true,
              });
          });

          return res.status(200).send(unpublished!.toJSON());
        } else {
          return res.status(201).end();
        }
      }

      default:
        return res.setHeader("Allow", "GET, POST").status(405).end();
    }
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error(error);
    res.status(500).send({
      error: error.name,
      message: error.message,
    });
  }
}
