import React, { useState } from "react";
import MyButton from "../../components/UI/MyButton";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import LoadingButton from "../../components/UI/LoadingButton";
import { useDeleteRecipeMutation } from "../../app/services/recipeApi";
import { Recipe } from "../../app/types";
import { useDispatch } from "react-redux";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";

type Props = {
  recipe?: Recipe;
};

const DeleteRecipe = ({ recipe }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [deleteRecipe, { isLoading: isDelLoading }] = useDeleteRecipeMutation();
  const handleDelete = async () => {
    if (!recipe?.id) return;
    const res = await deleteRecipe(recipe.id);
    setIsDelOpen(false);
    if (res.error) {
      dispatch(addToSnackBar({ livingTime: 2000, severity: "error", text: "Sorry, we couldn't delete your recipe." }));
    } else {
      dispatch(
        addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully deleted your recipe." })
      );
      navigate("/current/recipes");
    }
  };
  return (
    <>
      <MyButton onClick={() => setIsDelOpen(true)} variant="outlined" endIcon={<Delete />} color="error">
        Delete
      </MyButton>
      <Dialog
        sx={{ mx: "auto", maxWidth: 400 }}
        open={isDelOpen}
        onClose={() => setIsDelOpen(false)}
        aria-labelledby="logout"
      >
        <DialogTitle>Delete recipe </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete your recipe?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <MyButton color="info" sx={{ m: 1 }} onClick={() => setIsDelOpen(false)}>
            Cancel
          </MyButton>
          <LoadingButton isLoading={isDelLoading} variant="outlined" color="error" onClick={handleDelete} autoFocus>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteRecipe;
