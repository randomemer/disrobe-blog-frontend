import { AuthorModel } from "@/modules/backend";
import admin from "@/modules/backend/admin";
import { extractBearerToken } from "@/modules/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  const authorization = req.headers.authorization;
  try {
    if (
      !authorization ||
      !authorization.startsWith("Bearer") ||
      !extractBearerToken(authorization)
    ) {
      return res
        .status(401)
        .send({ message: "Bearer token not present or invalid" });
    }

    const token = extractBearerToken(authorization)!;
    const decoded = await admin.auth().verifyIdToken(token);

    const author = await AuthorModel.query().findById(decoded.uid);
    return res.status(200).send(author!.toJSON());
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: (error as Error).name,
      message: (error as Error).message,
    });
  }
}
