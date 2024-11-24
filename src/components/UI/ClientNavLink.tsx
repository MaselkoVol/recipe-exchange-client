import { styled, SxProps, useTheme } from "@mui/material/styles";
import React, { useMemo } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

type Props = NavLinkProps & {
  sx?: SxProps;
  children: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  selectedLightColor?: string;
  selectedDarkColor?: string;
};

const CustomNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : theme.palette.primary.main,
  textDecoration: "none",
}));

const ClientNavLink = ({
  lightColor,
  darkColor,
  selectedDarkColor,
  selectedLightColor,
  sx,
  children,
  ...rest
}: Props) => {
  const theme = useTheme();
  const color = useMemo(
    () => ({
      standart: theme.palette.mode === "dark" ? darkColor || "white" : lightColor || "black",
      selected:
        theme.palette.mode === "dark"
          ? selectedDarkColor || theme.palette.primary.main
          : selectedLightColor || theme.palette.primary.main,
    }),
    [theme]
  );
  return (
    <CustomNavLink
      sx={{
        "@keyframes fade": {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        ...sx,
      }}
      style={({ isActive, isPending }) => ({
        color: isActive ? color.selected : color.standart,
        animation: isPending ? "fade 1s linear infinite" : "none",
        position: "relative",
      })}
      {...rest}
    >
      {children}
    </CustomNavLink>
  );
};

export default ClientNavLink;
