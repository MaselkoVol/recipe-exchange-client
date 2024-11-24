import React from "react";
import { Link as LinkRouter, LinkProps } from "react-router-dom";
import { styled, SxProps, useTheme } from "@mui/material/styles";
import { useColors } from "../../hooks/useColors";
import { CSSObject } from "@mui/material/styles";

type Props = LinkProps & {
  children: React.ReactNode;
  sx?: SxProps;
  lightColor?: string;
  darkColor?: string;
  disableHoverEffect?: boolean;
};

const CustomLink = styled(LinkRouter)(() => {
  const colors = useColors();
  const styles: CSSObject = {
    textDecoration: "none",
    color: colors.palette.primary.main,
    ":hover": {
      textDecoration: "underline",
    },
  };
  return styles;
});

const CustomLinkDisableUnderline = styled(LinkRouter)(() => {
  const colors = useColors();
  const styles: CSSObject = {
    textDecoration: "none",
    color: colors.palette.primary.main,
    ":hover": {
      textDecoration: "none",
    },
  };
  return styles;
});

const ClientLink = ({ darkColor, lightColor, to, children, disableHoverEffect = false, sx, ...rest }: Props) => {
  const colors = useColors();
  const FinalLink = disableHoverEffect ? CustomLinkDisableUnderline : CustomLink;
  return (
    <FinalLink
      sx={{
        ...sx,
        color: colors.palette.mode === "dark" ? darkColor : lightColor,
      }}
      to={to || "#"}
      {...rest}
    >
      {children}
    </FinalLink>
  );
};

export default ClientLink;
