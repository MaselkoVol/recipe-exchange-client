import { Box, keyframes, styled, SxProps } from "@mui/material";
import React, { forwardRef } from "react";
import { useColors } from "../../hooks/useColors";

type Props = {
  sx?: SxProps;
  size?: number;
};

const l2 = keyframes`
  100% {box-shadow: 0 0 0 20px #0000}
`;

const CustomLoader = styled("div")(({ size = 20 }: Props) => {
  const colors = useColors();
  return {
    width: size,
    aspectRatio: 1,
    borderRadius: "50%",
    background: colors.palette.primary.main,
    boxShadow: `0 0 0 0 ${colors.palette.primary.light}`,
    animation: `${l2} 1.5s infinite linear`,
    position: "relative",
    "&::before": {
      content: '""', // This should be a string with double quotes
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      boxShadow: `0 0 0 0 ${colors.palette.primary.light}`,
      animation: `${l2} 1.5s infinite linear`, // Apply the same animation keyframes here
      animationDelay: "-0.5s",
    },
    "&::after": {
      content: '""', // This should be a string with double quotes
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      boxShadow: `0 0 0 0 ${colors.palette.primary.light}`,
      animation: `${l2} 1.5s infinite linear`, // Apply the same animation keyframes here
      animationDelay: "-1s",
    },
  };
});

const LoadingPage = forwardRef<HTMLDivElement, Props>(({ sx, size }, ref) => {
  return (
    <Box ref={ref} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, ...sx }}>
      <CustomLoader sx={{ width: size }} />
    </Box>
  );
});

export default LoadingPage;
