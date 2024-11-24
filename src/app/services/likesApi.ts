import { LikeResponse, MetaType, RecipeShortInfo } from "../types";
import { api } from "./api";

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleLike: builder.mutation<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/liked/recipes/${recipeId}`,
        method: "POST",
      }),
    }),
    isRecipeLiked: builder.query<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/liked/recipes/${recipeId}`,
      }),
    }),
    getCurrentUserLikedRecipes: builder.query<
      { data: RecipeShortInfo[]; meta: MetaType },
      { page: string; limit: string; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: "/current/liked/recipes",
        params: { page, limit, search },
      }),
    }),
  }),
});

export const { toggleLike, isRecipeLiked, getCurrentUserLikedRecipes } = likesApi.endpoints;
export const {
  useToggleLikeMutation,
  useIsRecipeLikedQuery,
  useLazyIsRecipeLikedQuery,
  useGetCurrentUserLikedRecipesQuery,
  useLazyGetCurrentUserLikedRecipesQuery,
} = likesApi;
