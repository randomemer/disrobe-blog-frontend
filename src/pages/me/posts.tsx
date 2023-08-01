import withAuth from "@/components/auth/hoc";
import SettingsLayout from "@/components/layout/settings";
import useAuth from "@/hooks/use-auth";
import { getContentString } from "@/modules/utils";
import {
  PostContent,
  PostItem,
  PostItemActions,
  PostItemGist,
  PostItemTitle,
  PostsList,
} from "@/styles/settings-posts.styles";
import { SectionHeading, SettingsSection } from "@/styles/settings.styles";
import { PlainLink } from "@/styles/shared";
import { AsyncStatus } from "@/types";
import { StoryJoinedJSON } from "@/types/backend";
import { SettingsOutlined } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import axios from "axios";
import $clamp from "clamp-js";
import _ from "lodash";
import { SquareEditOutline } from "mdi-material-ui";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export function SettingsPostsRoute() {
  const [stories, setStories] = useState<StoryJoinedJSON[] | null>(null);
  const [status, setStatus] = useState(AsyncStatus.PENDING);
  const [auth] = useAuth();

  const fetchStories = async () => {
    setStatus(AsyncStatus.PENDING);
    try {
      const filter = {
        eager: { draft: {}, $where: { author_id: auth.uid } },
        limit: 50,
      };
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
            <SectionHeading variant="h4" component="h1">
              Posts
            </SectionHeading>
            <PostsList>
              {stories?.map((item) => (
                <PostItemCard key={item.id} post={item} />
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

interface PostItemCardProps {
  post: StoryJoinedJSON;
}

function PostItemCard(props: PostItemCardProps) {
  const { post } = props;
  const gistRef = useRef<HTMLDivElement>(null);

  const href = `/story/${post.id}`;

  const listener = () => {
    if (gistRef.current) {
      $clamp(gistRef.current, { clamp: "auto" });
    }
  };

  useEffect(() => {
    listener();
    visualViewport?.addEventListener("resize", listener);

    return () => {
      visualViewport?.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <PostItem key={post.id}>
      <PlainLink href={href} sx={{ display: "flex" }}>
        <PostContent>
          <PostItemTitle variant="h5" component="h2">
            {post.draft.title}
          </PostItemTitle>
          <PostItemGist ref={gistRef}>
            {getContentString(post.draft.content)}
          </PostItemGist>
        </PostContent>
      </PlainLink>
      <PostItemActions>
        <IconButton
          color="primary"
          component={Link}
          href={`/story/${post.id}/edit`}
        >
          <SquareEditOutline />
        </IconButton>
        <IconButton component={Link} href={`/story/${post.id}/settings`}>
          <SettingsOutlined />
        </IconButton>
      </PostItemActions>
    </PostItem>
  );
}

function SettingsPostsSkeleton() {
  const titleWidth = useMemo(() => _.random(30, 70), []);

  return (
    <SettingsLayout>
      <SettingsSection>
        <SectionHeading variant="h4" component="h1">
          Posts
        </SectionHeading>
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
                      width: `${titleWidth}%`,
                    }}
                  />
                  <div>
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <Skeleton
                          key={i}
                          sx={{ fontSize: "1.7rem", lineHeight: "1.25" }}
                          variant="text"
                        />
                      ))}
                  </div>
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
