import { SxProps, Typography, TypographyProps } from "@mui/material";
import React from "react";
import { useColors } from "../../hooks/useColors";

type Props = TypographyProps & {
  mb?: number;
  textAlign?: "left" | "center" | "right";
};

const MyLabel = ({ children, sx, mb = 0.5, textAlign = "left" }: Props) => {
  const colors = useColors();
  return (
    <Typography
      sx={{
        textAlign: textAlign,
        mb: mb,
        fontWeight: 700,
        color: colors.palette.primary.main,
        ...sx,
      }}
      variant="subtitle1"
      component="h2"
    >
      {children}
    </Typography>
  );
};

export default MyLabel;
