import React, { createElement, useEffect, useRef, useState } from "react";
import { styled, SxProps } from "@mui/material/styles";
import { Box, Skeleton } from "@mui/material";
import { useInView } from "framer-motion";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  sx?: SxProps;
  src: string;
};

const CustomImage = styled("img")(() => ({}));

const Image = ({ sx, src, ...rest }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  return (
    <Box ref={ref} sx={{ position: "relative", ...sx }}>
      <CustomImage
        src={isInView ? src : "#"}
        onLoad={() => setIsLoaded(true)}
        sx={{
          opacity: !isInView || !isLoaded ? 0 : 1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
        {...rest}
      />
      <Skeleton
        sx={{
          opacity: !isInView || !isLoaded ? 1 : 0,
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        animation="wave"
        variant="rectangular"
      />
    </Box>
  );
};

export default Image;
