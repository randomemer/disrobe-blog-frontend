import { elevation } from "@/styles/shared";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const EimageContainer = styled("div")`
  margin: 0 auto;
  width: 100%;
`;

export const ImageContainer = styled("figure")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

export const ImageWrapper = styled("div")`
  position: relative;
`;

export const EImage = styled("img")`
  transition: all 0.3s;
  max-height: 48rem;
  max-width: 100%;
  object-fit: cover;

  .selected & {
    box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.palette.primary.main};
  }
`;

export const ImageCaption = styled("figcaption")`
  /* align-self: center; */
  /* width: 80%; */
`;

export const CaptionField = styled(TextField)`
  .MuiInput-root {
    font-size: 1.6rem;
  }
`;

export const ButtonsWrapper = styled("div")`
  position: absolute;
  top: 15px;
  right: 15px;

  display: flex;
  gap: 15px;
  flex-direction: row-reverse;
  transition: all 0.3s ease;
`;

export const ButtonWrapper = styled("div")`
  border-radius: 4px;
  ${elevation(0.1)}
`;

export const DeleteButton = styled(Button)`
  min-width: unset;

  .MuiSvgIcon-root {
    font-size: 2.4rem;
  }
`;
