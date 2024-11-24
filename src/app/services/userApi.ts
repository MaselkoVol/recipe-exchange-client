import { Recipe, RecipeShortInfo, UserShortInfo } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserShortInfo, string>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
    getUserRecipes: builder.query<
      { data: RecipeShortInfo[]; meta: { page: number; limit: number; totalPages: number } },
      { userId: string; limit: string; page: string; search: string }
    >({
      query: (data) => ({
        url: `/users/${data.userId}/recipes`,
        params: {
          page: data.page,
          limit: data.limit,
          search: data.search,
        },
      }),
    }),
  }),
});

export const { getUserInfo, getUserRecipes } = userApi.endpoints;
export const { useGetUserInfoQuery, useLazyGetUserInfoQuery, useGetUserRecipesQuery, useLazyGetUserRecipesQuery } =
  userApi;
