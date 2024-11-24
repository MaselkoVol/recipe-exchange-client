import { styled, TextField, TextFieldProps } from "@mui/material";
import React, { forwardRef } from "react";
import { useColors } from "../../../hooks/useColors";
import { BorderColor } from "@mui/icons-material";
import { useStyles } from "../../../hooks/useStyles";

type Props = TextFieldProps & {
  isContrast?: boolean;
};

const CustomTextField = styled(TextField)(() => {
  const styles = useStyles();
  return {
    "& .MuiOutlinedInput-root": styles.textField.outlinedInput,
    "& .MuiFilledInput-root": styles.textField.filledInput,
  };
});

const CustomContrastTextField = styled(TextField)(() => {
  const styles = useStyles();
  return {
    "& .MuiOutlinedInput-root": styles.textField.outlinedInputContrast,
    "& .MuiFilledInput-root": styles.textField.filledInputContrast,
  };
});

const MyTextField = forwardRef<HTMLElement, Props>(({ isContrast = false, ...rest }, ref) => {
  const InputField = isContrast ? CustomContrastTextField : CustomTextField;
  return <InputField inputRef={ref} {...rest} />;
});

export default MyTextField;
