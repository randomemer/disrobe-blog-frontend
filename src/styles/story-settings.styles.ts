import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StorySettingsContainer = styled(Box)`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  gap: 4.8rem;
`;

export const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Section = styled(Box)``;

export const SectionTitle = styled(Typography)`
  margin-bottom: 2.4rem;
` as typeof Typography;
