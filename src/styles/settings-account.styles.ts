import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ProfileContent = styled("div")`
  display: flex;
  gap: 7.2rem;
`;

export const ProfileForm = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const UserAvatar = styled(Avatar)`
  height: 12.8rem;
  width: 12.8rem;
  font-size: 4.8rem;
`;
