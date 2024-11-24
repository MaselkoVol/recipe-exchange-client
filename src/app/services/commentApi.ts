import { Comment, MetaType } from "../types";
import { api } from "./api";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<void, { recipeId: string; data: FormData }>({
      query: ({ recipeId, data }) => ({
        url: `/recipes/${recipeId}/comments`,
        method: "POST",
        body: data, // Changed "data" to "body"
      }),
    }),
    getComments: builder.query<
      { comments: { userComments: Comment[]; otherComments: Comment[] }; meta: MetaType },
      { recipeId: string; "comments-page": string; "comments-limit": string }
    >({
      query: (data) => ({
        url: `/recipes/${data.recipeId}/comments`,
        params: { "comments-page": data["comments-page"], "comments-limit": data["comments-limit"] },
      }),
    }),
    deleteComment: builder.mutation<void, { recipeId: string; commentId: string }>({
      query: (data) => ({
        url: `/recipes/${data.recipeId}/comments/${data.commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { createComment, getComments, deleteComment } = commentApi.endpoints;
export const { useCreateCommentMutation, useGetCommentsQuery, useLazyGetCommentsQuery, useDeleteCommentMutation } =
  commentApi;
