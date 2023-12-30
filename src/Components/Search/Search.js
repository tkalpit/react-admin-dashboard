import { useState } from "react";
import "./Search.scss"
const Search = (props) => {
    const [searchText,setSearchText] = useState("");
    const handleChangeSearch = (e) => {
        setSearchText(e.target.value);
        props.handleSearch(e.target.value);
    }
    return (
        <div className="product-search-box">
            <input value={searchText} onChange={handleChangeSearch} placeholder="Search Product..." />
        </div>
    )
}
export default Search;