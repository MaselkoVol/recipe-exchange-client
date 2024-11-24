import { useGetCurrentUserQuery } from "../../app/services/currentApi";
import { Box, Container, Grid, MenuItem, Select, Stack, Typography, useTheme } from "@mui/material";
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import UserInfo from "../../components/UserInfo";
import { useGetUserInfoQuery, useLazyGetUserRecipesQuery } from "../../app/services/userApi";
import LoadingPage from "../loadingPage/LoadingPage";
import { useColors } from "../../hooks/useColors";
import { useEffect, useState } from "react";
import { MetaType, RecipeShortInfo } from "../../app/types";
import { StringParamsType, useControlParams } from "../../hooks/useControlParams";
import SearchBar from "../../components/SearchBar";
import RecipeList from "../../components/RecipeList";
import ClientLink from "../../components/UI/ClientLink";
import MyButton from "../../components/UI/MyButton";

type Props = {};

const UserPage = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate("/");
  }
  const { data: user, isLoading: isInfoLoading, isError: isInfoError } = useGetUserInfoQuery(id || "");
  const [getRecipes, { data, isFetching, error }] = useLazyGetUserRecipesQuery();

  // the argument is the inital values
  const { initiateParams, getParams, setParams, searchParams } = useControlParams({
    page: "1",
    limit: "10",
    search: "",
  });
  const colors = useColors();
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
    getRecipes({ userId: id || "", ...(query as any) });
  }, [query]);

  useEffect(() => {
    if (isWriting) return;
    setRecipes(data?.data || null);
    setMeta(data?.meta || null);
  }, [data, isWriting]);

  if (isInfoError) return <LoadingPage />;
  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={3} sx={{ display: { xs: "none", xl: "block" } }}></Grid>
        <Grid item sx={{ order: { xs: 2, sm: 1 } }} xs={12} sm={7} xl={6}>
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
                Recipes
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
        </Grid>
        <Grid item sx={{ order: { xs: 1, sm: 2 } }} xs={12} sm={5} xl={3}>
          <Box
            sx={{
              display: { xs: "flex", sm: "block" },
              position: { xs: "static", sm: "sticky" },
              top: 87,
            }}
          >
            <Stack spacing={4} sx={{ width: "100%", maxWidth: { xs: "100%", sm: 350, xl: "100%" } }}>
              <UserInfo user={user} />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
