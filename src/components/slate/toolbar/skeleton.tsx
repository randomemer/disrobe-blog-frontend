import {
  FormatQuoteOutlined,
  ImageOutlined,
  LinkOutlined,
} from "@mui/icons-material";
import { ListItem, Skeleton, ToggleButton } from "@mui/material";
import { CHARACTER_STYLES, HEADING_STYLES, LIST_STYLES } from ".";
import {
  Aside,
  SectionButton,
  SectionButtons,
  SectionTitle,
  StoryStatus,
  ToolbarSection,
  ToolbarSections,
} from "./styles";

export default function ToolbarSkeleton() {
  return (
    <Aside>
      <ToolbarSections>
        <ListItem>
          <ToolbarSection subheader={<SectionTitle>Headings</SectionTitle>}>
            <SectionButtons>
              {HEADING_STYLES.map((item, i) => (
                <SectionButton
                  key={item.level}
                  color="primary"
                  value={item.level}
                >
                  {item.Icon}
                </SectionButton>
              ))}
            </SectionButtons>
          </ToolbarSection>
        </ListItem>
        <ListItem>
          <ToolbarSection subheader={<SectionTitle>Character</SectionTitle>}>
            <SectionButtons>
              {CHARACTER_STYLES.map((item) => (
                <SectionButton
                  key={item.style}
                  color="primary"
                  value={item.style}
                >
                  {item.Icon}
                </SectionButton>
              ))}
            </SectionButtons>
          </ToolbarSection>
        </ListItem>
        <ListItem>
          <ToolbarSection subheader={<SectionTitle>Lists</SectionTitle>}>
            <SectionButtons>
              {LIST_STYLES.map((item) => (
                <SectionButton
                  color="primary"
                  key={item.style}
                  value={item.style}
                >
                  {item.Icon}
                </SectionButton>
              ))}
            </SectionButtons>
          </ToolbarSection>
        </ListItem>
        {/* OTHER ACTIONS */}
        <ListItem>
          <ToolbarSection>
            <SectionTitle>Other</SectionTitle>
            <SectionButtons>
              <SectionButton color="primary" value="link">
                <LinkOutlined />
              </SectionButton>
              <SectionButton color="primary" value="blockquote">
                <FormatQuoteOutlined />
              </SectionButton>
              <SectionButton color="primary" value="image">
                <ImageOutlined />
              </SectionButton>
              {/* <ToolbarButton icon={<CodeBracesBox />} /> */}
            </SectionButtons>
          </ToolbarSection>
        </ListItem>
      </ToolbarSections>

      <StoryStatus>
        <Skeleton variant="rectangular" height="2.4rem" />
        <Skeleton variant="rectangular" height="2.4rem" />
      </StoryStatus>
    </Aside>
  );
}
