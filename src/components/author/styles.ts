import { styled } from "@mui/material/styles";
import Image from "next/image";

export const Author = styled("div")`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

export const AuthorImageWrapper = styled("div")`
  position: relative;
  --diameter: 4.8rem;
  height: var(--diameter);
  width: var(--diameter);
`;

export const AuthorImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

export const AuthorDetails = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .author-name {
    font-size: 1.8rem;
  }

  .story-info {
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    gap: 0.8rem;
  }
`;
