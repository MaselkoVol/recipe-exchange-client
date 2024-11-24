import React, { useEffect, useState } from "react";
import MyCard from "../../components/UI/MyCard";
import MyLabel from "../../components/UI/MyLabel";
import { Box, MenuItem, Stack, SxProps } from "@mui/material";
import MyButton from "../../components/UI/MyButton";
import MyTextField from "../../components/UI/input/MyTextField";
import SelectedTags from "../../components/SelectedTags";
import TagsSelect from "../createRecipe/TagsSelect";
import { Tag, TagCategory } from "../../app/types";
import { ResetParamsType, SetParamsType } from "../../hooks/useControlParams";
import { Clear } from "@mui/icons-material";
import { useGetAllTagsQuery } from "../../app/services/tagsApi";

export type SortByType = "date" | "likes" | "views";
export type SearchByType = "title" | "text" | "ingredients" | "All";

type Props = {
  resetParams: ResetParamsType;
  setParams: SetParamsType;
  variant?: "button" | "block";
  sx?: SxProps;
  buttonSx?: SxProps;
};

const SelectFilters = ({ resetParams, setParams, variant = "block", sx, buttonSx }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: tagCategories, isLoading: isTagsLoading, error: tagError } = useGetAllTagsQuery();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedSortBy, setSelectedSortBy] = useState<SortByType>("date");
  const [selectedSearchBy, setSelectedSearchBy] = useState<SearchByType>("All");
  const resetValues = () => {
    setSelectedSearchBy("All");
    setSelectedSortBy("date");
    setSelectedTags([]);
    resetParams(true);
  };

  useEffect(() => {
    const modifiedTags = selectedTags.map((tag) => tag.id);
    const joinedTags = modifiedTags.join(",");
    setParams({ tags: joinedTags, page: "1" }, true);
  }, [selectedTags]);
  useEffect(() => {
    setParams({ "search-by": selectedSearchBy, page: "1" }, true);
  }, [selectedSearchBy]);

  useEffect(() => {
    setParams({ sort: selectedSortBy, page: "1" }, true);
  }, [selectedSortBy]);

  const filter = (
    <MyCard sx={{ overflowY: "auto", ...sx }}>
      <MyLabel>Filters</MyLabel>
      <Stack spacing={4}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <MyButton
            onClick={() => {
              setSelectedSortBy("date");
            }}
            sx={{ maxWidth: "fit-content", px: 4 }}
            variant="contained"
          >
            Newest
          </MyButton>
          <MyButton
            onClick={() => {
              setSelectedSortBy("likes");
            }}
            sx={{ maxWidth: "fit-content", px: 4 }}
            variant="contained"
          >
            Trending
          </MyButton>
          <MyButton
            onClick={() => {
              setSelectedSortBy("views");
            }}
            sx={{ maxWidth: "fit-content", px: 4 }}
            variant="contained"
          >
            Most Watched
          </MyButton>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 1 }}>
          <MyTextField
            variant={"outlined"}
            value={selectedSortBy}
            onChange={(e) => setSelectedSortBy(e.target.value as SortByType)}
            color="primary"
            select
            label="Sort by"
          >
            <MenuItem sx={{ fontSize: "1.2rem" }} disabled value="All">
              <Box sx={{ mx: 2 }}>Sort by</Box>
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.2rem" }} value="date">
              <Box sx={{ mx: 2 }}>Date</Box>
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.2rem" }} value="likes">
              <Box sx={{ mx: 2 }}>Likes</Box>
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.2rem" }} value="views">
              <Box sx={{ mx: 2 }}>Views</Box>
            </MenuItem>
          </MyTextField>

          <MyTextField
            variant={"outlined"}
            value={selectedSearchBy}
            onChange={(e) => setSelectedSearchBy(e.target.value as SearchByType)}
            color="primary"
            select
            label="Search by"
          >
            <MenuItem sx={{ fontSize: "1.2rem" }} disabled value="All">
              <Box sx={{ mx: 2 }}>Search by</Box>
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.2rem" }} value="title">
              <Box sx={{ mx: 2 }}>Title</Box>
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.2rem" }} value="text">
              <Box sx={{ mx: 2 }}>Recipe text</Box>
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.2rem" }} value="ingredients">
              <Box sx={{ mx: 2 }}>Ingredients</Box>
            </MenuItem>
          </MyTextField>
        </Box>
        <Box>
          <Stack spacing={1}>
            <SelectedTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            <TagsSelect
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              tagCategories={tagCategories}
              variant="accordion"
            />
          </Stack>
        </Box>
        <MyButton onClick={resetValues} variant="outlined" color="error" startIcon={<Clear />}>
          Clear filters
        </MyButton>
      </Stack>
    </MyCard>
  );

  return variant === "button" ? (
    <Box>
      <MyButton
        sx={{ width: "100%", ...buttonSx }}
        variant="contained"
        id="basic-button"
        aria-controls={isMenuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        Filters
      </MyButton>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: isMenuOpen ? "1fr" : "0fr",
          transition: `grid-template-rows .3s ease`,
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Box sx={{ mt: 1 }}>{filter}</Box>
        </Box>
      </Box>
    </Box>
  ) : (
    filter
  );
};

export default SelectFilters;
