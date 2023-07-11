import { AuthorModel } from "@/modules/backend";
import admin from "@/modules/backend/admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createUserAndLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password, displayName } = req.body;
    const auth = admin.auth();

    // Create user account with Firebase Admin SDK
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // Generate a custom token for the user
    const customToken = await auth.createCustomToken(userRecord.uid);

    // Add a record in database
    await AuthorModel.query().insert({ id: userRecord.uid, name: displayName });

    res.status(200).json({ token: customToken });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
