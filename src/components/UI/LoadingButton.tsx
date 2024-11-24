import React from "react";
import MyButton from "./MyButton";
import { Box, ButtonProps, CircularProgress } from "@mui/material";
import { useColors } from "../../hooks/useColors";

type Props = ButtonProps & {
  isLoading: boolean;
  children: React.ReactNode;
};

const LoadingButton = ({ isLoading, color, children, ...rest }: Props) => {
  return (
    <MyButton color={color} disabled={isLoading} {...rest}>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            aspectRatio: "1/1",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {isLoading && <CircularProgress color={color} size={"100%"} />}
        </Box>
        <Box sx={{ opacity: isLoading ? 0 : 1, userSelect: isLoading ? "none" : "all" }}>{children}</Box>
      </Box>
    </MyButton>
  );
};

export default LoadingButton;
