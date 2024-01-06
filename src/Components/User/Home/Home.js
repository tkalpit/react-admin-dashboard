import Header from "../Header/Header";
import banner from "../../../utils/banner.jpeg";
import "./Home.scss";
import { useEffect, useState } from "react";
import { GetAllProducts } from "../../../Services/Service";
import ProductCard from "../../../Common/ProductCard/ProductCard";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData(GetAllProducts, getPayload());
  }, []);

  const getPayload = () => ({
    limit: 10,
    skip: 0,
  });

  const fetchData = async (apiCall, payload) => {
    try {
      const resp = await apiCall(payload);
      setProducts(resp.products);
    } catch (e) {}
  };
  return (
    <section className="home-wrapper">
      <Header />
      <main>
        <img className="banner" src={banner} alt="banner" />
        <div className="products">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              title={product.title}
              description={product.description}
              price={product.price}
              productThumbnail={product.thumbnail}
            />
          ))}
        </div>
      </main>
    </section>
  );
};
export default Home;
