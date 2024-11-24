import { AccordionSummary, AccordionSummaryProps, styled } from "@mui/material";
import React from "react";
import { useColors } from "../../../hooks/useColors";

type Props = AccordionSummaryProps & {};

const CustomSummary = styled(AccordionSummary)(() => {
  const colors = useColors();
  return {
    backgroundColor: colors.bg,
    borderBottom: `1px solid ${colors.grey}`,
    borderRadius: 4,
    marginBottom: -1,
    cursor: "pointer",
  };
});

const MyAccordionSummary = ({ children, ...rest }: Props) => {
  return <CustomSummary>{children}</CustomSummary>;
};

export default MyAccordionSummary;
