const Register = () => {
    return (
      <div id='register' className='page-outer'>
        <div className='page-inner'>
        <div className='page'>
                    <div className='page-title'>Sign Up</div>
                    <div className='register-container'>
                        <form>
                        <div className='input-container'>
                            <div className='input-label'>Username <span className='required'>*</span></div>
                            <input className='input-text' id='user' name='user' type='text'/>
                        </div>
                        <div className='input-container'>
                            <div className='input-label'>Password <span className='required'>*</span></div>
                            <input className='input-text' id='pword' name='pword' type='text'/>
                        </div>
                        <div className='input-container'>
                            <div className='input-label'>First Name</div>
                            <input className='input-text' id='fname' name='fname' type='text'/>
                        </div>
                        <div className='input-container'>
                            <div className='input-label'>Last Name</div>
                            <input className='input-text' id='lname' name='lname' type='text'/>
                        </div>
                        <div className='input-container'>
                            <input className='button' type='submit' value='Submit' />
                        </div>
                        </form>
                    </div>
            </div>
        </div>
      </div>
    );
  };
  export default Register;
  