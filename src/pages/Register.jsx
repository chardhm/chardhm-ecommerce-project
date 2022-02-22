import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const auth = getAuth();

  const register = async() => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      console.log(result);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your account has been registered',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Registration failed',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  return (
    <div className='register-parent'>
      <div className='register-top'>
      
      </div>
      <div className="row justify-content-center">

        <div className="col-md-5">
          <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_bCtom0.json"
            background="transparent"
            speed="1"
            loop
            autoplay>
          </lottie-player>
        </div>

        <div className="col-md-3 z1">
          <div className="register-form">
            <h2 className='text-center'>Register</h2>
            <hr />

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-email-interface-kiranshastry-lineal-kiranshastry.png" width="21" alt="" />
                </span>
              </div>
              <input name="" className="form-control" placeholder="Email address" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-padlock-interface-kiranshastry-lineal-kiranshastry.png" width="21" alt="" />
                </span>
              </div>
              <input className="form-control" placeholder="Create password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-padlock-interface-kiranshastry-lineal-kiranshastry.png" width="21" alt="" />
                </span>
              </div>
              <input className="form-control" placeholder="Confirm password" type="password" value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />
            </div>

            <div className="form-group text-center">
              <button type="button" className="my-3 btn-block px-4" onClick={register}> Register account </button>

            <Link to="/login" className='loginLink px-4'>Click here to Login</Link>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
