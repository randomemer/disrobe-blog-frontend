import useStorySettings from "@/hooks/use-story-settings";
import { truncateMetaDesc } from "@/modules/utils";
import { MetaFieldRow, SectionItem } from "@/styles/story-settings.styles";
import { SaveSharp } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { getAuth } from "firebase/auth";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MetaDescSection() {
  const router = useRouter();
  const [{ story }, setStoryData] = useStorySettings();
  const snackbar = useSnackbar();
  const [desc, setDesc] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setDesc(story?.settings.meta_desc || "");
    console.log(story?.settings.meta_desc);
  }, [story]);

  const saveMetaDesc = async () => {
    setLoading(true);
    try {
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await axios.patch(
        `/api/story/${router.query.id}/settings`,
        {
          meta_desc: desc,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStoryData(({ story }) => {
        story!.settings.meta_desc = resp.data.data.meta_desc;
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
        Meta Description
      </Typography>
      <Typography>
        A meta description, also known as an SEO description, is a concise
        snippet providing an overview of webpage content. Displayed in search
        results, it influences user click-through decisions. With a recommended
        length of 150-160 characters, an effective SEO description encourages
        engagement by offering a compelling preview of the page&apos;s
        information.
      </Typography>
      <Typography component="p" variant="h6">
        {`Description Preview : ${truncateMetaDesc(desc || "")}`}
      </Typography>
      <MetaFieldRow>
        <TextField
          fullWidth
          multiline
          minRows={2}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <LoadingButton
          loading={isLoading}
          variant="outlined"
          loadingPosition="start"
          startIcon={<SaveSharp />}
          onClick={saveMetaDesc}
        >
          Save
        </LoadingButton>
      </MetaFieldRow>
    </SectionItem>
  );
}
