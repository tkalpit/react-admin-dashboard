import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../useAuth";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated , setIsAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const handleLogin = () => {
    console.log("username", username);
    console.log("password", password);
    localStorage.setItem("token",btoa(`${username}${password}`));
    setTimeout(() => {
        setIsAuthenticated(true);
        navigate('/');
    }, 1000);
  }
  return (
    <div className="login-section">
      <div className="username-section">
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="password-section">
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
export default Login;
