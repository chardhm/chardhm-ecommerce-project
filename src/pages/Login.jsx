import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const login = async() => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem("currentUser" , JSON.stringify(result));
      /* Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login successfull',
        showConfirmButton: false,
        timer: 1500
      }) */
      window.location.href="/"
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login failed',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  return (
    <div className='login-parent'>
      <div className='login-bottom'>
      
      </div>
      <div className="row justify-content-center">


        <div className="col-md-3 z1">
          <div className="login-form">
            <h2 className='text-center'>Login</h2>
            <hr />

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-email-interface-kiranshastry-lineal-kiranshastry.png" width="28" alt="" />
                </span>
              </div>
              <input name="" className="form-control" placeholder="Email address" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-padlock-interface-kiranshastry-lineal-kiranshastry.png" width="28" alt="" />
                </span>
              </div>
              <input className="form-control" placeholder="Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>

            <div className="form-group text-center mt-1">
              <button type="button" className="my-3 btn-block px-4" onClick={login}> Login </button>
              <Link to="/register" className='loginLink px-4'>Create your account!</Link>
            </div>
            

          </div>
        </div>

        <div className="col-md-5 print">
          <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json"
            background="transparent"
            speed="1"
            loop
            autoplay>
          </lottie-player>
        </div>

      </div>
    </div>
  );
}
export default Login;