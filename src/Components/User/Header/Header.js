import { Link } from "react-router-dom";
import "./Header.scss";
import logo from '../../../utils/logo.png';
const Header = () => {
    return (
        <header>
            <Link to="/"><img src={logo} alt="logo"/></Link>
            <nav>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/category">Category</Link>
            </nav>
        </header>
    )
}
export default Header;