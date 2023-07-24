import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";

export const StorySharing = styled("div")`
  display: flex;
  align-items: center;
`;

export const ShareButton = styled(IconButton)`
  .${svgIconClasses.root} {
    font-size: 2.4rem;
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    .${svgIconClasses.root} {
      font-size: 2rem;
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    .${svgIconClasses.root} {
      font-size: 1.8rem;
    }
  }
`;
