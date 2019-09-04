import React, { Component } from "react";
import logo from "./images/logo.jpg";
import "./sass/_loginSty.scss";
import ReactDOM from "react-dom";

class App extends Component {
  state = {
    isLoginOpen: true,
    isRegisterOpen: false
  };

  showLoginBox = () => {
    this.setState({
      isLoginOpen: true,
      isRegisterOpen: false
    });
  };

  showRegisterBox = () => {
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true
    });
  };

  render() {
    return (
      <div className="root-container">
        <div className="login-container">
          <div className="box-controller">
            <div
              className={
                "controller selected-controller-" +
                (this.state.isLoginOpen ? "login" : "")
              }
              onClick={this.showLoginBox}
            >
              Login
            </div>
            <div
              className={
                "controller selected-controller-" +
                (this.state.isRegisterOpen ? "register" : "")
              }
              onClick={this.showRegisterBox}
            >
              Register
            </div>
          </div>

          <div className="box-container">
            {this.state.isLoginOpen && <LoginBox />}
            {this.state.isRegisterOpen && <RegisterBox />}
          </div>
        </div>
      </div>
    );
  }
}

class LoginBox extends Component {
  state = {
    username: "",
    password: "",
    errors: []
  };

  showValidationErr = (elm, msg) => {
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  };

  clearValidationErr = elm => {
    this.setState(prevState => {
      let newArr = [];

      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }

      return { errors: newArr };
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.clearValidationErr(e.target.name);
  };

  submitLogin = e => {
    let loginSuccess = true;

    if (this.state.username == "") {
      this.showValidationErr("username", "Please enter your username.");
      loginSuccess = false;
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "Please enter your password.");
      loginSuccess = false;
    }

    if (loginSuccess) {
      alert(
        "Username: " +
          this.state.username +
          "\n" +
          "Password: " +
          this.state.password
      );
    }
  };

  render() {
    let usernameErr = null,
      passwordErr = null;

    for (let err of this.state.errors) {
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
    }

    return (
      <div className="inner-container">
        <img src={logo} className="logo-img" alt="logo"></img>

        <div className="header">Login</div>

        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onChange}
            />
            <small className="danger-error">
              {usernameErr ? usernameErr : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onChange}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this.submitLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

class RegisterBox extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
    pwdStrength: null
  };

  showValidationErr = (elm, msg) => {
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  };

  clearValidationErr = elm => {
    this.setState(prevState => {
      let newArr = [];

      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }

      return { errors: newArr };
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.clearValidationErr(e.target.name);

    if (e.target.name == "password") {
      this.setState({ pwdStrength: "weak" });
      if (e.target.value.length > 6) {
        this.setState({ pwdStrength: "medium" });
      }
      if (e.target.value.length > 12) {
        this.setState({ pwdStrength: "strong" });
      }
    }
  };

  submitRegister = e => {
    let registerSuccess = true;

    if (this.state.username == "") {
      this.showValidationErr("username", "Please enter a username.");
      registerSuccess = false;
    }
    if (this.state.email == "") {
      this.showValidationErr("email", "Please enter an email.");
      registerSuccess = false;
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "Please enter a password.");
      registerSuccess = false;
    }
    if (this.state.confirmPassword == "") {
      this.showValidationErr(
        "confirmPassword",
        "Please confirm your password."
      );
      registerSuccess = false;
    } else if (this.state.confirmPassword !== this.state.password) {
      this.showValidationErr("confirmPassword", "Passwords do not match.");
      registerSuccess = false;
    }

    if (registerSuccess) {
      alert(
        "Username: " +
          this.state.username +
          "\n" +
          "Email: " +
          this.state.email +
          "\n" +
          "Password: " +
          this.state.password
      );
    }
  };

  render() {
    let usernameErr = null,
      passwordErr = null,
      emailErr = null,
      confirmPasswordErr = null;

    for (let err of this.state.errors) {
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "email") {
        emailErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
      if (err.elm == "confirmPassword") {
        confirmPasswordErr = err.msg;
      }
    }

    let pwdWeak = false,
      pwdMedium = false,
      pwdStrong = false;

    switch (this.state.pwdStrength) {
      case "strong":
        pwdStrong = true;
      case "medium":
        pwdMedium = true;
      case "weak":
        pwdWeak = true;
    }

    return (
      <div className="inner-container">
        <img src={logo} className="logo-img" alt="logo"></img>

        <div className="header">Register</div>

        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onChange}
            />
            <small className="danger-error">
              {usernameErr ? usernameErr : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={this.onChange}
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onChange}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>

            {this.state.password && (
              <div className="password-state">
                <div
                  className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}
                ></div>
                <div
                  className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}
                ></div>
                <div
                  className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}
                ></div>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="login-input"
              placeholder="Confirm Password"
              onChange={this.onChange}
            />
            <small className="danger-error">
              {confirmPasswordErr ? confirmPasswordErr : ""}
            </small>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this.submitRegister}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default App;
