import withAuth from "@/components/auth/hoc";
import SettingsLayout from "@/components/layout/settings";
import { getStoryGist } from "@/modules/utils";
import {
  PostContent,
  PostItem,
  PostItemActions,
  PostItemGist,
  PostItemTitle,
  PostsList,
} from "@/styles/settings-posts.styles";
import { SectionHeading, SettingsSection } from "@/styles/settings.styles";
import { AsyncStatus } from "@/types";
import { StoryJoinedJSON } from "@/types/backend";
import { SettingsOutlined } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import axios from "axios";
import _ from "lodash";
import { SquareEditOutline } from "mdi-material-ui";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SettingsPostsRoute() {
  const [stories, setStories] = useState<StoryJoinedJSON[] | null>(null);
  const [status, setStatus] = useState(AsyncStatus.PENDING);

  const fetchStories = async () => {
    setStatus(AsyncStatus.PENDING);
    try {
      const filter = { eager: { draft: {} }, limit: 50 };
      const query = `filter=${encodeURIComponent(JSON.stringify(filter))}`;

      const resp = await axios.get<StoryJoinedJSON[]>(`/api/story?${query}`);
      setStories(resp.data);
      setStatus(AsyncStatus.FULFILLED);
    } catch (error) {
      console.error(error);
      setStatus(AsyncStatus.REJECTED);
    }
  };

  useEffect(() => {
    fetchStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (status) {
    case AsyncStatus.PENDING: {
      return <SettingsPostsSkeleton />;
    }

    case AsyncStatus.FULFILLED: {
      return (
        <SettingsLayout>
          <SettingsSection>
            <SectionHeading>Posts</SectionHeading>
            <PostsList>
              {stories?.map((item) => (
                <PostItem key={item.id}>
                  <PostContent>
                    <PostItemTitle>{item.draft.title}</PostItemTitle>
                    <PostItemGist>
                      {getStoryGist(item.draft.content, 127)}
                    </PostItemGist>
                  </PostContent>
                  <PostItemActions>
                    <IconButton
                      color="primary"
                      component={Link}
                      href={`/story/${item.id}/edit`}
                    >
                      <SquareEditOutline />
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={`/story/${item.id}/settings`}
                    >
                      <SettingsOutlined />
                    </IconButton>
                  </PostItemActions>
                </PostItem>
              ))}
            </PostsList>
          </SettingsSection>
        </SettingsLayout>
      );
    }

    default: {
      return <></>;
    }
  }
}

export function SettingsPostsSkeleton() {
  return (
    <SettingsLayout>
      <SettingsSection>
        <SectionHeading>Posts</SectionHeading>
        <PostsList>
          {Array(3)
            .fill(null)
            .map((val, i) => (
              <PostItem key={i}>
                <PostContent>
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "2.4rem",
                      marginBottom: "1.2rem",
                      width: `${_.random(30, 70)}%`,
                    }}
                  />
                  {Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <Skeleton
                        key={i}
                        sx={{ fontSize: "1.7rem", lineHeight: "1.25" }}
                        variant="text"
                      />
                    ))}
                </PostContent>
              </PostItem>
            ))}
        </PostsList>
      </SettingsSection>
    </SettingsLayout>
  );
}

export default withAuth({
  beforeAuth: SettingsPostsSkeleton,
  whenAuthed: SettingsPostsRoute,
});
