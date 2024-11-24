import { LikeResponse, MetaType, RecipeShortInfo } from "../types";
import { api } from "./api";

export const favoriteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/favorite/recipes/${recipeId}`,
        method: "POST",
      }),
    }),
    isAddedToFavorite: builder.query<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/favorite/recipes/${recipeId}`,
      }),
    }),
    getCurrentUserFavoriteRecipes: builder.query<
      { data: RecipeShortInfo[]; meta: MetaType },
      { page: string; limit: string; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: "/current/favorite/recipes",
        params: { page, limit, search },
      }),
    }),
  }),
});

export const { toggleFavorite, isAddedToFavorite, getCurrentUserFavoriteRecipes } = favoriteApi.endpoints;
export const {
  useIsAddedToFavoriteQuery,
  useLazyIsAddedToFavoriteQuery,
  useToggleFavoriteMutation,
  useGetCurrentUserFavoriteRecipesQuery,
  useLazyGetCurrentUserFavoriteRecipesQuery,
} = favoriteApi;
