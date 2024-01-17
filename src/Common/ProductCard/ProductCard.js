import { DESCRIPTION_LIMIT } from "../../utils/utils.ts";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
const ProductCard = ({productID, productThumbnail, title, description, price}) => {
    let productDesc = description;
    if(description.length > DESCRIPTION_LIMIT) {
        productDesc = `${description.substring(0,DESCRIPTION_LIMIT)}...`;
    }

    return (
        <div className="product-card">
            <Link className="product-link" to={`/products/${productID}`}>
                <img src={productThumbnail} alt="product"/>
                <div className="product-info">
                    <p className="title">{title}</p>
                    <p className="description">{productDesc}</p>
                    <p className="price">${price}</p>
                </div>
            </Link>
        </div>
    )
}
export default ProductCard;