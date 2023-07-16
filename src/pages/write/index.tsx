import AppLayout from "@/components/layout/app";
import StoryEditor from "@/components/story-editor";
import Head from "next/head";

export default function WriteRoute() {
  return (
    <AppLayout>
      <Head>
        <title>Write | Disrobe</title>
      </Head>

      <StoryEditor />
    </AppLayout>
  );
}
