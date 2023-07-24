import FacebookLogo from "@/assets/images/icons/facebook-logo";
import LinkedinLogo from "@/assets/images/icons/linkedin-logo";
import TwitterLogo from "@/assets/images/icons/twitter-logo";
import { app } from "@/modules/backend/client";
import { facebookURL, linkedinURL, twitterURL } from "@/modules/utils";
import { LinkOutlined } from "@mui/icons-material";
import { getAnalytics } from "firebase/analytics";
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
  const storyLink = `${origin}${router.asPath}`;

  const analytics = app && getAnalytics(app);

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
    const shareLink = twitterURL(storyLink);
    window.open(shareLink, "_blank", "noreferrer");
    // logEvent(analytics, "share", {
    //   item_id: id,
    //   content_type: "story",
    //   method: "twitter",
    // });
  };

  const shareFacebook = () => {
    const shareLink = facebookURL(storyLink);
    window.open(shareLink, "_blank", "noreferrer");
    // logEvent(analytics, "share", {
    //   item_id: id,
    //   content_type: "story",
    //   method: "facebook",
    // });
  };

  const shareLinkedin = () => {
    const shareLink = linkedinURL(storyLink);
    window.open(shareLink, "_blank", "noreferrer");
    // logEvent(analytics, "share", {
    //   item_id: id,
    //   content_type: "story",
    //   method: "linkedin",
    // });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(storyLink);
    // logEvent(analytics, "share", {
    //   item_id: "",
    //   content_type: "story",
    //   method: "copy_link",
    // });
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
