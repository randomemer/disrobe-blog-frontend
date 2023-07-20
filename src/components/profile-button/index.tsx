import useAuth from "@/hooks/use-auth";
import { getMediaURL } from "@/modules/utils";
import { AsyncStatus } from "@/types";
import { EditSharp, LogoutSharp, PersonSharp } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { AccountDetails, AccountMenu, MenuAvatar } from "./styles";

export default function AccountMenuButton() {
  const [auth] = useAuth();
  const { status, author } = auth;
  const [popperOpen, setPopperOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onLogout = () => {
    getAuth().signOut();
    router.push("/auth?type=login");
  };

  if (status.user === AsyncStatus.FULFILLED && status.user != null) {
    if (status.author === AsyncStatus.PENDING) {
      return (
        <>
          <Skeleton variant="circular" height="3.2rem" width="3.2rem" />
        </>
      );
    } else if (status.author === AsyncStatus.FULFILLED && author) {
      return (
        <>
          <IconButton size="small" onClick={() => setPopperOpen(!popperOpen)}>
            <MenuAvatar
              ref={avatarRef}
              src={author.picture ? getMediaURL(author.picture) : undefined}
            />
          </IconButton>

          <AccountMenu
            disableScrollLock
            open={popperOpen}
            anchorEl={avatarRef.current}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            onClose={() => setPopperOpen(false)}
          >
            <AccountDetails>
              <Typography variant="body1" fontWeight={600}>
                {author.name}
              </Typography>
              <Typography variant="body2" color={grey[400]}>
                {getAuth().currentUser?.email}
              </Typography>
            </AccountDetails>
            <Divider />
            <MenuItem href="/settings/profile" component={Link}>
              <ListItemIcon>
                <PersonSharp fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem href="/write" component={Link}>
              <ListItemIcon>
                <EditSharp fontSize="small" />
              </ListItemIcon>
              Write
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <ListItemIcon>
                <LogoutSharp fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </AccountMenu>
        </>
      );
    } else {
      return <></>;
    }
  } else {
    return null;
  }
}
