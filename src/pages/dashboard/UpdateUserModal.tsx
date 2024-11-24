import { Box, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Form from "../../components/UI/Form";
import FormArea from "../../components/FormArea";
import MyLabel from "../../components/UI/MyLabel";
import TextFieldMultiline from "../../components/UI/input/TextFieldMultiline";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import OneFileSelect from "../createRecipe/OneFileSelect";
import MyButton from "../../components/UI/MyButton";
import LoadingButton from "../../components/UI/LoadingButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { useUpdateCurrentUserMutation } from "../../app/services/currentApi";
import { User } from "../../app/types";

type Props = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
};
type FormFields = {
  name: string;
  avatar?: File;
};

const UpdateUserModal = ({ open, setIsOpen, user }: Props) => {
  const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
  const [updateUser, { isLoading: isUpdateLoading, error: updateUserError }] = useUpdateCurrentUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!user) return;
    if (selectedMainFile) {
      data.avatar = selectedMainFile;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
    const res = await updateUser(formData);
    if (!res.error) {
      dispatch(addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully deleted acount." }));
      navigate(0);
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
            Update user info
          </Typography>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2, display: "flex", gap: 1, flexDirection: "column", width: "100%" }}
          >
            <Stack spacing={1}>
              <MyLabel>Name</MyLabel>
              <TextFieldMultiline
                formValue={[setValue, "name"]}
                startValue={user?.name}
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "maximum 20 character",
                  },
                })}
                label="Name"
              />
              <AnimatedAlert open={!!errors.name?.message} severity="error">
                {errors.name?.message}
              </AnimatedAlert>
            </Stack>
            <Stack spacing={0.5}>
              <MyLabel>Avatar Image</MyLabel>
              <OneFileSelect
                compressTo={[100, 100]}
                startImageUrl={user?.avatarUrl}
                selectedFile={selectedMainFile}
                setSelectedFile={setSelectedMainFile}
                inputText="Choose avatar image"
              />
              <AnimatedAlert open={!!errors.avatar?.message} severity="error">
                {errors.avatar?.message}
              </AnimatedAlert>
            </Stack>
            <Stack sx={{ mt: 1 }} direction={"row"} justifyContent={"flex-end"} columnGap={2} rowGap={1}>
              <MyButton onClick={() => setIsOpen(false)} type="button" variant="outlined">
                Cancel
              </MyButton>
              <LoadingButton isLoading={isUpdateLoading} type="submit" variant="contained">
                Update recipe
              </LoadingButton>
            </Stack>
          </Form>
        </FormArea>
      </Box>
    </Modal>
  );
};

export default UpdateUserModal;
