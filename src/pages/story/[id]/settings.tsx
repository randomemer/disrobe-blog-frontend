import withAuth from "@/components/auth/hoc";
import AppLayout from "@/components/layout/app";
import StorySettingsSidebar from "@/components/story-settings-sidebar";
import { MainWrapper } from "@/styles/shared";
import {
  Content,
  Section,
  SectionTitle,
  StorySettingsContainer,
} from "@/styles/story-settings.styles";

function StorySettingsRoute() {
  return (
    <AppLayout>
      <MainWrapper>
        <StorySettingsContainer>
          <StorySettingsSidebar />
          <Content>
            <Section>
              <SectionTitle component="h2" variant="h5">
                Preview
              </SectionTitle>
            </Section>
          </Content>
        </StorySettingsContainer>
      </MainWrapper>
    </AppLayout>
  );
}

function StorySettingsSkeleton() {
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

export default withAuth({
  beforeAuth: StorySettingsSkeleton,
  whenAuthed: StorySettingsRoute,
});
