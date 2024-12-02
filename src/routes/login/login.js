import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import InputMuiRct from "../../app-modules/reusableComponents/mui/input/index.tsx";
import { apiService } from "../../app-modules/reusableComponents/services/apiService.tsx";
import { NotificationManager } from "react-notifications";



// let token = localStorage.getItem(DEVELOPMENT_CONFIG.TOKEN);

function LogIn() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [domainName, setDomain] = useState(window.location.host.split("."));
  const [errors, setErrors] = useState("");
  const [isForgotPassword, setForgotPassword] = useState(false);
  const [passwordType,setPasswordType]=useState("password");;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
       postLogin();
    }
  };

  const postLogin = async () => {
    var data = {
      username: username,
      password: password,
    };
    const response = await apiService.login(data)
    if(response.status === 200) {
      NotificationManager.success('Login successful')
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('loggedInUser', response.data.user)
      navigate('/dashboard')
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setusername(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
    // if (event.target.name === "domainName") {
    //     setDomain(event.target.value);
    // }
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!username || username.trim().length === 0) {
      formIsValid = false;
      errors["username"] = 'This field is required';
    }
    if (!password || password.trim().length === 0) {
      formIsValid = false;
      errors["password"] = 'This field is required';
    }
    // if (!domainName || domainName.trim().length === 0) {
    //     formIsValid = false;
    //     errors["domainName"] = ErrorHelper.FIELD_BLANK;
    //   }
    setErrors(errors);
    return formIsValid;
  };

  const handleForgotPass = () => {
    setForgotPassword(true);
  };

  const handleClosePassword = () => {
    setForgotPassword(false);
  };

  const togglePassword =(event)=>{
   event.preventDefault();

    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid">
      </div>
      <div className="login-form custome-login-form">
        <div className="container-fluid">
          <div className="row example-wrapper">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="login-wrapper">
              <div className="login-wrapper_img mx-auto text-center mb-4">
                {/* Add your logo here */}
              </div>
              <div className="inner-login-notenetic">
                <h2>Sign in to your account</h2>
                <div className="mb-4">
                  <InputMuiRct
                    label="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    error={errors.username}
                    helperText={errors.username ? 'This field is required' : ''}
                    name="username"
                  />
                </div>
                <div className="mb-2 position-relative">
                  <InputMuiRct
                    label="Password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    error={errors.password}
                    helperText={errors.password ? 'This field is required' : ''}
                    name="password"
                  />
                  <span className="password-hide-show-icon" onClick={togglePassword}>
                    {passwordType === 'password' ? (
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    )}
                  </span>
                </div>
                <button type="submit" onClick={handleSubmit} className="my-3">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* {isForgotPassword && <ForgotPassword onClose={handleClosePassword} />} */}
    </div>
    </form>
  );
}
export default LogIn;
