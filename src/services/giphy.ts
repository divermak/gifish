import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";

import Gif from "types/Gif";
import Meta from "types/Meta";
import Pagination from "types/Pagination";

type SearchResponse = {
  data: Gif[];
  pagination: Pagination;
  meta: Meta;
};

export const giphyApi = createApi({
  reducerPath: "giphyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.giphy.com/v1/gifs/",
  }),
  endpoints: (builder) => ({
    search: builder.query({
      query: (searchTerm: string, limit: number = 50, offset: number = 0, lang: string = "en") => ({
        url: `search?${queryString.stringify({
          api_key: process.env.REACT_APP_GIPHY_API_KEY,
          q: searchTerm,
          limit,
          offset,
          lang,
        })}/`,
      }),
      transformResponse: (response: SearchResponse) => {
        return response.data.map((gif) => {
          const {
            id,
            title,
            images: {
              original: { height, width, url, webp },
            },
          } = gif;

          return {
            id,
            title,
            images: {
              original: {
                height: +height,
                width: +width,
                url,
                webp,
              },
            },
          };
        });
      }
    }),
  }),
});

export const { useSearchQuery } = giphyApi;
