import withAuth from "@/components/auth/hoc";
import AppLayout from "@/components/layout/app";
import StorySettingsSidebar from "@/components/story-settings/story-settings-sidebar";
import MetaTitleSection from "@/components/story-settings/meta-title-section";
import useStorySettings from "@/hooks/use-story-settings";
import { truncateMetaDesc } from "@/modules/utils";
import { StoryCard } from "@/pages";
import { MainWrapper } from "@/styles/shared";
import {
  Content,
  MetaFieldRow,
  MetaImgPreview,
  Section,
  SectionHeading,
  SectionItem,
  StorySettingsContainer,
} from "@/styles/story-settings.styles";
import { AsyncStatus } from "@/types";
import { StoryJoinedJSON } from "@/types/backend";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MetaDescSection from "@/components/story-settings/meta-desc-section";
import MetaImgSection from "@/components/story-settings/meta-img-section";

function StorySettingsRoute() {
  const router = useRouter();
  const [{ status, story }, setStoryData] = useStorySettings();

  const [desc, setDesc] = useState<string | null>(null);

  const fetchStory = async () => {
    setStoryData((data) => {
      data.status = AsyncStatus.PENDING;
    });
    try {
      const id = router.query.id as string;
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await axios.get<StoryJoinedJSON>(`/api/story/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const story = resp.data;
      console.log(story);
      setDesc(story.settings.meta_desc);
      setStoryData(() => ({ story: resp.data, status: AsyncStatus.FULFILLED }));
    } catch (error) {
      console.error(error);
      setStoryData((data) => {
        data.status = AsyncStatus.REJECTED;
      });
    }
    setStoryData((data) => {
      data.status = AsyncStatus.FULFILLED;
    });
  };

  useEffect(() => {
    fetchStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (status) {
    case AsyncStatus.PENDING:
      return <StorySettingsSkeleton />;

    case AsyncStatus.FULFILLED:
      return (
        <AppLayout>
          <MainWrapper>
            <StorySettingsContainer>
              <StorySettingsSidebar />
              <Content>
                <Section>
                  <SectionHeading component="h2" variant="h4">
                    Preview
                  </SectionHeading>
                  <StoryCard story={story!} />
                </Section>

                <Section>
                  <SectionHeading component="h2" variant="h4">
                    Story Metadata
                  </SectionHeading>

                  <MetaTitleSection />
                  <MetaDescSection />
                  <MetaImgSection />
                </Section>
              </Content>
            </StorySettingsContainer>
          </MainWrapper>
        </AppLayout>
      );

    default:
      return <>Some error must have occurred</>;
  }
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
