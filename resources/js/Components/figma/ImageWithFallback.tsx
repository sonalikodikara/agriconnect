import React, { useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string;
};

export function ImageWithFallback({
  src,
  fallback = "/images/placeholder.png",
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
    />
  );
}
