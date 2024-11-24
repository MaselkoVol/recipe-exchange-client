import { MetaType, RecipeShortInfo, User } from "../types";
import { api } from "./api";

export const currentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/current",
      }),
    }),
    getCurrentUserRecipes: builder.query<
      { data: RecipeShortInfo[]; meta: MetaType },
      { page: string; limit: string; search: string }
    >({
      query: (params) => ({
        url: "/current/recipes",
        params: params,
      }),
    }),
    updateCurrentUser: builder.mutation<void, FormData>({
      query: (data) => ({
        url: `/current`,
        body: data,
        method: "PUT",
      }),
    }),
    deleteCurrentUser: builder.mutation<void, string>({
      query: (password) => ({
        url: `/current`,
        method: "DELETE",
        body: { password: password },
      }),
    }),
  }),
});

export const { getCurrentUser, getCurrentUserRecipes, updateCurrentUser, deleteCurrentUser } = currentApi.endpoints;
export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useGetCurrentUserRecipesQuery,
  useLazyGetCurrentUserRecipesQuery,
  useDeleteCurrentUserMutation,
  useUpdateCurrentUserMutation,
} = currentApi;
