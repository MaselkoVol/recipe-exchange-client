import { Box, SxProps } from "@mui/material";
import React, { useState } from "react";
import ImageFullscreen from "./UI/ImageFullscreen";
import Image from "./UI/Image";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useColors } from "../hooks/useColors";

type Props = {
  imagesUrl: string[];
  removeFunction?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>, imageUrl: string) => any;
};

const MultipleImages = ({ imagesUrl, removeFunction }: Props) => {
  const isTouchScreen = useSelector((selector: RootState) => selector.touchScreen.isTouchScreen);
  const colors = useColors();
  const styles: SxProps = {
    fontSize: 24,
    position: "absolute",
    top: 5,
    right: 5,
    bgcolor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "100%",
    color: "white",
    zIndex: 10,
  };
  if (!isTouchScreen) {
    styles.opacity = 0;
    styles.pointerEvents = "none";
    styles.transition = "opacity .2s ease";
  }
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  return (
    <Box>
      <Box
        sx={{
          mb: 1,
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        }}
      >
        {imagesUrl.map((imageUrl, idx) => (
          <Box
            onClick={(e) => setSelectedUrl(imageUrl)}
            key={idx}
            sx={{
              border: `1px dashed ${colors.palette.mode === "dark" ? "white" : colors.palette.primary.main}`,
              position: "relative",
              "&:hover": {
                ".icon-button": {
                  opacity: 1,
                  pointerEvents: "all",
                },
              },
            }}
          >
            {removeFunction && (
              <Close onClick={(e) => removeFunction(e, imageUrl)} className="icon-button" sx={styles} />
            )}
            <Image draggable="false" src={imageUrl} sx={{ userSelect: "none", aspectRatio: "3/2" }} />
          </Box>
        ))}
      </Box>
      <ImageFullscreen selectedURL={selectedUrl} setSelectedURL={setSelectedUrl} />
    </Box>
  );
};

export default MultipleImages;
