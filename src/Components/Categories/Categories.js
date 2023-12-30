import { useEffect, useState } from "react";
import { GetAllCategories } from "../../Services/Service";
import "./Categories.scss"
const Categories = (props) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        GetAllCategories().then((resp) => {
            setCategories(resp);
        }).catch(e => {
            console.log(e);
        })
       
    },[])
    return (
        <div className="product-category-section">
            <select onChange={e => props.handleChangeCategory(e.target.value)}>
                <option value=''>Select category</option>
                {categories.length > 0 && categories.map(category => {
                    return (
                        <option value={category} key={category}>{category}</option>
                    )
                })}
                
            </select>
        </div>
    )
}
export default Categories;