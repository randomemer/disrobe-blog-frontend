import { HTMLProps } from "react";
import { TabPanelDiv } from "./styles";

export type TabPanelProps = HTMLProps<"div"> & {
  index: number | string;
  label: string;
};

export default function TabPanel(props: TabPanelProps) {
  const { label, value, index, children, ...otherProps } = props;
  return (
    <TabPanelDiv
      role="tabpanel"
      hidden={value !== index}
      id={`${label}-tabpanel-${index}`}
      aria-labelledby={`${label}-tab-${index}`}
      {...otherProps}
    >
      {value === index ? children : null}
    </TabPanelDiv>
  );
}
