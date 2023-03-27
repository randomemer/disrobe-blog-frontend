import SettingsLayout from "@/components/layout/settings";
import useAuth from "@/hooks/use-user";
import withProtectedRoute from "@/modules/backend/with-protected-route";
import {
  ProfileContent,
  ProfileForm,
  UserAvatar,
} from "@/styles/settings-account.styles";
import { SectionHeading, SettingsSection } from "@/styles/settings.styles";
import { InputField } from "@/styles/shared";
import { RouteProps } from "@/types";
import { DescriptionOutlined, MailOutlineSharp } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

export const getServerSideProps = withProtectedRoute<AccountSettingsRouteProps>(
  async (ctx) => {
    return { props: { author: ctx.req.user.author } };
  }
);

interface AccountSettingsRouteProps extends RouteProps {}

export default function AccountSettingsRoute(props: RouteProps) {
  const [auth, setAuth] = useAuth();
  const author = auth.author!;

  return (
    <SettingsLayout>
      <SettingsSection>
        <SectionHeading>Profile</SectionHeading>
        <ProfileContent>
          <UserAvatar alt={author.name} src={`/api/media/${author.picture}`} />
          <ProfileForm>
            <InputField
              defaultValue={author.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineSharp />
                  </InputAdornment>
                ),
              }}
            />
            <InputField
              multiline
              minRows={3}
              defaultValue={auth.author!.bio}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </ProfileForm>
        </ProfileContent>
      </SettingsSection>
    </SettingsLayout>
  );
}
