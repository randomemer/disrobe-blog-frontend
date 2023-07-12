import { theme } from "@/modules/mui-config";
import { css } from "@emotion/react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

import { inputClasses } from "@mui/material/Input";
import { svgIconClasses } from "@mui/material/SvgIcon";

export function elevation(value: number) {
  return css`
    background-color: ${theme.palette.background.default};
    background-image: linear-gradient(
      rgba(255, 255, 255, ${value}),
      rgba(255, 255, 255, ${value})
    );
  `;
}

export const PlainLink = styled(Link)`
  &:link,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
`;

export const InputField = styled(TextField)`
  .${inputClasses.root} {
    font-size: 1.6rem;
  }

  .Mui-focused {
    .${svgIconClasses.root} {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  .${svgIconClasses.root} {
    font-size: 2rem;
  }
`;
