import { Box, Container, Grid, Pagination, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { StringParamsType, useControlParams } from "../../hooks/useControlParams";
import { useLazyGetAllRecipesQuery } from "../../app/services/recipeApi";
import MyButton from "../../components/UI/MyButton";
import { useGetAllTagsQuery } from "../../app/services/tagsApi";
import { MetaType, RecipeShortInfo, Tag } from "../../app/types";
import { useInView, motion } from "framer-motion";
import RecipeShort from "../../components/RecipeShort";
import SelectFilters, { SearchByType, SortByType } from "./SelectFilters";
import RecipeList from "../../components/RecipeList";
import Carousel from "../../components/UI/Carousel";
import { FreeMode, Mousewheel, Scrollbar } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

type Props = {};

const AllRecipes = (props: Props) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { resetParams, getParams, setParams, searchParams } = useControlParams({
    page: "1",
    limit: "10",
    search: "",
    "search-by": "All",
    sort: "date",
    "sort-order": "desc",
    tags: "",
  });
  const [getRecipes, { data, error, isFetching }] = useLazyGetAllRecipesQuery();
  const [recipes, setRecipes] = useState<RecipeShortInfo[] | null>(null);
  const [meta, setMeta] = useState<MetaType | null>(null);

  const [query, setQuery] = useState<StringParamsType>(getParams());
  const [inputValue, setInputValue] = useState(query.search);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    setQuery(getParams());
  }, [searchParams]);

  useEffect(() => {
    getRecipes(query as any);
  }, [query]);

  useEffect(() => {
    if (isWriting) return;
    setRecipes(data?.data || null);
    setMeta(data?.meta || null);
  }, [data, isWriting]);

  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid xs={12} md={5} item>
          <Box
            sx={{
              position: "sticky",
              top: 87,
              maxHeight: { xs: "auto", md: "calc(100vh - 112px)" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <SearchBar
              inputValue={inputValue}
              setInputValue={setInputValue}
              query={query}
              isWriting={isWriting}
              setIsWriting={setIsWriting}
              setParams={setParams}
              getValues={getRecipes}
              isFetching={isFetching}
            />
            <SelectFilters
              buttonSx={{ width: "100%" }}
              variant={isMd ? "block" : "button"}
              resetParams={resetParams}
              setParams={setParams}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={7} item>
          <RecipeList
            animated
            error={error}
            isFetching={isFetching}
            meta={meta}
            query={query}
            recipes={recipes}
            setParams={setParams}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllRecipes;
