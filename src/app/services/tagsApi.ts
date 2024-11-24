import { TagCategory } from "../types";
import { api } from "./api";

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query<TagCategory[], void>({
      query: () => ({
        url: "/tags",
      }),
    }),
  }),
});

export const { getAllTags } = tagsApi.endpoints;
export const { useGetAllTagsQuery, useLazyGetAllTagsQuery } = tagsApi;
