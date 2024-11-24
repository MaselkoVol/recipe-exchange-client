import { Box, Container, useTheme } from "@mui/material";
import React, { useMemo } from "react";

type Props = {};

const Footer = (props: Props) => {
  const theme = useTheme();
  const primaryColor = useMemo(
    () => (theme.palette.mode === "dark" ? "#181818" : theme.palette.secondary.main),
    [theme]
  );
  return (
    <Box sx={{ bgcolor: primaryColor, py: 2, boxShadow: `0 0 5px ${primaryColor}` }}>
      <Container>
        <Box>{new Date().getFullYear()} All rights reserved.</Box>
      </Container>
    </Box>
  );
};

export default Footer;
