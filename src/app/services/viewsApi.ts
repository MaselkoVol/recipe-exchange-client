import { Recipe } from "../types";
import { api } from "./api";

export const viewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addView: builder.mutation<Recipe, string>({
      query: (id) => ({
        url: `/current/viewed/recipes/${id}`,
        method: "POST",
      }),
    }),
  }),
});
export const { addView } = viewsApi.endpoints;
export const { useAddViewMutation } = viewsApi;
