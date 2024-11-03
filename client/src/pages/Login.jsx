const Login = (props) => {
    const {testName} = props
    console.log(testName)
    return (
      <div id='login' className='page-outer'>
        <div className='page-inner'>
            <div className='page'>
                <div className='page-title'>Sign In</div>
                <div className='login-container'>
                    <form>
                        <div className='input-container'>
                            <div className='input-label'>Username</div>
                            <input className='input-text' id='user' name='user' type='text'/>
                        </div>
                        <div className='input-container'>
                            <div className='input-label'>Password</div>
                            <input className='input-text' id='pword' name='pword' type='text'/>
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
  export default Login;
  