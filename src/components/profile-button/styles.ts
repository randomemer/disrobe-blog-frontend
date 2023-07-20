import { Avatar, Box, Menu } from "@mui/material";
import { styled } from "@mui/material/styles";
import { listClasses } from "@mui/material/List";

export const MenuAvatar = styled(Avatar)`
  height: 3.2rem;
  width: 3.2rem;
`;

export const AccountMenu = styled(Menu)`
  margin-top: 1.4rem;

  .${listClasses.root} {
    width: 25rem;
  }
`;

export const AccountDetails = styled(Box)`
  padding: 1.6rem;
  padding-top: 0.8rem;
`;
