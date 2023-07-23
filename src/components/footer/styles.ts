import { elevation, PlainLink } from "@/styles/shared";
import { styled } from "@mui/material/styles";
import { List, ListItem, Typography } from "@mui/material";
import Link from "next/link";

import { svgIconClasses } from "@mui/material/SvgIcon";
import { listItemTextClasses } from "@mui/material/ListItemText";
import { listItemIconClasses } from "@mui/material/ListItemIcon";

export const StyledFooter = styled("footer")`
  padding: 9.6rem 0;
  border-top: 2px solid rgba(255, 255, 255, 0.15);
  background-color: ${({ theme }) => theme.palette.background.default};

  ${elevation(0.1)}

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 6.4rem 0;
  }
`;

export const FooterGrid = styled("div")`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 4.8rem;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12.8rem;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    gap: 9.6rem;
    padding: 0 6.4rem;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 0 3.6rem;
    gap: 4.8rem;
  }
`;

export const FooterColumn = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column: span 2;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-column: span 3;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-column: span 6;
  }
`;

export const FooterColumnLogo = styled(FooterColumn)`
  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-row: 2;
    grid-column: span 6;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-row: 3;
  }
`;

export const DisrobeLogo = styled(Link)`
  font-size: 3rem;
  letter-spacing: 2px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 3rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 2.4rem;
  }
`;

export const Socials = styled("div")`
  display: flex;
  gap: 2rem;
`;

export const SocialLink = styled(Link)`
  color: inherit;

  .${svgIconClasses.root} {
    font-size: 2.7rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    .${svgIconClasses.root} {
      /* font-size: 1.8rem; */
    }
  }
`;

export const Copyright = styled(Typography)`
  font-size: 1.4rem;
  margin-top: 7.2rem;
`;

export const FooterColTitle = styled(Typography)`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 3.6rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 1.8rem;
    margin-bottom: 2.4rem;
  }
`;

export const Contacts = styled(List)``;

export const ContactListItem = styled(ListItem<typeof PlainLink>)`
  .${listItemIconClasses.root} {
    min-width: unset;
    margin-right: 1.4rem;
  }

  .${svgIconClasses.root} {
    font-size: 2.4rem;
  }

  .${listItemTextClasses.root} {
    &,
    * {
      font-size: 1.6rem;
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    .${listItemIconClasses.root} {
      margin-right: 0.9rem;
    }

    .${svgIconClasses.root} {
      font-size: 1.8rem;
    }

    .${listItemTextClasses.root} {
      &,
      * {
        font-size: 1.4rem;
      }
    }
  }
`;

export const QuickLinks = styled(List)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const QuickLink = styled(ListItem<typeof PlainLink>)`
  font-size: 1.8rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 1.4rem;
  }
`;
