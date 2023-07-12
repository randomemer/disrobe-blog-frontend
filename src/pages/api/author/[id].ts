import { AuthorModel } from "@/modules/backend";
import type { NextApiRequest, NextApiResponse } from "next";
import { object, string } from "yup";

const updateSchema = object({
  name: string().trim(),
  bio: string().trim(),
  picture: string().trim(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id as string;

    switch (req.method) {
      case "GET": {
        const author = await AuthorModel.query().findById(id);
        if (!author) return res.status(404).send(undefined);

        return res.status(200).send(author.toJSON());
      }

      case "PUT": {
        const data = await updateSchema.validate(req.body);
        const author = await AuthorModel.query().patchAndFetchById(id, data);

        return res.status(200).send(author.toJSON());
      }

      default:
        return res.setHeader("Allow", "GET, PUT").status(405).send(undefined);
    }
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error(error);
    res.status(500).send({ error: error.name, message: error.message });
  }
}
