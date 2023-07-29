import { LoadingButton } from "@mui/lab";
import { Avatar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";

export const ProfileContent = styled("div")`
  display: flex;
  align-items: flex-start;
  gap: 7.2rem;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    gap: 6.4rem;
  }
`;

export const ProfileForm = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const UserAvatar = styled(Avatar)`
  --size: 15rem;
  height: var(--size);
  width: var(--size);
  font-size: 4.8rem;
`;

export const ProfileFormButton = styled(LoadingButton)`
  align-self: flex-end;
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
`;

export const AvatarEditButton = styled(Button)`
  border-radius: 999em !important; /* overriding default props for button */
  padding: 0;
  width: unset;
  height: unset;
  min-width: unset;
  padding: 5px;

  .${svgIconClasses.root} {
    font-size: 1.8rem;
  }
`;

export const AvatarFileInput = styled("input")`
  display: none;
`;
