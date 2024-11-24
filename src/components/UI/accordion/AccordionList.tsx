import { Box, SxProps } from "@mui/material";
import React, { useMemo, useState } from "react";
import MyAccordion from "./MyAccordion";
import MyAccordionSummary from "./MyAccordionSummary";
import MyAccordionDetails from "./MyAccordionDetails";

export type AccordionNodeType = {
  summary: React.ReactNode | string;
  details: React.ReactNode | string | undefined;
};

type Props = {
  elements: AccordionNodeType[];
  linked?: boolean;
  sx?: SxProps;
};

const AccordionList = ({ sx, elements, linked = false }: Props) => {
  const [expanded, setExpanded] = useState(-1);
  const handleChange = (event: React.SyntheticEvent<Element, Event>, idx: number) => {
    setExpanded(idx === expanded ? -1 : idx);
  };
  const renderAccordion = (element: AccordionNodeType, idx: number) => {
    return linked ? (
      <MyAccordion sx={sx} expanded={idx === expanded} onChange={(e) => handleChange(e, idx)} key={idx}>
        <MyAccordionSummary>{element.summary}</MyAccordionSummary>
        <MyAccordionDetails>{element.details}</MyAccordionDetails>
      </MyAccordion>
    ) : (
      <MyAccordion sx={sx}>
        <MyAccordionSummary>{element.summary}</MyAccordionSummary>
        <MyAccordionDetails>{element.details}</MyAccordionDetails>
      </MyAccordion>
    );
  };

  return <Box>{elements.map((element, idx) => renderAccordion(element, idx))}</Box>;
};

export default AccordionList;
