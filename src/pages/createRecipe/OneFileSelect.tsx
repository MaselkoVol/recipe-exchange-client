import { Box, Input, Stack, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { resizeImage } from "../../utils/functions/resizeImage";
import { fileToDataURL } from "../../utils/functions/fileToDataURL";
import Image from "../../components/UI/Image";
import MyButton from "../../components/UI/MyButton";
import InputFile from "../../components/UI/input/InputFile";
import { useColors } from "../../hooks/useColors";

type Props = {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  allowedTypes?: string;
  inputText: string;
  startImageUrl?: string;
  compressTo?: [number, number];
};

const OneFileSelect = ({
  inputText,
  compressTo = [1080, 720],
  startImageUrl,
  allowedTypes,
  selectedFile,
  setSelectedFile,
}: Props) => {
  const colors = useColors();
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setImageURL("");
      return;
    }
    fileToDataURL(selectedFile).then(setImageURL);
  }, [selectedFile]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }
    try {
      const resizedFile = await resizeImage(file, compressTo[0], compressTo[1], "image/jpeg");
      setSelectedFile(resizedFile);
    } catch (error) {
      setSelectedFile(null);
      return;
    }
  };
  return (
    <Stack spacing={1}>
      {(imageURL || startImageUrl) && (
        <Box
          sx={{
            mb: 1,
            border: `1px dashed ${colors.header}`,
          }}
        >
          <Image src={imageURL || startImageUrl || ""} sx={{ width: "100%", aspectRatio: "3/2" }} />
        </Box>
      )}
      <InputFile onChange={handleFileSelect} accept={allowedTypes || ""}>
        {inputText}
      </InputFile>
    </Stack>
  );
};

export default OneFileSelect;
