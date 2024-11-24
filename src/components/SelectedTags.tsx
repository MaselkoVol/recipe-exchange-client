import { Chip, ChipProps, Stack, SxProps } from "@mui/material";
import React from "react";
import { Tag } from "../app/types";

type Props = ChipProps & {
  selectedTags: Tag[];
  setSelectedTags?: React.Dispatch<React.SetStateAction<Tag[]>>;
  containerSx?: SxProps;
};

const SelectedTags = ({ containerSx, selectedTags, setSelectedTags, ...rest }: Props) => {
  return (
    <Stack sx={{ flexWrap: "wrap", gap: 1, alignItems: "center", ...containerSx }} direction="row">
      {selectedTags.length
        ? selectedTags.map((tag) => {
            return setSelectedTags ? (
              <Chip
                {...rest}
                key={tag.id}
                label={tag.name}
                onDelete={() => setSelectedTags(selectedTags.filter((currentTag) => currentTag.id !== tag.id))}
              />
            ) : (
              <Chip {...rest} key={tag.id} label={tag.name} />
            );
          })
        : "no tags selected"}
    </Stack>
  );
};

export default SelectedTags;
