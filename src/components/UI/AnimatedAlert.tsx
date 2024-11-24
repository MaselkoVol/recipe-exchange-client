import { Alert, AlertProps, Box, SxProps } from "@mui/material";
import React from "react";

type Props = AlertProps & {
  open: boolean;
  animationSpeed?: number;
  alertSx?: SxProps;
  mt?: number;
};

const AnimatedAlert = ({ animationSpeed, mt = 0, open, sx, alertSx, children, ...rest }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: `grid-template-rows ${animationSpeed ? animationSpeed + "s" : ".3s"} ease`,
        ...sx,
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Alert sx={{ mt: mt, ...alertSx }} {...rest}>
          {children}
        </Alert>
      </Box>
    </Box>
  );
};

export default AnimatedAlert;
