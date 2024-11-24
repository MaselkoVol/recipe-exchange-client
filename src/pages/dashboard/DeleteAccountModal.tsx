import { Box, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Form from "../../components/UI/Form";
import FormArea from "../../components/FormArea";
import MyButton from "../../components/UI/MyButton";
import LoadingButton from "../../components/UI/LoadingButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { useDeleteCurrentUserMutation } from "../../app/services/currentApi";
import PasswordInput from "../../components/UI/input/PasswordInput";

type Props = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormFields = {
  password: string;
};

const DeleteAccountModal = ({ open, setIsOpen }: Props) => {
  const [deleteUser, { isLoading: isDeleteLoading, error: deleteUserError }] = useDeleteCurrentUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const res = await deleteUser(data.password);
    if (!res.error) {
      dispatch(
        addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully deleted account." })
      );
      navigate("/");
    }
  };
  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }}
      open={open}
      onClose={() => setIsOpen(false)}
    >
      <Box>
        <FormArea startWidth={400} sx={{ display: "flex" }}>
          <Typography variant="h5" component="h2">
            Delete account
          </Typography>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2, display: "flex", gap: 1, flexDirection: "column", width: "100%" }}
          >
            <PasswordInput
              fullWidth
              register={register("password", {
                required: "Password is required",
              })}
              label="Password"
              helperText={errors.password?.message}
              error={!!errors.password}
            />
            <Stack sx={{ mt: 1 }} direction={"row"} justifyContent={"flex-end"} columnGap={2} rowGap={1}>
              <MyButton onClick={() => setIsOpen(false)} type="button" variant="outlined">
                Cancel
              </MyButton>
              <LoadingButton color="error" isLoading={isDeleteLoading} type="submit" variant="contained">
                Delete account
              </LoadingButton>
            </Stack>
          </Form>
        </FormArea>
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;
