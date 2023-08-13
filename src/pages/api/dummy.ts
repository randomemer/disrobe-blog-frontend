import { AuthorModel, StoryModel, StorySnapshotModel } from "@/modules/backend";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lmao = await StorySnapshotModel.query().select("*");
  return res.send(lmao);
}
