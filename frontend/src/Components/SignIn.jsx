import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../CSS/login.css'; 
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
     
      let BaseUrl=`https://propftxbackend.onrender.com`
     
      const response = await fetch(`${BaseUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("res",response)

      const result = await response.json();
      console.log(result);
     

      if (result.token) {
      
        localStorage.setItem('token', result.token);
        localStorage.setItem('userID', result.user._id);
        localStorage.setItem('user', result.user.name);
        localStorage.setItem('userRole', result.user.role);


        Swal.fire({
          title: result.msg,
      
          icon: 'success',
          
        });
       
        navigate("/Movie");
       
      } else {
        Swal.fire({
          title: result.msg,
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Something went wrong',
        icon: 'error',
      });
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='LognDiv'>
      <h2 className='Lognheading'>Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className='LognBtn'>Login</button>

      <Link to="/Register" className='linkForRgstr'> Create an Account </Link>
    </div>
  );
};

export default Login;