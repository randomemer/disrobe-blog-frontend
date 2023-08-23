import useStorySettings from "@/hooks/use-story-settings";
import { ActionsBox } from "@/styles/story-settings.styles";
import {
  DeleteOutlined,
  PublishOutlined,
  UnpublishedOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useRouter } from "next/router";

export default function StoryActions() {
  const router = useRouter();
  const [{ story }, setStory] = useStorySettings();
  const snackbar = useSnackbar();

  const publishStory = async () => {
    try {
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await axios.post(
        `/api/story/${story?.id}?publish=true`,
        undefined,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("published", resp.data);

      resp.data = setStory((data) => {
        data.story = resp.data;
      });
      snackbar.showMessage("Story has been published!", undefined, undefined, {
        severity: "success",
      } as any);
    } catch (error) {
      if (!(error instanceof Error)) return;
      console.error(error);
      snackbar.showMessage(error.message, undefined, undefined, {
        severity: "error",
      } as any);
    }
  };

  const unpublishStory = async () => {
    try {
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await axios.post(
        `/api/story/${story?.id}?publish=false`,
        undefined,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("unpublished", resp.data);

      resp.data = setStory((data) => {
        data.story = resp.data;
      });
      snackbar.showMessage("Story has been unpublished", undefined, undefined, {
        severity: "success",
      } as any);
    } catch (error) {
      if (!(error instanceof Error)) return;
      console.error(error);
      snackbar.showMessage(error.message, undefined, undefined, {
        severity: "error",
      } as any);
    }
  };

  const deleteStory = async () => {
    try {
      const token = await getAuth().currentUser!.getIdToken();
      await axios.delete(`/api/story/${story?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      snackbar.showMessage("Story has been deleted", undefined, undefined, {
        severity: "success",
      } as any);
      router.push("/me/posts");
    } catch (error) {
      if (!(error instanceof Error)) return;
      console.error(error);
      snackbar.showMessage(error.message, undefined, undefined, {
        severity: "error",
      } as any);
    }
  };

  return (
    <ActionsBox>
      <Button
        variant="outlined"
        startIcon={<PublishOutlined />}
        onClick={publishStory}
      >
        Publish Story
      </Button>

      {!!story?.is_published && (
        <Button
          color="warning"
          variant="outlined"
          startIcon={<UnpublishedOutlined />}
          onClick={unpublishStory}
        >
          Unpublish Story
        </Button>
      )}

      <Button color="error" variant="outlined" startIcon={<DeleteOutlined />}>
        Delete Story
      </Button>
    </ActionsBox>
  );
}
