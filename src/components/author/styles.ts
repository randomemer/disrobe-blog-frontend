import { styled } from "@mui/material/styles";
import Image from "next/image";

export const Author = styled("div")`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

export const AuthorImageWrapper = styled("div")`
  position: relative;
  --diameter: 4.8rem;
  height: var(--diameter);
  width: var(--diameter);

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    --diameter: 4.2rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    --diameter: 3.6rem;
  }
`;

export const AuthorImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

export const AuthorDetails = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const AuthorName = styled("span")`
  font-size: 1.8rem;

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    font-size: 1.6rem;
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("md")} {
    font-size: 1.4rem;
  }
`;

export const StoryInfo = styled("p")`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  gap: 0.8rem;
  font-size: 1.6rem;

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    font-size: 1.4rem;
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("md")} {
    font-size: 1.2rem;
  }
`;
