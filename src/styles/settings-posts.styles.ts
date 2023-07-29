import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PostsList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 3.4rem;
`;

export const PostItem = styled(Card)`
  display: flex;
  height: 13.2rem;
  padding: 1.8rem;
  gap: 3rem;
`;

export const PostContent = styled(Box)`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const PostItemTitle = styled(Typography)`
  font-size: 2.4rem;
  font-weight: 600;
`;

export const PostItemGist = styled(Typography)`
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.4;
`;

export const PostItemActions = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
