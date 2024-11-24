import { Alert, Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { removeFromSnackBar, SnackBarElementExtended } from "./snackbarSlice";

type Props = {};

const SnackBar = (props: Props) => {
  const elements = useSelector((selector: RootState) => selector.snackBar.elements);
  const [alertElements, setAlertElements] = useState<React.ReactElement[]>([]);
  const [existingElements, setExistingElements] = useState<SnackBarElementExtended[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    elements.forEach((element) => {
      if (existingElements.some((elem) => elem.id === element.id)) return;
      setExistingElements([...existingElements, element]);
      setTimeout(() => {
        setExistingElements(existingElements.filter((curElement) => curElement.id !== element.id));
        dispatch(removeFromSnackBar(element));
      }, element.livingTime);
    });
    const jsxElements = elements.map((element) => (
      <Alert
        key={element.id}
        variant="filled"
        severity={element.severity}
        onClose={() => {
          dispatch(removeFromSnackBar(element));
        }}
      >
        {element.text}
      </Alert>
    ));
    setAlertElements(jsxElements);
  }, [elements]);
  return (
    <Box sx={{ position: "fixed", zIndex: 200, bottom: 10, left: 10 }}>
      <Stack spacing={2}>{alertElements}</Stack>
    </Box>
  );
};

export default SnackBar;
