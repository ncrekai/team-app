import { useNavigate } from 'react-router-dom';
import {useContext, useState} from 'react';
import { AuthContext } from "../services/authContext.jsx";

const Login = () => {
   const { handleLogin } = useContext(AuthContext);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await handleLogin(email, password);
         alert("Logged in successfully");
         // Redirect to the dashboard after successful login
         navigate('/dashboard');
      } catch (error) {
         console.log(error);
         alert("Failed to login. Please check your credentials.");
      }
   };

   return (
      <div className='page-inner'>
         <div className='page'>
            <div className='page-title'>Sign In</div>
               <form className='form-container' onSubmit={handleSubmit}>
                  <div className='input-container'>
                     <div className='input-label'>Username:</div>
                     <input className='input-text' name='email' type='email' onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className='input-container'>
                     <div className='input-label'>Password</div>
                     <input className='input-text' name='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className='input-container'>
                     <input className='button' type='submit' value='Submit' />
                  </div>
               </form>
         </div>
      </div>
   );
};

export default Login;