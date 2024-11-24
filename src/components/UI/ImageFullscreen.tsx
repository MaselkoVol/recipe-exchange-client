import { Box, Dialog } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Image from "./Image";

type Props = {
  selectedURL: string | null;
  setSelectedURL: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImageFullscreen = ({ selectedURL, setSelectedURL }: Props) => {
  const [image, setImage] = useState<string | null>(selectedURL);
  useEffect(() => {
    if (selectedURL) {
      setImage(selectedURL);
    }
  }, [selectedURL]);
  return (
    <Dialog fullScreen onClick={() => setSelectedURL(null)} open={!!selectedURL}>
      <Box sx={{ display: "grid", height: "100%", justifyItems: "center" }}>
        <Box
          sx={{
            maxWidth: "100vw",
            aspectRatio: "4/3",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
          }}
        >
          <Image sx={{ m: { xs: 2, sm: 4 }, flex: 1 }} src={image || ""} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ImageFullscreen;
