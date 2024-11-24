import React, { useEffect } from "react";
import Form from "./UI/Form";
import MyTextField from "./UI/input/MyTextField";
import MyButton from "./UI/MyButton";
import { Box, CircularProgress } from "@mui/material";
import { Search } from "@mui/icons-material";
import { SetParamsType, StringParamsType } from "../hooks/useControlParams";

type Props = {
  getValues: (...args: any) => any;
  isFetching: boolean;
  isWriting: boolean;
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
  setParams: SetParamsType;
  query: StringParamsType;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

// To make this component work, you have to specify 'search' parameters in url
const SearchBar = ({
  getValues,
  isFetching,
  isWriting,
  setIsWriting,
  setParams,
  query,
  inputValue,
  setInputValue,
}: Props) => {
  // control search input
  useEffect(() => {
    if (!isWriting) {
      setIsWriting(true);
    }
    // debouncer
    const handler = setTimeout(() => {
      // if in your url there is no page or search, they will not be added.
      setParams({ page: "1", search: inputValue }, true);
      // after 100 ms set isWriting to false, it is done in order to prevent ui from jerking
      setTimeout(() => {
        setIsWriting(false);
      }, 100);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (!isWriting) {
      setInputValue(query.search);
    }
  }, [query]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        getValues(query);
      }}
      sx={{ display: "flex", gap: 2 }}
    >
      <MyTextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        isContrast
        name={"search"}
        fullWidth
        type="search"
        label="search recipe"
      />
      <MyButton disabled={isFetching || isWriting} type="submit" variant="contained">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Search sx={{ opacity: isFetching || isWriting ? 0 : 1 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <CircularProgress size={28} sx={{ opacity: isFetching || isWriting ? 1 : 0 }} />
        </Box>
      </MyButton>
    </Form>
  );
};

export default SearchBar;
