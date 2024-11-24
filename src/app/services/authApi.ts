import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation<string, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        body: {},
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const { login, refresh, register, logout } = authApi.endpoints;
export const { useLoginMutation, useRefreshMutation, useLogoutMutation, useRegisterMutation } = authApi;
