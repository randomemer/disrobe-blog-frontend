import useStorySettings from "@/hooks/use-story-settings";
import { truncateMetaDesc } from "@/modules/utils";
import { MetaFieldRow, SectionItem } from "@/styles/story-settings.styles";
import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function MetaDescSection() {
  const [{ story }, setStoryData] = useStorySettings();
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setDesc(story?.settings.meta_desc || "");
    console.log(story?.settings.meta_desc);
  }, [story]);

  const saveMetaDesc = async () => {};

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
        <Button variant="outlined">Save</Button>
      </MetaFieldRow>
    </SectionItem>
  );
}
