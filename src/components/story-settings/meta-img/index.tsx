import useStorySettings from "@/hooks/use-story-settings";
import { api } from "@/modules/utils";
import { SectionItem } from "@/styles/story-settings.styles";
import { StoryJoinedJSON } from "@/types/backend";
import { ImageElement } from "@/types/slate";
import { Fade, ImageList, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { getAuth } from "firebase/auth";
import { useSnackbar } from "material-ui-snackbar-provider";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Element } from "slate";
import { CheckMarkIcon, ImageHighlight, ImageItem } from "./styles";

export default function MetaImgSection() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [{ story }, setStoryData] = useStorySettings();

  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    setImgURL(story?.settings.meta_img ?? "");
  }, [story]);

  const images = useMemo(() => {
    const data = story?.draft.content;
    if (!data) return [];

    return data.filter(
      (element) => Element.isElement(element) && element.type === "image"
    ) as ImageElement[];
  }, [story]);

  const saveMetaImage = async (imageNode: ImageElement) => {
    try {
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await api.patch<StoryJoinedJSON>(
        `/v1/story/${router.query.id}/`,
        {
          settings: {
            meta_img: imageNode.url,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStoryData(({ story }) => {
        story!.settings.meta_img = resp.data.settings.meta_img;
      });
    } catch (error) {
      console.error(error);
      let message = (error as Error).message;

      if (error instanceof AxiosError) {
        message = error.response?.data.message;
      }

      snackbar.showMessage(message, undefined, undefined, {
        severity: "error",
      } as any);
    }
  };

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
        Select one of the story images
      </Typography>
      <ImageList cols={3} rowHeight={192} gap={12}>
        {images.map((imgNode) => (
          <ImageItem
            key={imgNode.url}
            $active={imgURL === imgNode.url}
            onClick={() => saveMetaImage(imgNode)}
          >
            <Image fill src={imgNode.url} alt={imgNode.alt ?? ""} />
            <Fade in={imgURL === imgNode.url}>
              <ImageHighlight>
                <CheckMarkIcon />
              </ImageHighlight>
            </Fade>
          </ImageItem>
        ))}
      </ImageList>
    </SectionItem>
  );
}
