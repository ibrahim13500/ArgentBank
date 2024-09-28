import React from 'react';
import Loginform from '../../components/Loginform/Loginform';




/* Login page */
function Login () {
    return (
        <div className='signin-page'>
            <main className='bg-dark'>
            
                {/* Returns form component */}
                < Loginform />
            </main>
            
        </div>
        
    )
}

export default Login;