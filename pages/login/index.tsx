import React, { ChangeEvent, FC, useState } from "react";
import Head from "next/head";
import useRouteIsAvailable from "../../hooks/useRouteIsAvailable";
import styles from "../../styles/Login.module.scss";
import Link from "next/link";
import { LoginForm } from "../../types/types";
import Input from "../../components/common/Input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authReducer";

const intialState: LoginForm = {
  username: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
  password: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
};

const Login: FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>(intialState);
  const isLoading: boolean = useRouteIsAvailable();
  const dispatch = useDispatch();
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: {
        value: event.target.value,
        isValid: true,
        validationMessage: "",
      },
    });
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post("/api/auth/login", {
        username: loginForm.username.value,
        password: loginForm.password.value,
      });
      dispatch(
        login({ userId: String(response.data.id), roles: response.data.roles })
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  if (!isLoading) {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>
        <section className={styles.loginContainer}>
          <h2 className={styles.loginHeading}>Login</h2>
          <form className={styles.inputContainer}>
            <Input
              value={loginForm.username.value}
              labelValue="Username"
              type="text"
              name="username"
              onFormChange={handleFormChange}
              valid={loginForm.username.isValid}
              validationMessage={loginForm.username.validationMessage}
            />
            <Input
              value={loginForm.password.value}
              labelValue="Password"
              type="password"
              name="password"
              onFormChange={handleFormChange}
              valid={loginForm.password.isValid}
              validationMessage={loginForm.password.validationMessage}
            />
          </form>
          <button className="button-default" onClick={handleLogin}>
            Login
          </button>
          <Link href="/register">Register</Link>
          <Link href="/forgot-password">Forgot password</Link>
        </section>
      </>
    );
  } else return null;
};

export default Login;
