import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
   const [userLogin, setUserLogin] = useState({ username: '', password: '' })
   const navigate = useNavigate()

   const handleInput = (e) => {
      e.preventDefault()
      const {name, value} = e.target;
      console.log(name, value)
      setUserLogin({ ...userLogin, [name]: value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      console.log('...pretending to send to api...')
      const jsonBody = JSON.stringify(userLogin)
      console.log(jsonBody)
      navigate('/')
   }

   return (
      <div className='page-inner'>
         <div className='page'>
            <div className='page-title'>Sign In</div>
               <form className='form-container' onSubmit={handleSubmit}>
                  <div className='input-container'>
                     <div className='input-label'>Username:</div>
                     <input className='input-text' id='username' name='username' type='text' onChange={handleInput} />
                  </div>
                  <div className='input-container'>
                     <div className='input-label'>Password</div>
                     <input className='input-text' id='password' name='password' type='text' onChange={handleInput} />
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
