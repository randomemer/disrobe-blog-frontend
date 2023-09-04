import { List, ListItemText } from "@mui/material";
import Link from "next/link";
import { MouseEvent } from "react";
import { Sidebar, SidebarItem, SidebarTitle } from "./styles";

export const LIST_ITEMS = [
  { hash: "#preview", label: "Preview" },
  { hash: "#story-metadata", label: "Story Metadata" },
  { hash: "#actions", label: "Actions" },
];

interface StorySettingsSidebarProps {
  activeSection: string;
}

export default function StorySettingsSidebar(props: StorySettingsSidebarProps) {
  const onItemClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();

    const section = document.querySelector(hash);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Sidebar>
      <SidebarTitle component="h2" variant="h4">
        Story Settings
      </SidebarTitle>
      <List>
        {LIST_ITEMS.map((item) => (
          <SidebarItem
            dense
            key={item.hash}
            component={Link}
            href={item.hash}
            selected={item.hash === props.activeSection}
            onClick={(event) => onItemClick(event, item.hash)}
          >
            <ListItemText>{item.label}</ListItemText>
          </SidebarItem>
        ))}
      </List>
    </Sidebar>
  );
}
