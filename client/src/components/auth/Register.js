import React, { useContext, useState, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { Register, error, clearError, isAuthenticated } = authContext;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("please enter the credentials", "danger");
    } else if (password !== password2) {
      setAlert("password doesnt match", "danger");
    } else {
      Register({
        name,
        email,
        password,
      });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "email already exists") {
      setAlert(error, "danger");
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  return (
    <div className="form-container">
      <h1>
        ACCOUNT <span className="text-primary">REGISTER</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Register;
