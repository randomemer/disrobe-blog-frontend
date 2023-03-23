import { theme } from "@/modules/mui-config";

export function elevation(value: number) {
  return `
    background-color: ${theme.palette.background.default};
    background-image: linear-gradient(
      rgba(255, 255, 255, ${value}),
      rgba(255, 255, 255, ${value})
    );
  `;
}
