import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Link} from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
// import AuthService from "../../services/auth.service";
import RootService from "../../services/root.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Bạn cần điền vào trường này!
      </div>
    );
  }
};

const vfirstname = (value) => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Trường này không được để trống!
      </div>
    );
  }
};

const vlastname = (value) => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Trường này không được để trống!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Không tìm thấy email của bạn vui lòng nhập lại!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Tên đăng nhập phải từ 3 đến 20 kí tự!
      </div>
    );
  }
};

const vpassword = (value) => {
  // Kiểm tra có ít nhất một kí tự đặc biệt, một chữ in hoa và một số
  const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).*$/;
  // const regex = /^(?=(?:[^!@#$%^&*(),.?":{}|<>]*[!@#$%^&*(),.?":{}|<>]){2})(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^\d]*\d){2}).*$/; 2 kí tự

  if (!regex.test(value) || value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Mật khẩu phải từ 6 đến 40 kí tự và chứa nhất một kí tự đặc biệt, một chữ in hoa và một số!
      </div>
    );
  }
  // if (value.length < 6 || value.length > 40) {
  //   return (
  //     <div className="alert alert-danger" role="alert">
  //       Mật khẩu phải từ 6 đến 40 kí tự!
  //     </div>
  //   );
  // }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };

  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setButtonDisabled(true);
      // do something when no error
      // AuthService.register(firstname, lastname, username, email, password).then(
      //   (response) => {
      //     setMessage(response.data.message);
      //     setSuccessful(true);
      //   },
      //   (error) => {
      //     const resMessage =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();

      //     setMessage(resMessage);
      //     setSuccessful(false);
      //   }
      // ).finally(() => {
      //   // Re-enable the button after the request is complete
      //   setButtonDisabled(false);
      // });
      try {
        const response = await RootService.AuthService.register(firstname, lastname, username, email, password);
        setMessage(response.data.message);
        setSuccessful(true);
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
    
        setMessage(resMessage);
        setSuccessful(false);
      } finally {
        // Re-enable the button after the request is complete
        setButtonDisabled(false);
      }
    }
  };

  return (
    <main className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>

              <div className="mb-3 mt-3">
                <label htmlFor="firstname">Họ</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={onChangeFirstname}
                  validations={[required, vfirstname]}
                />
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="lastname">Tên</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  onChange={onChangeLastname}
                  validations={[required, vlastname]}
                />
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="username">Tên đăng nhập</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
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
                  validations={[required, vpassword]}
                />
              </div>

              <div className="mb-3 mt-3">
                <button className="btn btn-primary btn-block form-control" disabled={isButtonDisabled}>Đăng ký</button>
              </div>
              <Link to={"/login"} className="mb-3 mt-3"> 
                <span className="" style={{'display': 'inline-block', 'textAlign': 'center'}}>
                  Đăng nhập                             
                </span> 
              </Link>
            </div>
          )}

          {message && (
            <div className="mb-3 mt-3">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </main>
  );
};

export default Register;
