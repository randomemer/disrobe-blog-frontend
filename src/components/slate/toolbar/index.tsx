import ImageEditor from "@/components/slate/image-dialog";
import useWordCount from "@/hooks/use-word-count";
import {
  getActiveLinkNode,
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleLink,
  toggleMark,
} from "@/utils/editor-utils";
import {
  CloudDoneOutlined,
  CloudOffOutlined,
  CloudUploadOutlined,
  CodeOutlined,
  ErrorOutlined,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatListBulletedOutlined,
  FormatListNumberedOutlined,
  FormatQuoteOutlined,
  FormatStrikethroughOutlined,
  FormatUnderlinedOutlined,
  ImageOutlined,
  LinkOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Dialog, ListItem, Typography } from "@mui/material";
import {
  FormatHeader2,
  FormatHeader3,
  FormatHeader4,
  FormatHeader5,
  FormatHeader6,
} from "mdi-material-ui";
import { useState } from "react";
import { useSlate } from "slate-react";
import {
  Aside,
  ContentInfo,
  PublishButton,
  SavingIndicatorDiv,
  SectionButton,
  SectionButtons,
  SectionTitle,
  SettingsButton,
  StoryActions,
  StoryStatus,
  ToolbarSection,
  ToolbarSections,
} from "./styles";

import type { EditorMark, HeadingLevels } from "@/types/slate";
import type { MouseEventHandler, ReactNode } from "react";
import type { Element } from "slate";
import useEditorContext from "@/hooks/use-editor-data";

// ============================================================

type MarkStylesConfig = { style: EditorMark; Icon: ReactNode }[];

const CHARACTER_STYLES: MarkStylesConfig = [
  { style: "bold", Icon: <FormatBoldOutlined /> },
  { style: "italic", Icon: <FormatItalicOutlined /> },
  { style: "strikethrough", Icon: <FormatStrikethroughOutlined /> },
  { style: "underline", Icon: <FormatUnderlinedOutlined /> },
  { style: "code", Icon: <CodeOutlined /> },
];

// ============================================================

type BlockStylesConfig = { style: Element["type"]; Icon: ReactNode }[];

const LIST_STYLES: BlockStylesConfig = [
  { style: "numbered-list", Icon: <FormatListNumberedOutlined /> },
  { style: "bulleted-list", Icon: <FormatListBulletedOutlined /> },
];

// ============================================================

type HeadingStylesConfig = { level: HeadingLevels; Icon: ReactNode }[];

const HEADING_STYLES: HeadingStylesConfig = [
  { level: 2, Icon: <FormatHeader2 /> },
  { level: 3, Icon: <FormatHeader3 /> },
  { level: 4, Icon: <FormatHeader4 /> },
  { level: 5, Icon: <FormatHeader5 /> },
  { level: 6, Icon: <FormatHeader6 /> },
];

// ============================================================

