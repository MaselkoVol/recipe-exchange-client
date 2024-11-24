import { Box, CircularProgress, TextField, useTheme, Typography, Skeleton, Stack } from "@mui/material";
import React from "react";
import { useLoginMutation } from "../../app/services/authApi";
import ClientLink from "../../components/UI/ClientLink";
import MyButton from "../../components/UI/MyButton";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordInput from "../../components/UI/input/PasswordInput";
import FormArea from "../../components/FormArea";
import { responseErrorCheck } from "../../utils/functions/responseErrorCheck";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setCredentials } from "./authSlice";
import Form from "../../components/UI/Form";
import LoadingButton from "../../components/UI/LoadingButton";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import MyTextField from "../../components/UI/input/MyTextField";

type FormFields = {
  email: string;
  password: string;
};

type Props = {};

const Login = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, error }] = useLoginMutation();

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
    const result = await login(data);
    if (!result.error) {
      dispatch(setCredentials({ token: result.data.accessToken, status: true }));
      if (location.state?.returnTo) {
        navigate(location.state.returnTo, { preventScrollReset: true });
      } else {
        navigate("/current/recipes");
      }
    }
  };

  return (
    <FormArea sx={{ flex: 1 }}>
      <Typography variant="h4" component="h1">
        Login
      </Typography>

      <Form sx={{ mt: 2, display: "flex", flexDirection: "column", width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
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
            sx={{ width: "100%" }}
            label="Password"
            register={{
              ...register("password", {
                required: "Password is required",
              }),
            }}
            helperText={errors.password?.message}
            error={!!errors.password}
          />

          <AnimatedAlert severity="error" open={responseErrorCheck(error)}>
            {responseErrorCheck(error) && error.data.error}
          </AnimatedAlert>
          <LoadingButton isLoading={isLoading} type="submit" size="large" variant={"contained"} sx={{ mt: 1 }}>
            Log in
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
        <Typography variant="body1">Don't have an account?</Typography>
        <ClientLink to="/register">Sign up now</ClientLink>
      </Box>
    </FormArea>
  );
};

export default Login;
