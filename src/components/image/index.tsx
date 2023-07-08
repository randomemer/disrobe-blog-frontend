import { BoxProps } from "@mui/material";
import { ImageProps } from "next/image";
import { HTMLProps, useState } from "react";
import { BrokenImage, ImageRoot } from "./styles";
import NextImage from "next/image";
import classNames from "classnames";

interface HandledImageProps extends BoxProps {
  ImageProps: HTMLProps<HTMLImageElement>;
}

export default function ImageWithFallback(props: HandledImageProps) {
  const { ImageProps, ...BoxProps } = props;
  const [isBroken, setBroken] = useState(!ImageProps.src);

  const onImageError = () => {
    setBroken(true);
  };

  return (
    <ImageRoot
      {...BoxProps}
      className={classNames(BoxProps.className, { broken: isBroken })}
    >
      {!isBroken ? (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img {...ImageProps} onError={onImageError} />
      ) : (
        <BrokenImage />
      )}
    </ImageRoot>
  );
}
