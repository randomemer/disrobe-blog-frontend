import { ListItem } from "@mui/material";
import { Sidebar } from "./styles";

const LIST_ITEMS = ["preview"];

export default function StorySettingsSidebar() {
  return (
    <Sidebar>
      {LIST_ITEMS.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </Sidebar>
  );
}
