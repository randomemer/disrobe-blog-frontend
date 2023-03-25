import { theme } from "@/modules/mui-config";
import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export function elevation(value: number) {
  return css`
    background-color: ${theme.palette.background.default};
    background-image: linear-gradient(
      rgba(255, 255, 255, ${value}),
      rgba(255, 255, 255, ${value})
    );
  `;
}

export const TextLink = styled(Link)`
  &:link,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
`;
