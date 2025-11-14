import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FreshCartAPI = createApi({
  reducerPath: "Cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/api/v1/",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products?limit=8",
    }),
    getAllBrands: builder.query({
      query: () => "/brands?limit=8",
    }),
    getAllCategories: builder.query({
      query: () => "/categories?limit=8",
    }),
    login: builder.mutation({
      query: (val) => ({
        url: `auth/signin`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: val,
      }),
    }),
    signup: builder.mutation({
      query: (val) => ({
        url: `auth/signup`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: val,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useLoginMutation,
  useSignupMutation,
} = FreshCartAPI;
