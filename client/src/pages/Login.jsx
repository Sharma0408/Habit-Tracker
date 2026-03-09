import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();


const login = async () => {

  try {

    const res = await loginUser({
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");

  } catch (err) {
    alert("Login failed");
  }

};
  const handleLogin = async () => {

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);

      alert("Login successful");

      navigate("/dashboard");

    }catch(err){
      alert("Login failed");
    }
  };

  return (

    <div>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );
}

export default Login;