export default function ArticleToolbar() {
  const editor = useSlate();
  const storyInfo = useWordCount();
  // const storyID = useSelector(selectStoryDraftID);

  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const onModalClose = () => {
    setImageModalOpen(false);
  };

  return (
    <>
      <Aside>
        <ToolbarSections>
          {/* HEADING STYLES */}
          <ListItem>
            <ToolbarSection subheader={<SectionTitle>Headings</SectionTitle>}>
              <SectionButtons>
                {HEADING_STYLES.map((item) => (
                  <BlockButton
                    key={item.level}
                    icon={item.Icon}
                    value={"heading"}
                    properties={{ level: item.level }}
                  />
                ))}
              </SectionButtons>
            </ToolbarSection>
          </ListItem>
          {/* CHARACTER STYLES */}
          <ListItem>
            <ToolbarSection subheader={<SectionTitle>Character</SectionTitle>}>
              <SectionButtons>
                {CHARACTER_STYLES.map((item) => (
                  <MarkButton
                    key={item.style}
                    value={item.style}
                    icon={item.Icon}
                  />
                ))}
              </SectionButtons>
            </ToolbarSection>
          </ListItem>
          {/* LIST STYLES */}
          <ListItem>
            <ToolbarSection subheader={<SectionTitle>Lists</SectionTitle>}>
              <SectionButtons>
                {LIST_STYLES.map((item) => (
                  <BlockButton
                    key={item.style}
                    value={item.style}
                    icon={item.Icon}
                  />
                ))}
              </SectionButtons>
            </ToolbarSection>
          </ListItem>
          {/* OTHER ACTIONS */}
          <ListItem>
            <ToolbarSection>
              <SectionTitle>Other</SectionTitle>
              <SectionButtons>
                <ToolbarButton
                  value="link"
                  icon={<LinkOutlined />}
                  isSelected={getActiveLinkNode(editor) !== undefined}
                  onChange={(event) => {
                    event.preventDefault();
                    toggleLink(editor);
                  }}
                />
                <BlockButton
                  value="blockquote"
                  icon={<FormatQuoteOutlined />}
                />
                <ToolbarButton
                  value="image"
                  icon={<ImageOutlined />}
                  isSelected={false}
                  onChange={() => setImageModalOpen(true)}
                />
                {/* <ToolbarButton icon={<CodeBracesBox />} /> */}
              </SectionButtons>
            </ToolbarSection>
          </ListItem>
        </ToolbarSections>
        {/* Status Area */}
        <StoryStatus>
          <StoryActions>
            <PublishButton
              type="button"
              variant="outlined"
              onClick={async () => {
                // @TODO
                // await publishStory(editor, storyID);
              }}
            >
              Publish
            </PublishButton>
            <SettingsButton>
              <SettingsOutlined />
            </SettingsButton>
          </StoryActions>
          <ContentInfo>
            <div className="word-count">{storyInfo.words} words</div>
            <span>●</span>
            <div className="read-time">{storyInfo.read}</div>
          </ContentInfo>
          <SavingIndicator />
        </StoryStatus>
      </Aside>
      {/* Image Editor Dialog */}
      <Dialog
        open={isImageModalOpen}
        onClose={onModalClose}
        disableScrollLock={false}
      >
        <ImageEditor closeModal={onModalClose} />
      </Dialog>
    </>
  );
}

/**
|--------------------------------------------------
|           Toolbar Components
|--------------------------------------------------
*/

function SavingIndicator() {
  const [{ status }] = useEditorContext();
  let icon: ReactNode, message: string;

  switch (status) {
    case "pending":
      icon = <CloudUploadOutlined />;
      message = "Saving";
      break;

    case "fulfilled":
      icon = <CloudDoneOutlined />;
      message = "Saved";
      break;

    case "rejected":
      icon = <ErrorOutlined />;
      message = "Saving Failed";
      break;

    default:
      icon = <CloudOffOutlined />;
      message = "Not Saved";
      break;
  }

  return (
    <SavingIndicatorDiv>
      {icon}
      <Typography>{message}</Typography>
    </SavingIndicatorDiv>
  );
}

// ============================================================

interface ToolbarButtonProps {
  icon: ReactNode;
  value: string;
  isSelected: boolean;
  onChange?: MouseEventHandler<HTMLElement>;
}

function ToolbarButton(props: ToolbarButtonProps) {
  return (
    <SectionButton
      color="primary"
      value={props.value}
      selected={props.isSelected}
      onChange={props.onChange}
    >
      {props.icon}
    </SectionButton>
  );
}

// ============================================================

interface MarkButtonProps
  extends Omit<ToolbarButtonProps, "onChange" | "isSelected"> {
  value: EditorMark;
}

function MarkButton(props: MarkButtonProps) {
  const editor = useSlate();

  const onChange: MouseEventHandler = (event) => {
    event.preventDefault();
    toggleMark(editor, props.value);
  };

  return (
    <ToolbarButton
      icon={props.icon}
      value={props.value}
      onChange={onChange}
      isSelected={isMarkActive(editor, props.value)}
    />
  );
}

// ============================================================

interface BlockButtonProps
  extends Omit<ToolbarButtonProps, "onChange" | "isSelected"> {
  value: Element["type"];
  properties?: Partial<Element>;
}

function BlockButton(props: BlockButtonProps) {
  const editor = useSlate();

  const onChange: MouseEventHandler = (event) => {
    event.preventDefault();
    toggleBlock(editor, props.value, props.properties);
  };

  return (
    <ToolbarButton
      icon={props.icon}
      value={props.value}
      onChange={onChange}
      isSelected={isBlockActive(editor, props.value, props.properties)}
    />
  );
}
