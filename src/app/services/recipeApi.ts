import { MetaType, Recipe, RecipeShortInfo } from "../types";
import { api } from "./api";

export const recipeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRecipe: builder.mutation<void, FormData>({
      query: (data) => ({
        url: "/recipes/",
        method: "POST",
        body: data,
      }),
    }),
    updateRecipe: builder.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/recipes/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteRecipe: builder.mutation<void, string>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "DELETE",
      }),
    }),
    getRecipe: builder.query<Recipe, string>({
      query: (id) => ({
        url: `/recipes/${id}`,
      }),
    }),
    getAllRecipes: builder.query<
      { data: RecipeShortInfo[]; meta: MetaType },
      {
        page: string;
        limit: string;
        search: string;
        searchBy: string;
        sort: string;
        sortOrder: string;
        tags: string;
      }
    >({
      query: (params) => ({
        url: `/recipes`,
        params: params,
      }),
    }),
  }),
});
export const { createRecipe, getRecipe, getAllRecipes, updateRecipe, deleteRecipe } = recipeApi.endpoints;
export const {
  useCreateRecipeMutation,
  useGetRecipeQuery,
  useLazyGetRecipeQuery,
  useLazyGetAllRecipesQuery,
  useGetAllRecipesQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;
