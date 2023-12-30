import { useEffect, useRef, useState } from "react";
import Table from "../../Common/Table/Table";
import {
  GetAllProducts,
  GetProductsByCategory,
  GetProductsBySearchQuery,
} from "../../Services/Service";
import Categories from "../Categories/Categories";
import Header from "../Header/Header";
import Search from "../Search/Search";
import "./Products.scss";

const Products = () => {
  const [products, setProducts] = useState([]); //Set Product lists
  const [totalProducts, setTotalProducts] = useState(0); // Total number of product available
  const [searchText, setSearchText] = useState(null); // Search product
  const [selectedCat, setSelectedCat] = useState(""); // Selected product category
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const skip = useRef(0); // Page count
  const limit = 10; // Results limit
  const productColumns = {
    sno: "Sno.",
    title: "Title",
    price: "Price",
    category: "Category",
    brand: "Brand Name",
  };

  useEffect(() => {
    fetchData(GetAllProducts, getPayload());
  }, []); // Run only once on mount

  useEffect(() => {
    if (selectedCat) {
      fetchData(GetProductsByCategory, {
        limit: 10,
        skip: skip.current * limit,
        category: selectedCat,
      });
    }
  }, [selectedCat]);

  useEffect(() => {
    if (searchText) {
      fetchData(GetProductsBySearchQuery, {
        limit: 10,
        skip: skip.current * limit,
        search: searchText,
      });
    }
  }, [searchText]);

  const fetchData = async (apiCall, payload) => {
    try {
      setIsLoading(true);
      const resp = await apiCall(payload);
      setProducts(resp.products);
      setTotalProducts(resp.total);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePagination = (num) => {
    skip.current = num;
    fetchData(GetAllProducts, getPayload());
  };

  // Custom debounce function
  const debounce = (fn, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // Debounced handleSearch
  const debouncedHandleSearch = debounce((text) => {
    skip.current = 0;
    setSearchText(text);
  }, 500); // Adjust the delay as needed

  const handleChangeCategory = (cat) => {
    skip.current = 0;
    setSelectedCat(cat);
  };

  const getPayload = () => ({
    limit: limit,
    skip: skip.current * limit,
  });

  return (
    <>
      <Header />
      <div className="product-body">
        <div className="filters">
          <Search handleSearch={debouncedHandleSearch} />
          <Categories handleChangeCategory={handleChangeCategory} />
        </div>
        <div className="product-data">
          <Table
            columns={productColumns}
            data={products}
            isDataLoading={isLoading}
          />
        </div>
        <div className="product-footer">
          {totalProducts > limit &&
            [...Array(Math.ceil(totalProducts / limit))].map((_, num) => (
              <span
                className={num === skip.current ? "active" : ""}
                onClick={() => handlePagination(num)}
                key={num}
              >
                {num + 1}
              </span>
            ))}
        </div>
      </div>
    </>
  );
};
export default Products;
