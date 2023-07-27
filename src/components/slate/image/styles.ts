import ImageWithFallback from "@/components/image";
import { elevation } from "@/styles/shared";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { inputClasses } from "@mui/material/Input";

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

export const EImage = styled(ImageWithFallback)`
  position: relative;

  &.broken {
    height: 48rem;
    width: 100%;
  }

  img {
    transition: all 0.3s;
    /* max-height: 48rem; */
    max-width: 100%;
    object-fit: cover;

    .selected & {
      box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const ImageWrapper = styled("div")`
  position: relative;
  width: 100%;
`;

export const ImageCaption = styled("figcaption")`
  /* align-self: center; */
  /* width: 80%; */
`;

export const CaptionField = styled(TextField)`
  .${inputClasses.root} {
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

  .${svgIconClasses.root} {
    font-size: 2.4rem;
  }
`;
