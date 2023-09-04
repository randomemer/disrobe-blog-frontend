import ImageWithFallback from "@/components/image";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StorySettingsContainer = styled(Box)`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  gap: 7.2rem;
`;

export const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8.4rem;
  flex: 1;
  max-width: 75rem;
  margin-bottom: 15rem;
`;

export const Section = styled("section")`
  scroll-margin-top: 4.8rem;
`;

export const SectionItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  &:not(:last-child) {
    margin-bottom: 4.8rem;
  }
`;

export const SectionHeading = styled(Typography)`
  margin-bottom: 4.2rem;
` as typeof Typography;

export const MetaFieldRow = styled(Box)`
  display: flex;
  gap: 1.8rem;
  align-items: flex-start;
`;

export const MetaImgPreview = styled(ImageWithFallback)`
  img {
    max-width: 100%;
  }
`;

export const ActionsBox = styled(Box)`
  display: flex;
  gap: 1.8rem;
`;
