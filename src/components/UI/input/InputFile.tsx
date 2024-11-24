import { SxProps } from "@mui/material";
import React from "react";
import MyButton from "../MyButton";
import { CloudUpload } from "@mui/icons-material";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  sx?: SxProps;
  btnVariant?: "text" | "outlined" | "contained";
};

const InputFile = ({ btnVariant, children, sx, accept, ...rest }: Props) => {
  return (
    <MyButton sx={sx} startIcon={<CloudUpload />} variant={btnVariant || "outlined"}>
      <label
        style={{
          cursor: "pointer",
          width: "100%",
          zIndex: 10,
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          display: "block",
        }}
      >
        <input
          accept={accept}
          style={{
            display: "none",
          }}
          type="file"
          {...rest}
        />
      </label>
      {children}
    </MyButton>
  );
};

export default InputFile;
