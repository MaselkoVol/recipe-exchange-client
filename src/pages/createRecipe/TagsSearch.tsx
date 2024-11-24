import React, { useEffect, useMemo, useRef, useState } from "react";
import { Tag, TagCategory } from "../../app/types";
import { Box, Checkbox, FormControlLabel, FormGroup, Paper, Popover, Popper, Skeleton, TextField } from "@mui/material";
import MyTextField from "../../components/UI/input/MyTextField";
import { useColors } from "../../hooks/useColors";

type Props = {
  tagCategories: TagCategory[] | undefined;
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};

const TagsSearch = ({ tagCategories, selectedTags, setSelectedTags }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const colors = useColors();

  const tags = useMemo(() => {
    if (!tagCategories) return undefined;
    return tagCategories.reduce((acc: Tag[], curr) => acc.concat(curr.tags), []);
  }, [tagCategories]);
  const filteredTags = useMemo(() => {
    if (!tags) return undefined;
    return tags.filter(
      (tag) =>
        (tag.name.toLocaleLowerCase().includes(currentValue.toLocaleLowerCase()) && currentValue.length > 2) ||
        (tag.name.toLocaleLowerCase().startsWith(currentValue.toLocaleLowerCase()) &&
          currentValue.length <= 2 &&
          currentValue !== "")
    );
  }, [tags, currentValue]);
  const handleTagSelect = (tag: Tag) => {
    if (selectedTags.find((currentTag) => tag.id === currentTag.id)) {
      setSelectedTags(selectedTags.filter((currentTag) => currentTag.id !== tag.id));
      return;
    }
    setSelectedTags([...selectedTags, tag]);
  };

  useEffect(() => {
    if (filteredTags && filteredTags.length > 0) {
      setIsListOpen(true);
    } else {
      setIsListOpen(false);
    }
  }, [filteredTags]);
  useEffect(() => {
    setAnchorEl(inputRef.current);
  }, [inputRef]);

  return (
    <Box sx={{ width: "100%" }}>
      <MyTextField
        fullWidth
        ref={inputRef}
        size="small"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setCurrentValue((e.target as HTMLInputElement).value);
          }
        }}
        type="search"
        variant="outlined"
        label="search tags"
        color="primary"
      />
      <Popper
        modifiers={[
          {
            name: "widthModifier",
            enabled: true,
            phase: "beforeWrite",
            fn: ({ state }) => {
              state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            requires: ["computeStyles"],
          },
        ]}
        sx={{ zIndex: 10, boxShadow: "none" }}
        open={isListOpen}
        anchorEl={anchorEl}
      >
        <Paper
          elevation={2}
          sx={{
            bgcolor: colors.bg,
            borderRadius: 2,
            border: `1px solid ${colors.grey}`,
            my: 1,
            overflow: "auto",
            px: 2,
            py: 1,
            width: "100%",
          }}
        >
          <FormGroup>
            {filteredTags &&
              filteredTags.map((tag) => (
                <FormControlLabel
                  sx={{ fontSize: 5 }}
                  key={tag.id}
                  onChange={() => handleTagSelect(tag)}
                  control={<Checkbox checked={!!selectedTags.find((currentTag) => currentTag.id === tag.id)} />}
                  label={tag.name}
                />
              ))}
          </FormGroup>
        </Paper>
      </Popper>
    </Box>
  );
};

export default TagsSearch;
