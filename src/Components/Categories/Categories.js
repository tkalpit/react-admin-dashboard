import "./Categories.scss"
const Categories = (props) => {
    return (
        <div className="product-category-section">
            <select onChange={e => props.handleChangeCategory(e.target.value)}>
                <option value=''>Select category</option>
                {props.categories.length > 0 && props.categories.map(category => {
                    return (
                        <option value={category} key={category}>{category}</option>
                    )
                })}
                
            </select>
        </div>
    )
}
export default Categories;