import { IncomingMessage } from "http";
import { IncomingForm } from "formidable";
import { Fields, Files } from "formidable";

export function parseForm(req: IncomingMessage) {
  const form = new IncomingForm();

  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
