import { auth, currentUser } from "@/modules/firebase";
import { redirect } from "react-router-dom";

export default async function settingsRouteLoader({ request, params }) {
  await currentUser;

  if (auth.currentUser == null) {
    throw redirect(`/auth/login?redirect=${encodeURIComponent("/settings")}`);
  }

  if (/\/settings(\/)?$/gm.test(request.url)) {
    throw redirect("/settings/account");
  }
}
