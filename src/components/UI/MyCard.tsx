import { Card, CardProps, SxProps } from "@mui/material";
import React from "react";
import { useColors } from "../../hooks/useColors";

type Props = CardProps;

const MyCard = ({ sx, children, ...rest }: Props) => {
  const colors = useColors();
  return (
    <Card
      {...rest}
      elevation={0}
      sx={{
        borderRadius: 2,
        bgcolor: colors.bg,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default MyCard;
