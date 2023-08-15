import { AuthorModel } from "@/modules/backend";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id as string;

    switch (req.method) {
      case "GET": {
        const author = await AuthorModel.query().findById(id);
        if (!author) return res.status(404).end();

        return res.status(200).send(author.toJSON());
      }

      default:
        return res.setHeader("Allow", "GET").status(405).end();
    }
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error(error);
    res.status(500).send({ error: error.name, message: error.message });
  }
}
