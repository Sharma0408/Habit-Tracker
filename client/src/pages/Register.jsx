import { useState } from "react";
import API from "../api/axios";

function Register(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("User Registered");

    }catch(err){
      alert("Error registering");
    }

  };

  return(

    <div>

      <h2>Register</h2>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />

      <br/><br/>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

      <br/><br/>

      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

      <br/><br/>

      <button onClick={handleRegister}>Register</button>

    </div>

  );

}

export default Register;