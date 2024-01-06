import { useEffect, useRef, useState } from "react";
import Table from "../../Common/Table/Table";
import {
  GetAllProducts,
  GetProductsByCategory,
  GetProductsBySearchQuery,
  GetAllCategories,
  AddNewProduct,
  UpdateProduct,
  DeleteProduct,
} from "../../Services/Service";
import Categories from "../Categories/Categories";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Button from "@mui/material/Button";
import "./Products.scss";
import PlusIcon from "@mui/icons-material/Add";
import ProductModal from "./ProductModal/ProductModal";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import { ACTIONS, PRODUCT_ADDED_MSG, PRODUCT_DELETED_MSG, PRODUCT_UPDATED_MSG, ERROR_MSG } from "../../utils/utils.ts";

const Products = () => {
  const [products, setProducts] = useState([]); //Set Product lists
  const [totalProducts, setTotalProducts] = useState(0); // Total number of product available
  const [searchText, setSearchText] = useState(null); // Search product
  const [selectedCat, setSelectedCat] = useState(""); // Selected product category
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isOpen, setIsOpen] = useState(false); // Open close product modal : ADD, UPDATE CASE
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Open close confirm modal : DELETE CASE
  const [categories, setCategories] = useState([]);
  const skip = useRef(0); // Page count
  const limit = 10; // Results limit
  const selectedRowData = useRef(); // EDIT and DELETED selected product data
  const action = useRef(ACTIONS.ADD); // ACTIONS: UPDATE, ADD, DELETE
  const productColumns = {
    sno: "Sno.",
    title: "Title",
    price: "Price",
    category: "Category",
    brand: "Brand Name",
  };

  useEffect(() => {
    fetchData(GetAllProducts, getPayload());
    GetAllCategories()
      .then((resp) => {
        setCategories(resp);
      })
      .catch((e) => {
        toast.error(e?.error || ERROR_MSG);
      });
  }, []);

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
      toast.error(e?.error || ERROR_MSG);
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
  
  const debouncedHandleSearch = debounce((text) => {
    skip.current = 0;
    setSearchText(text);
  }, 500);

  const handleChangeCategory = (cat) => {
    skip.current = 0;
    setSelectedCat(cat);
  };

  const getPayload = () => ({
    limit: limit,
    skip: skip.current * limit,
  });

  const handleSubmitProduct = (productInfo, action, productID) => {
    switch (action) {
      case ACTIONS.UPDATE:
        UpdateProduct(productInfo, productID)
          .then((data) => {
            selectedRowData.current = null;
            setIsOpen(false);
            toast.success(PRODUCT_UPDATED_MSG);
            fetchData(GetAllProducts, getPayload());
          })
          .catch((e) => {
            toast.error(e?.error || ERROR_MSG);
          });
        break;
      case ACTIONS.DELETE:
        DeleteProduct(productInfo)
          .then((data) => {
            selectedRowData.current = null;
            setIsConfirmOpen(false);
            toast.success(PRODUCT_DELETED_MSG);
            fetchData(GetAllProducts, getPayload());
          })
          .catch((e) => {
            toast.error(e?.error || ERROR_MSG);
          });
        break;
      default:
        AddNewProduct(productInfo)
          .then((data) => {
            setIsOpen(false);
            toast.success(PRODUCT_ADDED_MSG);
            fetchData(GetAllProducts, getPayload());
          })
          .catch((e) => {
            toast.error(e?.error || ERROR_MSG);
          });
        break;
    }
  };

  const handleEditProduct = (data) => {
    action.current = ACTIONS.UPDATE;
    selectedRowData.current = data;
    setIsOpen(true);
  };

  const handleDeleteProduct = (data) => {
    selectedRowData.current = data;
    setIsConfirmOpen(true);
  };

  return (
    <>
      <Header />
      <div className="product-body">
        <div className="filters">
          <Search handleSearch={debouncedHandleSearch} />
          <div className="actions">
            <Button
              onClick={(e) => setIsOpen(true)}
              variant="outlined"
              startIcon={<PlusIcon />}
            >
              Add Product
            </Button>
            <Categories
              categories={categories}
              handleChangeCategory={handleChangeCategory}
            />
          </div>
        </div>
        <div className="product-data">
          <Table
            columns={productColumns}
            data={products}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
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
      {isOpen && (
        <ProductModal
          categories={categories}
          data={selectedRowData.current}
          action={action.current}
          isOpen={isOpen}
          handleClose={(e) => setIsOpen(false)}
          handleSubmitProduct={handleSubmitProduct}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          productID={selectedRowData.current.id}
          handleClose={(e) => setIsConfirmOpen(false)}
          handleSubmitProduct={handleSubmitProduct}
        />
      )}
    </>
  );
};
export default Products;
