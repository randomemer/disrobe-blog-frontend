import withAuth from "@/components/auth/hoc";
import AppLayout from "@/components/layout/app";
import StorySettingsSidebar from "@/components/story-settings-sidebar";
import { MainWrapper } from "@/styles/shared";
import { StorySettingsContainer } from "@/styles/story-settings.styles";

function StorySettingsRoute() {
  return (
    <AppLayout>
      <MainWrapper>
        <StorySettingsContainer>
          <StorySettingsSidebar />
        </StorySettingsContainer>
      </MainWrapper>
    </AppLayout>
  );
}

function StorySettingsSkeleton() {
  return <AppLayout></AppLayout>;
}

export default withAuth({
  beforeAuth: StorySettingsSkeleton,
  whenAuthed: StorySettingsRoute,
});
