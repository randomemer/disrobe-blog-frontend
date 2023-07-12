import { Box } from "@mui/material";
import splashImg from "public/images/splash.png";
import { styled } from "@mui/material/styles";

export const AboutBackground = styled(Box)`
  position: fixed;
  z-index: -99;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${splashImg.src});
  background-size: cover;
  filter: blur(5px);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const AboutContent = styled(Box)`
  margin: 9.6rem auto 12.8rem;
  max-width: 96rem;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

export const Paragraph = styled("p")`
  font-weight: 400;
  font-size: 2rem;
  line-height: 1.6;
`;
