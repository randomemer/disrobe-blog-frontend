import withAuth from "@/components/auth/hoc";
import AppLayout from "@/components/layout/app";
import StoryActions from "@/components/story-settings/actions";
import MetaDescSection from "@/components/story-settings/meta-desc";
import MetaImgSection from "@/components/story-settings/meta-img";
import MetaTitleSection from "@/components/story-settings/meta-title";
import StorySettingsSidebar, {
  LIST_ITEMS,
} from "@/components/story-settings/sidebar";
import useStorySettings from "@/hooks/use-story-settings";
import { api } from "@/modules/utils";
import { StoryCard } from "@/pages";
import { MainWrapper } from "@/styles/shared";
import {
  Content,
  Section,
  SectionHeading,
  StorySettingsContainer,
} from "@/styles/story-settings.styles";
import { AsyncStatus } from "@/types";
import { StoryJoinedJSON } from "@/types/backend";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function StorySettingsRoute() {
  const router = useRouter();
  const [{ status, story }, setStoryData] = useStorySettings();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeHash, setActiveHash] = useState("");

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveHash("#" + entry.target.id);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.5,
      rootMargin: "0px",
    });

    LIST_ITEMS.forEach((item) => {
      const el = document.querySelector(item.hash);
      if (el) observer.observe(el!);
    });

    return () => observer.disconnect();
  }, [status]);

  useEffect(() => {
    window.location.hash = activeHash;
  }, [activeHash]);

  const fetchStory = async () => {
    setStoryData((data) => {
      data.status = AsyncStatus.PENDING;
    });
    try {
      const id = router.query.id as string;
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await api.get<StoryJoinedJSON>(`/v1/story/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
              <StorySettingsSidebar activeSection={activeHash} />
              <Content ref={contentRef}>
                <Section id="preview">
                  <SectionHeading component="h2" variant="h4">
                    Preview
                  </SectionHeading>
                  <StoryCard story={story!} />
                </Section>

                <Section id="story-metadata">
                  <SectionHeading component="h2" variant="h4">
                    Story Metadata
                  </SectionHeading>

                  <MetaTitleSection />
                  <MetaDescSection />
                  <MetaImgSection />
                </Section>

                <Section id="actions">
                  <SectionHeading component="h2" variant="h4">
                    Actions
                  </SectionHeading>

                  <StoryActions />
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
          <StorySettingsSidebar activeSection="" />
        </StorySettingsContainer>
      </MainWrapper>
    </AppLayout>
  );
}

export default withAuth({
  beforeAuth: StorySettingsSkeleton,
  whenAuthed: StorySettingsRoute,
});
