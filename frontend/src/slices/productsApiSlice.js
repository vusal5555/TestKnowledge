import apiSlice from "./apiSlice";
import { PRODUCTS_URL } from "../constatns";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),

      keepUnusedDataFor: 5,
    }),

    getSingProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),

      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingProductQuery } =
  productsApiSlice;
