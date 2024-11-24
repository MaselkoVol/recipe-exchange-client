import { styled, SxProps } from "@mui/material/styles";
import React from "react";

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  sx?: SxProps;
};

const CustomForm = styled("form")(() => ({}));

const Form = ({ children, sx, ...rest }: Props) => {
  return (
    <CustomForm sx={sx} {...rest}>
      {children}
    </CustomForm>
  );
};

export default Form;
