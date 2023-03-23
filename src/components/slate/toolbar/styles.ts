import { elevation } from "@/styles/shared";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";

export const Aside = styled("aside")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 2px rgba(255, 255, 255, 0.15) solid;

  position: fixed;
  top: var(--app-header-height);
  bottom: 0;
  right: 0;
  width: var(--toolbar-width);

  ${elevation(0.05)}
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

export const PublishButton = styled(Button)`
  flex: 1;
  font-size: 1.4rem;
`;

export const SettingsButton = styled(IconButton)`
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

export const SavingIndicatorDiv = styled("div")`
  align-self: flex-end;
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
