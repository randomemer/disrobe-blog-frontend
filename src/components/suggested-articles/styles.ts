import { Box } from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import ImageWithFallback from "@/components/image";

export const ArticlesSidebar = styled(Box)``;

export const SidebarHeading = styled("p")`
  font-weight: 600;
  font-size: 2.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4.8rem;
`;

export const StoriesFlex = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
`;

export const StoryItem = styled("div")`
  position: relative;
  height: 19.6rem;
  overflow: hidden;
`;

export const StoryItemImage = styled(ImageWithFallback)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const StoryItemContentWrapper = styled("div")`
  position: relative;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.7) 85%
  );
`;

export const StoryItemContent = styled("div")`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.4rem;
  padding: 1.8rem;
`;

export const StoryItemHeading = styled("p")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 2rem;
  font-weight: 600;
`;

export const AuthorBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

export const AuthorImage = styled("img")`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
`;

export const AuthorName = styled("span")`
  font-size: 1.4rem;
`;

export const StoryItemLink = styled(Link)`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: white;
  }
`;
