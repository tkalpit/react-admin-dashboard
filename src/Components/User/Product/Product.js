import { Chip, Rating, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductByID } from "../../../Services/Service";
import Header from "../Header/Header";
import "./Product.scss";

const SingleProductInfo = () => {
  const [product, setProduct] = useState();
  const { productID } = useParams();
  useEffect(() => {
    fetchData(GetProductByID, productID);
  }, []);

  const fetchData = async (apiCall, payload) => {
    try {
      const resp = await apiCall(payload);
      setProduct(resp);
    } catch (e) {}
  };
  return (
    <>
      <Header />
      {product && (
        <div className="product-info">
          <div className="product-top-section">
            <div className="left-image-section">
              <img src={product?.thumbnail} alt="Product" />
            </div>
            <div className="right-info-section">
              <h1 className="m-b-16 title">{product?.title}</h1>
              <div className="m-b-16 price-section">
                <span className="price">${product?.price}</span>
                <span className="discount">
                  {product?.discountPercentage}% off
                </span>
              </div>

              <Rating
                className="m-b-16"
                name="read-only"
                value={product.rating}
                readOnly
              />

              <p className="m-b-16 description">{product?.description}</p>

              <Chip
                className="m-b-16"
                label={product?.stock > 0 ? "In Stock" : "Out of Stock"}
                color={product?.stock > 0 ? "success" : "danger"}
              />
              <Stack direction="row" spacing={1}>
                <Chip label={product?.category} />
                <Chip label={product?.brand} />
              </Stack>
            </div>
          </div>
          <div className="product-bottom-section">
            {product.images.length > 0 &&
              product.images.map((img) => {
                return <img key={img} src={img} alt="product other" />;
              })}
          </div>
        </div>
      )}
    </>
  );
};
export default SingleProductInfo;
