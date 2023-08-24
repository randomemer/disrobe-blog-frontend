import useStorySettings from "@/hooks/use-story-settings";
import { ActionsBox } from "@/styles/story-settings.styles";
import {
  DeleteOutlined,
  PublishedWithChangesOutlined,
  PublishOutlined,
  UnpublishedOutlined,
} from "@mui/icons-material";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useModal } from "mui-modal-provider";
import { useRouter } from "next/router";
import { useState } from "react";
import AlertModal from "@/components/alert";

export default function StoryActions() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const modal = useModal();
  const [{ story }, setStory] = useStorySettings();
  const [loading, setLoading] = useState(false);

  const publishStory = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const unpublishStory = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const getUnpublishConfirmation = () => {
    const openedModal = modal.showModal(AlertModal, {
      title: "Unpublish Story",
      description:
        "Are you sure you want to unpublish? It will no longer be publicly visible.",
      actions: [
        {
          label: "OK",
          handler: () => {
            openedModal.destroy();
            unpublishStory();
          },
        },
        {
          label: "CANCEL",
          handler: () => {
            openedModal.destroy();
          },
        },
      ],
    });
  };

  const deleteStory = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const getDeleteConfirmation = () => {
    const openedModal = modal.showModal(AlertModal, {
      title: "Delete Story",
      description:
        "Are you sure you want to delete this story? All its related data will be removed and cannot be recovered.",
      actions: [
        {
          label: "OK",
          handler: () => {
            openedModal.destroy();
            deleteStory();
          },
        },
        {
          label: "CANCEL",
          handler: () => {
            openedModal.destroy();
          },
        },
      ],
    });
  };

  return (
    <>
      <Backdrop open={loading} sx={{ zIndex: 99 }}>
        <CircularProgress />
      </Backdrop>

      <ActionsBox>
        <Button
          variant="outlined"
          startIcon={
            !story?.is_published ? (
              <PublishOutlined />
            ) : (
              <PublishedWithChangesOutlined />
            )
          }
          onClick={publishStory}
        >
          Publish Story
        </Button>

        {!!story?.is_published && (
          <Button
            color="warning"
            variant="outlined"
            startIcon={<UnpublishedOutlined />}
            onClick={getUnpublishConfirmation}
          >
            Unpublish Story
          </Button>
        )}

        <Button
          color="error"
          variant="outlined"
          startIcon={<DeleteOutlined />}
          onClick={getDeleteConfirmation}
        >
          Delete Story
        </Button>
      </ActionsBox>
    </>
  );
}
