import useStorySettings from "@/hooks/use-story-settings";
import { truncateMetaTitle } from "@/modules/utils";
import { MetaFieldRow, SectionItem } from "@/styles/story-settings.styles";
import { Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios, { AxiosError } from "axios";
import { getAuth } from "firebase/auth";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SaveSharp } from "@mui/icons-material";

export default function MetaTitleSection() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [{ story }, setStoryData] = useStorySettings();
  const [title, setTitle] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(story?.settings.meta_title || "");
  }, [story]);

  const saveMetaTitle = async () => {
    setLoading(true);
    try {
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await axios.patch(
        `/api/story/${router.query.id}/settings`,
        { meta_title: title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStoryData(({ story }) => {
        story!.settings.meta_title = resp.data.data.meta_title;
      });
    } catch (error) {
      console.error(error);
      let message = (error as Error).message;

      if (error instanceof AxiosError && error.response) {
        message = error.response.data.message;
      }

      snackbar.showMessage(message, undefined, undefined, {
        severity: "error",
      } as any);
    }
    setLoading(false);
  };

  return (
    <SectionItem>
      <Typography fontWeight={600} component="h3" variant="h5">
        Meta Title
      </Typography>
      <Typography>
        A meta title, or an SEO title, is a brief and informative phrase
        summarizing webpage content. It features prominently in search results
        and browser tabs, impacting click-through rates. To maximize its
        effectiveness, keep the SEO title around 50 to 60 characters, ensuring a
        complete display and enticing users to click and explore further.
      </Typography>
      <Typography component="p" variant="h6">
        {`Title Preview : ${truncateMetaTitle(title || "")}`}
      </Typography>
      <MetaFieldRow>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <LoadingButton
          loading={isLoading}
          variant="outlined"
          startIcon={<SaveSharp />}
          loadingPosition="start"
          onClick={saveMetaTitle}
        >
          Save
        </LoadingButton>
      </MetaFieldRow>
    </SectionItem>
  );
}
