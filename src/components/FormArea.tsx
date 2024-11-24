import { Box, Paper, SxProps, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { useColors } from "../hooks/useColors";

type Props = {
  children: React.ReactNode;
  sx?: SxProps;
  startWidth?: number;
};

const FormArea = ({ children, sx, startWidth }: Props) => {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          transition: "none",
          bgcolor: colors.bg,
          borderRadius: 3,
          p: { xs: 3, sm: 5 },
          width: `min(calc(100vw - 32px), ${startWidth + "px" || "400px"})`,
          zIndex: 10,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default FormArea;
