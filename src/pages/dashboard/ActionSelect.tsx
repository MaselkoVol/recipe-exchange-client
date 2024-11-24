import { ButtonPropsVariantOverrides, MenuItem, SxProps, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { User } from "../../app/types";
import ClientNavLink from "../../components/UI/ClientNavLink";
import MyTextField from "../../components/UI/input/MyTextField";
import { useColors } from "../../hooks/useColors";

type Props = {
  user: User | undefined;
  sx?: SxProps;
  variant?: "filled" | "outlined" | "standard";
};

const actions: { [key: string]: string } = {
  recipes: "/current/recipes",
  liked: "/current/liked/recipes",
  favorite: "/current/favorite/recipes",
  followers: "/current/followers",
  following: "/current/following",
};

const ActionSelect = ({ user, sx, variant }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState("");
  useEffect(() => {
    const value = location.pathname;
    for (let key in actions) {
      if (actions[key] === value) {
        setSelectValue(key);
        break;
      }
    }
  }, [location]);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value as keyof typeof actions;
    if (value in actions) {
      setSelectValue(value as string);
      navigate(actions[value]);
    }
  };
  return (
    <MyTextField
      isContrast
      variant={variant || "filled"}
      value={selectValue}
      color="primary"
      onChange={handleSelect}
      select
      label="Selected page"
      fullWidth
      sx={{ ...sx }}
    >
      <MenuItem sx={{ fontSize: "1.2rem" }} value="recipes">
        My recipes
      </MenuItem>

      <MenuItem sx={{ fontSize: "1.2rem" }} value="liked">
        Liked recipes
      </MenuItem>

      <MenuItem sx={{ fontSize: "1.2rem" }} value="favorite">
        Favorite recipes
      </MenuItem>
    </MyTextField>
  );
};

export default ActionSelect;
