import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";

export const StorySharing = styled("div")`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const ShareButton = styled(IconButton)`
  .${svgIconClasses.root} {
    font-size: 3rem;
  }
`;
