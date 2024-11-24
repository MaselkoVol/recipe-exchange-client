import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  SxProps,
  FormControlProps,
  TextFieldProps,
  OutlinedInputProps,
  useTheme,
  styled,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import MyTextField from "./MyTextField";
import { useColors } from "../../../hooks/useColors";
import { useStyles } from "../../../hooks/useStyles";

type PasswordInputProps = FormControlProps & {
  register: UseFormRegisterReturn;
  label?: string;
  helperText?: string;
};

const CustomOutlinedInput = styled(OutlinedInput)(() => {
  const styles = useStyles();
  return styles.textField.outlinedInput;
});

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = "Password",
  helperText,
  sx,
  register,
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const theme = useTheme();

  return (
    <FormControl {...rest} variant="outlined" error={error}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <CustomOutlinedInput
        sx={{
          borderRadius: "8px",
          borderColor: theme.palette.grey[200],
          outline: "none",
        }}
        {...register}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment sx={{ mr: 1 }} position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordInput;
