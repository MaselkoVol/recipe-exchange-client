import React from "react";
import { MetaType, RecipeShortInfo } from "../app/types";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useColors } from "../hooks/useColors";
import { responseErrorCheck } from "../utils/functions/responseErrorCheck";
import MyButton from "./UI/MyButton";
import RecipeShort from "./RecipeShort";
import { SetParamsType, StringParamsType } from "../hooks/useControlParams";
import LoadingPage from "../pages/loadingPage/LoadingPage";

type Props = {
  isFetching: boolean;
  recipes: RecipeShortInfo[] | null;
  error: unknown;
  meta: MetaType | null;
  setParams: SetParamsType;
  query: StringParamsType;
  noResElem?: React.ReactNode;
  errorElem?: React.ReactNode;
  loadingElem?: React.ReactNode;
  animated?: boolean;
  editable?: boolean;
};

const RecipeList = ({
  isFetching,
  recipes,
  error,
  meta,
  setParams,
  query,
  noResElem,
  errorElem,
  loadingElem,
  animated = false,
  editable = false,
}: Props) => {
  return (
    <>
      {isFetching || !recipes ? (
        loadingElem || <LoadingPage sx={{ pt: 15 }} />
      ) : error && responseErrorCheck(error) ? (
        errorElem || <Typography>error occured</Typography>
      ) : recipes.length === 0 ? (
        noResElem || (
          <MyButton
            disabled
            size="large"
            fullWidth
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            variant="contained"
          >
            No recipe found
          </MyButton>
        )
      ) : (
        <Stack spacing={2} sx={{ position: "relative" }}>
          {recipes.map((recipe) => (
            <RecipeShort editable={editable} animated={animated} key={recipe.id} recipe={recipe} />
          ))}
          {meta?.totalPages !== 1 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={meta?.totalPages}
                page={parseInt(query.page)}
                onChange={(e, value) => setParams({ ...query, page: value.toString() }, false)}
              />
            </Box>
          )}
        </Stack>
      )}
    </>
  );
};

export default RecipeList;
