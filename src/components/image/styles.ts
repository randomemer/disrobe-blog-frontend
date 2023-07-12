import { elevation } from "@/styles/shared";
import { BrokenImageSharp } from "@mui/icons-material";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ImageRoot = styled(Box)`
  position: relative;

  &.broken {
    width: 100%;
    padding-bottom: 56.25%;

    ${elevation(0.05)}
  }
`;

export const BrokenImage = styled(BrokenImageSharp)`
  font-size: 4.8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
