import XLogo from "@/assets/images/icons/x-logo";
import {
  combineURLQuery,
  facebookURL,
  linkedinURL,
  logEvent,
  twitterURL,
} from "@/modules/utils";
import { FacebookRounded, LinkedIn, LinkOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { ShareButton, StorySharing } from "./styles";

export default function StorySocials() {
  const router = useRouter();

  const origin = typeof location !== "undefined" ? location.origin : "";
  const id = router.query.id as string;
  const storyURL = `${origin}${router.asPath}`;

  const shareX = () => {
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
    <StorySharing>
      <ShareButton id="share-twt" onClick={shareX}>
        <XLogo />
      </ShareButton>

      <ShareButton id="share-lnkd" onClick={shareLinkedin}>
        <LinkedIn />
      </ShareButton>

      <ShareButton size="medium" id="share-fb" onClick={shareFacebook}>
        <FacebookRounded />
      </ShareButton>

      <ShareButton id="share-url" onClick={copyLink}>
        <LinkOutlined />
      </ShareButton>
    </StorySharing>
  );
}
