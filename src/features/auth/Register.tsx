import { Box, CircularProgress, TextField, useTheme, Typography, Stack } from "@mui/material";
import React from "react";
import { useLoginMutation, useRegisterMutation } from "../../app/services/authApi";
import ClientLink from "../../components/UI/ClientLink";
import MyButton from "../../components/UI/MyButton";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordInput from "../../components/UI/input/PasswordInput";
import FormArea from "../../components/FormArea";
import { responseErrorCheck } from "../../utils/functions/responseErrorCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import Form from "../../components/UI/Form";
import LoadingButton from "../../components/UI/LoadingButton";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import MyTextField from "../../components/UI/input/MyTextField";
import { addToSnackBar } from "../snackbar/snackbarSlice";

type FormFields = {
  name: string;
  email: string;
  password: string;
};

type Props = {};

const Register = (props: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [callRegister, { isLoading, error }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await callRegister(data);
    if (!result.error) {
      dispatch(addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully signed up." }));
      navigate("/login");
    }
  };

  return (
    <FormArea sx={{ flex: 1 }}>
      <Typography variant="h4" component="h1">
        Sign up
      </Typography>

      <Form sx={{ mt: 2, display: "flex", flexDirection: "column", width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <MyTextField
            {...register("name", {
              required: "Username is required",
              maxLength: {
                value: 20,
                message: "Maximum 20 characters",
              },
            })}
            type="text"
            fullWidth
            variant="outlined"
            label="Username"
            size="medium"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <MyTextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            fullWidth
            variant="outlined"
            label="Email"
            size="medium"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <PasswordInput
            fullWidth
            label="Password"
            register={{
              ...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "At least 8 characters long",
                },
              }),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <AnimatedAlert severity="error" open={responseErrorCheck(error)}>
            {responseErrorCheck(error) && error.data.error}
          </AnimatedAlert>
          <LoadingButton isLoading={isLoading} type="submit" size="large" variant={"contained"} sx={{ mt: 1 }}>
            Sign up
          </LoadingButton>
        </Stack>
      </Form>

      <Box
        sx={{
          mt: 1,
          display: "flex",
          columnGap: 1,
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">Already have an account?</Typography>
        <ClientLink to="/login">Log in now</ClientLink>
      </Box>
    </FormArea>
  );
};

export default Register;
