import React, { useEffect, useMemo, useState } from "react";
import ThemeSwitch from "../features/theme/ThemeSwitch";
import { AppBar, Box, Drawer, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import ClientLink from "./UI/ClientLink";
import { AccountCircle, Login, Logout, Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { renewColorOnBackground } from "../utils/functions/colorFunctions";
import Logo from "./Logo";
import LogoText from "./LogoText";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useColors } from "../hooks/useColors";
import styled from "@emotion/styled";
type Props = {};

const links = [
  ["Home", "/"],
  ["Find recipes", "/recipes"],
];

const CustomAppBar = styled(AppBar)`
  padding-right: 0 !important;
`;

const Header = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const colors = useColors();
  const primaryColor = useMemo(() => {
    return colors.header;
  }, [colors]);
  const renewedPrimaryColor = useMemo(() => {
    return renewColorOnBackground(primaryColor, "#ffffff", 0.8);
  }, [primaryColor]);

  const isAuthenticated = useSelector((selector: RootState) => selector.auth.status);

  return (
    <CustomAppBar
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        bgcolor: `rgba(${renewedPrimaryColor}, 0.8)`,
        backdropFilter: "blur(5px)",
        boxShadow: `0 0 5px ${renewedPrimaryColor}`,
        transition: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <Menu />
            </IconButton>

            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
              <List
                sx={{
                  p: 2,
                  bgcolor: colors.bg,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", position: "relative", alignItems: "flex-end" }}>
                  <Logo style={{ position: "relative", top: -2, width: 45, height: 45, zIndex: 10 }} />
                  <Box sx={{ position: "relative", top: 8, ml: -1, zIndex: 5 }}>
                    <LogoText style={{ width: 100 }} />
                  </Box>
                </Box>
                <Box sx={{ pr: 4 }}>
                  {links.map((link, idx) => (
                    <ListItem key={idx}>
                      <ClientLink darkColor="white" to={link[1]}>
                        <Typography variant="h5">{link[0]}</Typography>
                      </ClientLink>
                    </ListItem>
                  ))}
                </Box>
              </List>
            </Drawer>
          </Box>

          <Box sx={{ display: "flex", position: "relative", alignItems: "flex-end" }}>
            <Logo style={{ position: "relative", top: -2, width: 45, height: 45 }} />
            <Box sx={{ position: "relative", top: 8, ml: -1, zIndex: -1 }}>
              <LogoText style={{ width: 100 }}></LogoText>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <ul
            style={{
              flexWrap: "wrap",
              display: "flex",
              alignItems: "center",
              listStyle: "none",
              columnGap: 20,
            }}
          >
            {links.map((link, idx) => (
              <li style={{ flexGrow: 1 }} key={idx}>
                <ClientLink lightColor="white" darkColor="white" to={link[1]}>
                  {link[0]}
                </ClientLink>
              </li>
            ))}
          </ul>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ThemeSwitch />
          {isAuthenticated ? (
            <ClientLink to="/current/recipes">
              <IconButton>
                <AccountCircle sx={{ fontSize: 32, color: "white" }} />
              </IconButton>
            </ClientLink>
          ) : (
            <ClientLink to="/login">
              <IconButton>
                <Login
                  sx={{
                    color: "#ffffff",
                    fontSize: 28,
                    position: "relative",
                    left: -3,
                  }}
                />
              </IconButton>
            </ClientLink>
          )}
        </Box>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
