import { CheckSharp } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ImageItem = styled(ImageListItem, {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active?: boolean }>`
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: all 0.15s ease;

    box-shadow: ${({ theme, $active }) =>
      $active ? `0 0 0 3px ${theme.palette.success.dark} inset` : `none`};
  }

  &:hover::after {
    ${({ $active, theme }) =>
      !$active && `box-shadow: 0 0 0 3px ${theme.palette.primary.main} inset;`}
  }

  img {
    object-fit: cover;
  }
`;

export const ImageHighlight = styled(Box)`
  position: absolute;
  right: 0;
  z-index: 1;
  bottom: 0;
  padding-right: 3px;
  padding-bottom: 3px;

  &::after {
    content: "";
    font-size: 0px;
    line-height: 0%;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0px;

    z-index: -2;
    border-bottom: 40px solid ${({ theme }) => theme.palette.success.dark};
    border-left: 40px solid transparent;
  }
`;

export const CheckMarkIcon = styled(CheckSharp)`
  font-size: 1.8rem;
`;
