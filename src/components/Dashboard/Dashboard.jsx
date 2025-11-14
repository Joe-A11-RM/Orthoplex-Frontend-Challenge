import React from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import {
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} from "../../Redux/service/freshcart";
import { Alert, Spin } from "antd";
import Section from "./Section";
import Cards from "./Cards";
import DashboardHelmet from "./DashboardHelmet";

export default function Dashboard() {
  const userData = useSelector((state) => state.auth);
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useGetAllProductsQuery();

  const {
    data: brands,
    isLoading: brandsLoading,
    isError: brandsError,
    refetch: refetchBrands,
  } = useGetAllBrandsQuery();

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useGetAllCategoriesQuery();

  const productsList = products?.data || [];
  const brandsList = brands?.data || [];
  const categoriesList = categories?.data || [];
  const error = productsError || brandsError || categoriesError;
  return (
    <>
      <DashboardHelmet />
      <div className="dashboard">
        <Navbar title={userData?.user} email={userData?.email} />

        <div>
          {(productsLoading || brandsLoading || categoriesLoading) && (
            <div className="loader">
              <Spin size="large" />
            </div>
          )}
          {error && (
            <div className="error-container" style={{ padding: "24px" }}>
              <Alert
                message="Failed to load dashboard data"
                description="An error occurred while fetching products, brands, or categories."
                type="error"
                showIcon
              />

              <Button
                type="primary"
                onClick={() => {
                  refetchProducts();
                  refetchBrands();
                  refetchCategories();
                }}
                style={{ marginTop: "16px" }}
              >
                Retry
              </Button>
            </div>
          )}
          {(!productsLoading || !brandsLoading || !categoriesLoading) && (
            <main className="dashboard-main">
              <div className="metrics-row row mb-4 gy-3">
                <Cards title="products" list={productsList} />
                <Cards title="brands" list={brandsList} />
                <Cards title="categories" list={categoriesList} />
              </div>
              <Section title="Products" items={productsList} />
              <Section title="Brands" items={brandsList} />
              <Section title="Categories" items={categoriesList} />
            </main>
          )}
        </div>
      </div>
    </>
  );
}
