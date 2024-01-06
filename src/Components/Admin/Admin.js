import Products from "./Products/Products";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Admin = () => {
  return (
    <div className="admin">
      <Products />
      <ToastContainer />
    </div>
  );
};
export default Admin;
