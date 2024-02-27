import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";s
import RootService from "../../services/root.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Chưa nhập dữ liệu cho trường này!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  // const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // const [userId, setUserId] = useState("");

  const onChangeUsername = (e) => {
    // const username = e.target.value;
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    // const password = e.target.value;
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // setUserId(e);
    setMessage("");
    setLoading(true);

    // console.log(userId);
    form.current.validateAll();

    // if (checkBtn.current.context._errors.length === 0) {
      // AuthService.login(username, password).then(
      //   () => {
      //     navigate("/");
      //     window.location.reload();
      //   },
      //   (error) => {
      //     const resMessage =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();

      //     setLoading(false);
      //     setMessage(resMessage);
      //   }).finally(() => {
      //     setLoading(false);
      //   });
      try {
        await RootService.AuthService.login(username, password);
        navigate("/");
        window.location.reload();
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setMessage(resMessage);
          setLoading(false);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="mb-3 mt-3">
            <label htmlFor="username">Tên đăng nhập</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="password">Mật khẩu</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="mb-3 mt-3">
            <button className="btn btn-primary btn-block form-control" disabled={loading}>
              {loading && (
                <button className="spinner-border spinner-border-sm"></button> 
              )}
              {" "} <span>Đăng nhập</span>
            </button>            
          </div>

          {message && (
            <div className="mb-3 mt-3">
              <div className="alert alert-danger" role="alert">
                Tên đăng nhập hoặc mật khẩu không đúng!
              </div>
            </div>
          )}
          
          <Link to={"/register"} className="mb-3 mt-3"> 
              <span className="" style={{'display': 'inline-block', 'textAlign': 'center'}}>
                  Đăng ký                              
              </span> 
          </Link>
          {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
          {/* <Link to={"/register"} className=""> 
              <span className="" >
                  Sign up                              
              </span> 
            </Link> */}

        </Form>
      </div>
    </div>
  );
};

export default Login;
