import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useColors } from "../../../hooks/useColors";

type Props = AccordionProps;

const CustomAccordion = styled(Accordion)(() => {
  const colors = useColors();
  return {
    border: `1px solid ${colors.grey}`,
    borderRadius: 4,
    boxShadow: "none",
    marginBottom: 4,
    overflow: "hidden",
    "&:first-of-type": {
      borderRadius: "8px 8px 4px 4px",
    },
    "&:last-of-type": {
      borderRadius: "4px 4px 8px 8px",
      marginBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  };
});

const MyAccordion = ({ children, ...rest }: Props) => {
  return <CustomAccordion {...rest}>{children}</CustomAccordion>;
};

export default MyAccordion;
