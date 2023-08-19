import useStorySettings from "@/hooks/use-story-settings";
import { truncateMetaTitle } from "@/modules/utils";
import { MetaFieldRow, SectionItem } from "@/styles/story-settings.styles";
import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function MetaTitleSection() {
  const [{ story }, setStoryData] = useStorySettings();
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(story?.settings.meta_title || "");
    console.log(story?.settings.meta_title);
  }, [story]);

  const saveMetaTitle = async () => {};

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
        <Button variant="outlined">Save</Button>
      </MetaFieldRow>
    </SectionItem>
  );
}
