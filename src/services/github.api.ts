import { IUser, ServerResponse, IRepo } from './../models/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    searchUsers: builder.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10
        }
      }),
      transformResponse: (baseQueryReturnValue: ServerResponse<IUser>) =>
        baseQueryReturnValue.items
    }),
    getUserRepos: builder.query<IRepo[], string>({
      query: (userName: string) => ({
        url: `users/${userName}/repos`
      })
    })
  })
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
