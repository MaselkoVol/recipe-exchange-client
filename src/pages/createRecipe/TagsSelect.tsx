import React, { useMemo, useState } from "react";
import MyButton from "../../components/UI/MyButton";
import { Box, Checkbox, FormControlLabel, Skeleton, Stack, SxProps } from "@mui/material";
import { Tag, TagCategory } from "../../app/types";
import AccordionList from "../../components/UI/accordion/AccordionList";
import { AccordionNodeType } from "../../components/UI/accordion/AccordionList";

type Props = {
  tagCategories: TagCategory[] | undefined;
  selectedTags: Tag[];
  sx?: SxProps;
  buttonSx?: SxProps;
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  variant?: "button" | "accordion";
};

const TagsSelect = ({ sx, buttonSx, tagCategories, selectedTags, setSelectedTags, variant = "button" }: Props) => {
  const [isTagsMenuOpen, setIsTagsMenuOpen] = useState(false);

  const handleTagSelect = (tag: Tag) => {
    if (selectedTags.find((currentTag) => tag.id === currentTag.id)) {
      setSelectedTags(selectedTags.filter((currentTag) => currentTag.id !== tag.id));
      return;
    }
    setSelectedTags([...selectedTags, tag]);
  };

  const transfromCategoryToTags = (category: TagCategory) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {category.tags.map((tag) => (
          <FormControlLabel
            key={tag.id}
            onChange={() => handleTagSelect(tag)}
            control={<Checkbox checked={!!selectedTags.find((currentTag) => currentTag.id === tag.id)} />}
            label={tag.name}
          />
        ))}
      </Box>
    );
  };

  const accordionElemets = useMemo(() => {
    if (!tagCategories) return null;
    const resObjArray: AccordionNodeType[] = tagCategories.map((category) => ({
      summary: category.name,
      details: transfromCategoryToTags(category),
    }));
    return resObjArray;
  }, [tagCategories, selectedTags]);

  return variant === "button" ? (
    <Box sx={sx}>
      <MyButton
        sx={{ width: "100%", ...buttonSx }}
        variant="outlined"
        id="basic-button"
        aria-controls={isTagsMenuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isTagsMenuOpen ? "true" : undefined}
        onClick={() => setIsTagsMenuOpen(!isTagsMenuOpen)}
      >
        select tags
      </MyButton>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: isTagsMenuOpen ? "1fr" : "0fr",
          transition: `grid-template-rows .3s ease`,
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Box sx={{ mt: 1 }}>
            {tagCategories && accordionElemets ? (
              <AccordionList sx={sx} linked elements={accordionElemets} />
            ) : (
              <Stack spacing={0.5}>
                <Skeleton variant="rounded" animation="wave" sx={{ height: 48 }} />
                <Skeleton variant="rounded" animation="wave" sx={{ height: 48 }} />
                <Skeleton variant="rounded" animation="wave" sx={{ height: 48 }} />
                <Skeleton variant="rounded" animation="wave" sx={{ height: 48 }} />
              </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  ) : tagCategories && accordionElemets ? (
    <AccordionList sx={sx} linked elements={accordionElemets} />
  ) : (
    <Stack spacing={0.5}>
      <Skeleton variant="rounded" animation="wave" sx={{ height: 48 }} />
      <Skeleton variant="rounded" animation="wave" sx={{ height: 48 }} />
      <Skeleton variant="rounded" animation="wave" sx={{ height: 48 }} />
      <Skeleton variant="rounded" animation="wave" sx={{ height: 48 }} />
    </Stack>
  );
};

export default TagsSelect;
