import React, { useState } from 'react';

const Register = () => {

   const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page reload

      try {
         const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (response.ok) {
            alert('User registered successfully!');
            console.log('Response:', data);
         } else {
            alert(`Error: ${data.message}`);
         }
      } catch (error) {
         console.error('Error creating user:', error);
         alert('An error occurred. Please try again.');
      }
   };

   return (
      <div className='page-inner'>
         <div className='page'>
            <div className='page-title'>Sign Up</div>
            <div className='body-container'>
               <form onSubmit={handleSubmit}>

                  <div className='input-container'>
                     <div className='input-label'>
                        Username <span className='required'>*</span>
                     </div>
                     <input className='input-text' id='username' name='username' type='text' value={formData.username} onChange={handleChange} required/>
                  </div>

                  <div className='input-container'>
                     <div className='input-label'>
                        Password <span className='required'>*</span>
                     </div>
                     <input className='input-text' id='password' name='password' type='text' value={formData.password} onChange={handleChange} required/>
                  </div>

                  <div className='input-container'>
                     <div className='input-label'>
                        Email <span className='required'>*</span>
                     </div>
                     <input className='input-text' id='email' name='email' type='email' value={formData.email} onChange={handleChange} required/>
                  </div>

                  <div className='input-container'>
                     <input className='button' type='submit' value='Submit' />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};
export default Register;
