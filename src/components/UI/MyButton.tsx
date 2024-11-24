import React from "react";
import { Button, ButtonProps, Palette, styled } from "@mui/material";
import { useColors } from "../../hooks/useColors";

type Props = ButtonProps & {
  children?: React.ReactNode;
};

const CustomButton = styled(Button)(() => {
  return {
    borderRadius: 8,
  };
});

const MyButton = ({ children, sx, ...rest }: Props) => {
  return (
    <CustomButton
      sx={{
        ...sx,
      }}
      disableElevation
      {...rest}
    >
      {children}
    </CustomButton>
  );
};

export default MyButton;
