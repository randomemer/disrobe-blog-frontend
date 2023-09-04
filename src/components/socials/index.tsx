import FacebookLogo from "@/assets/images/icons/facebook-logo";
import LinkedinLogo from "@/assets/images/icons/linkedin-logo";
import TwitterLogo from "@/assets/images/icons/twitter-logo";
import {
  combineURLQuery,
  facebookURL,
  linkedinURL,
  logEvent,
  twitterURL,
} from "@/modules/utils";
import { LinkOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import { useImmer } from "use-immer";
import { ShareButton, StorySharing } from "./styles";

export default function StorySocials() {
  const router = useRouter();
  const [hoverState, setHoverState] = useImmer<Record<string, boolean>>({
    "share-fb": false,
    "share-lnkd": false,
    "share-twt": false,
  });

  const origin = typeof location !== "undefined" ? location.origin : "";
  const id = router.query.id as string;
  const storyURL = `${origin}${router.asPath}`;

  const onHover: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;

    for (const id in hoverState) {
      setHoverState((state) => {
        const button = document.querySelector(`#${id}`);
        state[id] = !!button?.contains(target) && event.type === "mouseover";
      });
    }
  };

  const shareTwitter = () => {
    const url = combineURLQuery(storyURL, {
      utm_source: "x",
      utm_content: "x_post",
      utm_campaign: "story_share",
      utm_medium: "social",
    });
    const shareLink = twitterURL(url);
    window.open(shareLink, "_blank", "noopener");
    logEvent("share", { item_id: id, content_type: "story", method: "x" });
  };

  const shareFacebook = () => {
    const url = combineURLQuery(storyURL, {
      utm_source: "meta",
      utm_content: "meta_post",
      utm_campaign: "story_share",
      utm_medium: "social",
    });
    const shareLink = facebookURL(url);
    window.open(shareLink, "_blank", "noopener");
    logEvent("share", {
      item_id: id,
      content_type: "story",
      method: "meta",
    });
  };

  const shareLinkedin = () => {
    const url = combineURLQuery(storyURL, {
      utm_source: "linkedin",
      utm_content: "linkedin_post",
      utm_campaign: "story_share",
      utm_medium: "social",
    });
    const shareLink = linkedinURL(url);
    window.open(shareLink, "_blank", "noopener");
    logEvent("share", {
      item_id: id,
      content_type: "story",
      method: "linkedin",
    });
  };

  const copyLink = () => {
    const url = combineURLQuery(storyURL, {
      utm_source: "story_share_btn",
      utm_medium: "social",
      utm_campaign: "story_share",
      utm_content: "copy_link",
    });
    navigator.clipboard.writeText(url);
    logEvent("share", {
      item_id: id,
      content_type: "story",
      method: "copy_link",
    });
  };

  return (
    <StorySharing onMouseOver={onHover} onMouseOut={onHover}>
      <ShareButton size="small" id="share-fb" onClick={shareFacebook}>
        <FacebookLogo colored={hoverState["share-fb"]} />
      </ShareButton>

      <ShareButton size="small" id="share-lnkd" onClick={shareLinkedin}>
        <LinkedinLogo colored={hoverState["share-lnkd"]} />
      </ShareButton>

      <ShareButton size="small" id="share-twt" onClick={shareTwitter}>
        <TwitterLogo colored={hoverState["share-twt"]} />
      </ShareButton>

      <ShareButton size="small" id="share-url" onClick={copyLink}>
        <LinkOutlined />
      </ShareButton>
    </StorySharing>
  );
}
