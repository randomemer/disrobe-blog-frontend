import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";

export const StorySharing = styled("div")`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

export const ShareButton = styled(IconButton)`
  .${svgIconClasses.root} {
    font-size: 2.4rem;
  }
`;
