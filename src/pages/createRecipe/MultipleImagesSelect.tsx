import { Box, SxProps, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { resizeImage } from "../../utils/functions/resizeImage";
import { fileToFileWithDataURL } from "../../utils/functions/fileToDataURL";
import InputFile from "../../components/UI/input/InputFile";
import { type FileWithDataURL } from "../../utils/functions/fileToDataURL";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import MultipleImages from "../../components/MultipleImages";

type Props = {
  selectedFiles: File[] | null;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  allowedTypes?: string;
  inputText: string;
  maxImages?: number;
  sx?: SxProps;
  buttonSx?: SxProps;
  removeInactiveAlert?: boolean;
};

const MultipleImagesSelect = ({
  maxImages = 10,
  inputText,
  allowedTypes = "image/jpeg, image/png, image/webp, image/jpg",
  selectedFiles,
  sx,
  buttonSx,
  removeInactiveAlert = false,
  setSelectedFiles,
}: Props) => {
  const [imagesFileWithDataURL, setImagesFileWithDataURL] = useState<FileWithDataURL[] | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);

  useEffect(() => {
    if (!selectedFiles) {
      setImagesFileWithDataURL(null);
      return;
    }
    Promise.all(selectedFiles.map(fileToFileWithDataURL))
      .then(setImagesFileWithDataURL)
      .catch((e) => console.log(e));
  }, [selectedFiles]);

  useEffect(() => {
    if (!isLimitExceeded) return;

    setTimeout(() => setIsLimitExceeded(false), 2000);
  }, [isLimitExceeded]);

  // when file is selected, it appends to already selected file list
  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (!files) {
      return;
    }
    if (maxImages && files.length + (selectedFiles?.length || 0) > maxImages) {
      setIsLimitExceeded(true);
      return;
    }
    try {
      const mappedFiles = Array.from(files).map((file) => resizeImage(file, 1080, 720, "image/jpeg"));
      const resizedFiles = await Promise.all(mappedFiles);
      if (selectedFiles) {
        setSelectedFiles([...resizedFiles, ...selectedFiles]);
        return;
      }
      setSelectedFiles(resizedFiles);
    } catch (error) {
      console.error(error);
      setSelectedFiles(null);
      return;
    }
  };

  const removeSelectedFile = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, imageUrl: string) => {
    e.stopPropagation();
    if (!imagesFileWithDataURL) return;
    setSelectedFiles(imagesFileWithDataURL.filter((data) => data.dataURL !== imageUrl).map((data) => data.file));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
      {imagesFileWithDataURL && imagesFileWithDataURL.length > 0 && (
        <MultipleImages
          imagesUrl={imagesFileWithDataURL.map((data) => data.dataURL)}
          removeFunction={removeSelectedFile}
        />
      )}
      <InputFile sx={{ flex: 1, ...buttonSx }} multiple onChange={handleFilesSelect} accept={allowedTypes || ""}>
        {inputText}
      </InputFile>
      <AnimatedAlert
        mt={1}
        sx={{ display: !removeInactiveAlert || isLimitExceeded ? "grid" : "none" }}
        open={isLimitExceeded}
        variant="standard"
        severity="error"
      >
        Maximum {maxImages} files
      </AnimatedAlert>
    </Box>
  );
};

export default MultipleImagesSelect;
