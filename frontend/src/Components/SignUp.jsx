import React, { useState } from 'react';
import '../CSS/Register.css'; 
import {Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
   
      let BaseUrl=`https://propftxbackend.onrender.com`

      
      const response = await fetch(`${BaseUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email,  password, age }),
      });

      const result = await response.json();
      Swal.fire({
        title: result.msg,
        icon: 'success',
      });
      navigate("/Login");
     
    } catch (error) {
      Swal.fire({
        title: 'Something went wrong',
        icon: 'error',
      });
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className='RgstrtDiv'>
      <h2 className='Signheading'>Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
   
      <button onClick={handleRegister} className='rgstrBtn'>Register</button>
      <Link to="/Login" className='linkForLogin'> Log in Here</Link>
    </div>
  );
};

export default Register;