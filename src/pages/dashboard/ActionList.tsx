import { Bookmark, Favorite, HistoryEdu } from "@mui/icons-material";
import { List, ListItem, SxProps, Typography, useTheme } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../app/types";
import ClientNavLink from "../../components/UI/ClientNavLink";
import { useColors } from "../../hooks/useColors";

type Props = {
  user: User | undefined;
  sx?: SxProps;
};

const CustomListItem = ({ children }: { children: React.ReactNode }) => {
  const colors = useColors();
  return (
    <ListItem
      sx={{
        borderRadius: 2,
        bgcolor: colors.bg,
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {children}
    </ListItem>
  );
};

const ActionList = ({ sx, user }: Props) => {
  return (
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: 2,
        pt: 0,
        ...sx,
      }}
    >
      <CustomListItem>
        <ClientNavLink sx={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 0.5 }} to="recipes">
          <HistoryEdu sx={{ mr: 1 }} /> My recipes
        </ClientNavLink>
      </CustomListItem>

      <CustomListItem>
        <ClientNavLink sx={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 0.5 }} to="liked/recipes">
          <Favorite sx={{ mr: 1 }} /> Liked recipes
        </ClientNavLink>
      </CustomListItem>

      <CustomListItem>
        <ClientNavLink
          sx={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 0.5 }}
          to="favorite/recipes"
        >
          <Bookmark sx={{ mr: 1 }} /> Favorite recipes
        </ClientNavLink>
      </CustomListItem>
    </List>
  );
};

export default ActionList;
