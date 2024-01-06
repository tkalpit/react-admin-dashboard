import "./Reset.scss";
import Products from "./Components/Products/Products";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Products />
      <ToastContainer />
    </div>
  );
}

export default App;
