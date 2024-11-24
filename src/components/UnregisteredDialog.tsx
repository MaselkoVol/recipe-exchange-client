import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useEffect } from "react";
import MyButton from "./UI/MyButton";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnregisteredDialog = ({ open, setIsOpen }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Dialog sx={{ mx: "auto", maxWidth: 400 }} open={open} onClose={() => setIsOpen(false)} aria-labelledby="logout">
      <DialogTitle>You are not authorized</DialogTitle>
      <DialogContent>
        <DialogContentText>To do this action, you have to log into your accaunt</DialogContentText>
      </DialogContent>
      <DialogActions>
        <MyButton color="info" sx={{ m: 1 }} onClick={() => setIsOpen(false)}>
          Cancel
        </MyButton>
        <MyButton
          variant="outlined"
          onClick={() => navigate("/login", { state: { returnTo: location.pathname } })}
          autoFocus
          color="primary"
          sx={{ m: 1 }}
        >
          Log in
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};

export default UnregisteredDialog;
