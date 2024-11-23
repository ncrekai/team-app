import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { login } from '../services/authService';
import { AuthContext } from "../services/authContext.jsx"; // Import the context

const Login = () => {
   // Destructure the user and handleLogin from context
   const { handleLogin } = useContext(AuthContext);
   const [userLogin, setUserLogin] = useState({ email: '', password: '' });
   const navigate = useNavigate();

   // Handle input changes
   const handleInput = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setUserLogin({ ...userLogin, [name]: value });
   };

   // Handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         // Call the login function from authService and update the context
         const response = await handleLogin(userLogin.email, userLogin.password);
         if (response.token) {
            navigate('/dashboard');
         }
      } catch (error) {
         console.error('Error during login:', error);
         alert('Invalid login credentials. Please try again.');
      }
   };

   return (
       <div className='page-inner'>
          <div className='page'>
             <div className='page-title'>Sign In</div>
             <form className='form-container' onSubmit={handleSubmit}>
                <div className='input-container'>
                   <div className='input-label'>Email:</div>
                   <input
                       className='input-text'
                       id='email'
                       name='email'
                       type='email'
                       value={userLogin.email}
                       onChange={handleInput}
                   />
                </div>
                <div className='input-container'>
                   <div className='input-label'>Password:</div>
                   <input
                       className='input-text'
                       id='password'
                       name='password'
                       type='password'
                       value={userLogin.password}
                       onChange={handleInput}
                   />
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
