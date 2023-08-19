import useStorySettings from "@/hooks/use-story-settings";
import { MetaImgPreview, SectionItem } from "@/styles/story-settings.styles";
import { Typography } from "@mui/material";

export default function MetaImgSection() {
  const [{ story, status }, setStoryData] = useStorySettings();

  return (
    <SectionItem>
      <Typography fontWeight={600} component="h3" variant="h5">
        Meta Image
      </Typography>
      <Typography>
        A meta image, or meta tag for images, is a hidden snippet of code in
        webpages that defines the visual representation when shared on social
        media or search engines. It enhances visual appeal and encourages
        click-throughs by displaying a relevant and captivating image associated
        with the content.
      </Typography>
      <Typography component="p" variant="h6">
        Meta Image Preview
      </Typography>
      <MetaImgPreview
        ImageProps={{
          src: story?.settings.meta_img ?? undefined,
        }}
      />
    </SectionItem>
  );
}
