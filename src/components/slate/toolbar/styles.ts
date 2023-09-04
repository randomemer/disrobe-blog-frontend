import { elevation } from "@/styles/shared";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";
import { paperClasses } from "@mui/material/Paper";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";

export const Aside = styled(Drawer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 2px rgba(255, 255, 255, 0.15) solid;

  ${({ theme }) => theme.breakpoints.up("md")} {
    .${paperClasses.root} {
      width: 30rem;
      position: relative;
      ${elevation(0.05)}
    }
  }
`;

export const ToolbarSections = styled(List)`
  /* position: relative; */
`;

export const ToolbarSection = styled(List)`
  width: 100%;
  position: relative;
`;

export const SectionTitle = styled(ListSubheader)`
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.5px;
  background: none;
`;

export const SectionButtons = styled(ListItem)`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const SectionButton = styled(ToggleButton)`
  width: 4rem;
  height: 4rem;
  transition: all 0.15s ease;
  min-width: unset;
  border-radius: 4px;

  * {
    border-radius: 0;
  }

  .${svgIconClasses.root} {
    font-size: 2.4rem;
  }
`;

export const StoryStatus = styled("div")`
  margin: 2.4rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

export const StoryActions = styled("div")`
  display: flex;
  gap: 1rem;
`;

export const PublishButton = styled(LoadingButton)`
  flex: 1;
  font-size: 1.4rem;
`;

export const SettingsButton = styled(IconButton<typeof Link>)`
  .${svgIconClasses.root} {
    font-size: 2.4rem;
  }
`;

export const ContentInfo = styled("div")`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
  font-size: 1.4rem;
`;

export const SavingIndicatorDiv = styled(Box)`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 5px;

  .${svgIconClasses.root} {
    font-size: 1.8rem;
  }

  .${typographyClasses.root} {
    font-size: 1.4rem;
  }
`;

export const CloseButton = styled(IconButton)`
  align-self: flex-start;
  margin-left: 1.8rem;
  margin-top: 1.2rem;
`;
