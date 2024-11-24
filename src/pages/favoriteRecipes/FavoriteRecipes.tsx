import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useLazyGetCurrentUserRecipesQuery } from "../../app/services/currentApi";
import MyButton from "../../components/UI/MyButton";
import ClientLink from "../../components/UI/ClientLink";
import { AddCircle } from "@mui/icons-material";
import { useColors } from "../../hooks/useColors";
import RecipeShort from "../../components/RecipeShort";
import { MetaType, RecipeShortInfo } from "../../app/types";
import { useEffect, useRef, useState } from "react";
import { responseErrorCheck } from "../../utils/functions/responseErrorCheck";
import { motion, useInView } from "framer-motion";
import SearchBar from "../../components/SearchBar";
import { StringParamsType, useControlParams } from "../../hooks/useControlParams";
import { useLazyGetCurrentUserFavoriteRecipesQuery } from "../../app/services/favoriteApi";
import RecipeList from "../../components/RecipeList";

type Props = {};

const FavoriteRecipes = (props: Props) => {
  // the argument is the inital values
  const { initiateParams, getParams, setParams, searchParams } = useControlParams({
    page: "1",
    limit: "10",
    search: "",
  });
  const colors = useColors();
  // function to get recipes from backend
  const [getRecipes, { data, error, isFetching }] = useLazyGetCurrentUserFavoriteRecipesQuery();
  // recipes is the content that is shown on the page
  const [recipes, setRecipes] = useState<RecipeShortInfo[] | null>(null);
  // meta is information for pagination.
  const [meta, setMeta] = useState<MetaType | null>(null);
  // indicates if user is writing or not
  const [isWriting, setIsWriting] = useState(false);
  // object that contains parameters of the url
  const [query, setQuery] = useState<StringParamsType>(getParams());
  // value in the input form
  const [inputValue, setInputValue] = useState(query.search);

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
    <Stack spacing={2}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 3,
          alignItems: "flex-end",
          justifyContent: "space-between",
          py: 1,
          px: 2,
          bgcolor: colors.bg,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ fontSize: 26, fontWeight: 700 }} component="h1">
          Favorite recipes
        </Typography>
      </Box>
      <SearchBar
        getValues={getRecipes}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isFetching={isFetching}
        isWriting={isWriting}
        setIsWriting={setIsWriting}
        setParams={setParams}
        query={query}
      />

      <RecipeList
        animated
        error={error}
        isFetching={isFetching}
        meta={meta}
        query={query}
        recipes={recipes}
        setParams={setParams}
      />
    </Stack>
  );
};

export default FavoriteRecipes;
