import React, { ChangeEvent, FC, useState } from "react";
import Head from "next/head";
import useRouteIsAvailable from "../../hooks/useRouteIsAvailable";
import styles from "../../styles/Login.module.scss";
import Link from "next/link";
import { RegistrationForm } from "../../types/types";
import Input from "../../components/common/Input";
import axios from "axios";

const intialState: RegistrationForm = {
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

const Register: FC = () => {
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>(
    intialState
  );
  const isLoading: boolean = useRouteIsAvailable();

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRegistrationForm({
      ...registrationForm,
      [event.target.name]: {
        value: event.target.value,
        isValid: true,
        validationMessage: "",
      },
    });
  };

  const handleRegistration = async (): Promise<void> => {
    try {
      await axios.post("api/auth/register", {
        username: registrationForm.username.value,
        password: registrationForm.password.value,
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  if (!isLoading) {
    return (
      <>
        <Head>
          <title>Register</title>
        </Head>
        <section className={styles.loginContainer}>
          <h2 className={styles.loginHeading}>Register</h2>
          <form className={styles.inputContainer}>
            <Input
              value={registrationForm.username.value}
              labelValue="Username"
              type="text"
              name="username"
              onFormChange={handleFormChange}
              valid={registrationForm.username.isValid}
              validationMessage={registrationForm.username.validationMessage}
            />
            <Input
              value={registrationForm.password.value}
              labelValue="Password"
              type="password"
              name="password"
              onFormChange={handleFormChange}
              valid={registrationForm.password.isValid}
              validationMessage={registrationForm.password.validationMessage}
            />
          </form>
          <button className="button-default" onClick={handleRegistration}>
            Register
          </button>
          <Link href="/forgot-password">Forgot password</Link>
        </section>
      </>
    );
  } else return null;
};

export default Register;
