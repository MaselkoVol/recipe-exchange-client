import styled from "@emotion/styled";
import { AccordionDetails, AccordionDetailsProps } from "@mui/material";
import React from "react";
import { useColors } from "../../../hooks/useColors";

type Props = AccordionDetailsProps & {};

const CustomAccordionDetails = styled(AccordionDetails)(() => {
  const colors = useColors();

  return {
    backgroundColor: colors.bg,
  };
});

const MyAccordionDetails = ({ children, ...rest }: Props) => {
  return <CustomAccordionDetails>{children}</CustomAccordionDetails>;
};

export default MyAccordionDetails;
