/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../Header/Header";
import banner from "../../../utils/banner.jpeg";
import "./Shop.scss";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  GetAllProducts,
  GetAllCategories,
  GetProductsByCategory,
} from "../../../Services/Service";
import { ERROR_MSG } from "../../../utils/utils.ts";
import Categories from "../../Admin/Categories/Categories";
import ProductCard from "../../../Common/ProductCard/ProductCard";
const Shop = () => {
  const [products, setProducts] = useState([]); //Set Product lists
  const [totalProducts, setTotalProducts] = useState(0); // Total number of product available
  const [selectedCat, setSelectedCat] = useState(""); // Selected product category
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [categories, setCategories] = useState([]);
  const skip = useRef(0); // Page count
  const limit = 10; // Results limit

  useEffect(() => {
    GetAllCategories()
      .then((resp) => {
        setCategories(resp);
      })
      .catch((e) => {
        toast.error(e?.error || ERROR_MSG);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight ||
        isLoading ||
        products.length >= totalProducts
      ) {
        return;
      }
      skip.current = skip.current + 1;
      if (selectedCat) {
        fetchData(GetProductsByCategory, {
          limit: 10,
          skip: skip.current * limit,
          category: selectedCat,
        });
      } else {
        fetchData(GetAllProducts, getPayload());
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    if (selectedCat) {
      fetchData(GetProductsByCategory, {
        limit: 10,
        skip: skip.current * limit,
        category: selectedCat,
      });
    } else {
      fetchData(GetAllProducts, getPayload());
    }
  }, [selectedCat]);

  const getPayload = () => ({
    limit: limit,
    skip: skip.current * limit,
  });

  const fetchData = async (apiCall, payload) => {
    try {
      setIsLoading(true);
      const resp = await apiCall(payload);
      const prod = products;
      prod.push(...resp.products);
      setProducts(prod);
      setTotalProducts(resp.total);
      setIsLoading(false);
    } catch (e) {
      toast.error(e?.error || ERROR_MSG);
    }
  };

  const handleChangeCategory = (cat) => {
    setProducts([]);
    skip.current = 0;
    setSelectedCat(cat);
  };

  return (
    <section className="category-wrapper">
      <Header />
      <main>
        <img className="banner" src={banner} alt="banner" />
        <div className="shop">
          <div className="category-section">
            <Categories
              categories={categories}
              handleChangeCategory={handleChangeCategory}
            />
          </div>
          <div className="products">
            {products.length > 0 &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  productID={product.id}
                  description={product.description}
                  price={product.price}
                  productThumbnail={product.thumbnail}
                />
              ))}
          </div>
        </div>
      </main>
    </section>
  );
};
export default Shop;
