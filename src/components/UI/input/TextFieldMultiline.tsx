import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import { FormControl, InputLabel, styled, SxProps, TextareaAutosize } from "@mui/material";
import { useColors } from "../../../hooks/useColors";
import { UseFormSetValue } from "react-hook-form";

const CustomTextArea = styled("textarea")(() => {
  const colors = useColors();
  return {
    padding: "16px 14px 16px 14px",
    lineHeight: 1.5,
    borderWidth: "1px",
    resize: "none",
    overflow: "hidden",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: colors.bg,
    borderColor: colors.grey,
    color: colors.text,
    "&:hover": {
      borderColor: colors.palette.primary.dark,
    },
    "&:focus": {
      outline: colors.palette.primary.main,
      borderColor: colors.palette.primary.main,
    },
  };
});

const CustomContrastTextArea = styled("textarea")(() => {
  const colors = useColors();
  return {
    padding: "16px 14px 16px 14px",
    lineHeight: 1.5,
    borderWidth: "1px",
    resize: "none",
    overflow: "hidden",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: colors.bg,
    color: colors.text,
    borderColor: colors.bg,
    "&:hover": {
      borderColor: colors.palette.primary.dark,
    },
    "&:focus": {
      outline: colors.palette.primary.main,
      borderColor: colors.palette.primary.main,
    },
  };
});

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  isContrast?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  startValue?: string;
  formValue?: [UseFormSetValue<any>, string];
};

const TextFieldMultiline = forwardRef<HTMLTextAreaElement, Props>(
  ({ rows, label, onChange, isContrast = false, fullWidth = false, startValue, sx, formValue, ...rest }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const size = useResizeObserver(textAreaRef);
    const [value, setValue] = useState("");

    useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(event);
      }
      changeSize();
    };

    const changeSize = () => {
      if (!textAreaRef.current) return;
      const textarea = textAreaRef.current;
      if (textarea.scrollHeight > textarea.clientHeight) {
        while (true) {
          textAreaRef.current.rows += 1;
          if (textarea.scrollHeight - textarea.clientHeight < 10 || textarea.scrollHeight < textarea.clientHeight)
            return;
        }
      } else {
        while (true) {
          if (rows && rows >= textarea.rows) return;
          if (textarea.rows === 1) return;
          textAreaRef.current.rows -= 1;
          if (textarea.scrollHeight > textarea.clientHeight) {
            textAreaRef.current.rows += 1;
            return;
          }
        }
      }
    };

    useEffect(() => {
      if (!startValue) return;
      if (formValue) {
        formValue[0](formValue[1], startValue);
      } else if (textAreaRef.current) {
        textAreaRef.current.value = startValue;
      } else return;
      // give some time to react on changes
      requestAnimationFrame(() => {
        changeSize();
      });
    }, [startValue]);

    useEffect(() => {
      changeSize();
    }, [size]);

    const Textarea = isContrast ? CustomContrastTextArea : CustomTextArea;
    return (
      <FormControl sx={{ width: fullWidth ? "100%" : "auto", ...sx }}>
        <Textarea rows={rows} placeholder={label || ""} ref={textAreaRef} onChange={handleChange} {...rest} />
      </FormControl>
    );
  }
);

export default TextFieldMultiline;
