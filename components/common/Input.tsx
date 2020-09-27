import React, { ChangeEvent, FC } from "react";
import styles from "../../styles/Input.module.scss";

interface InputProps {
  value?: string;
  labelValue?: string;
  type: "number" | "text" | "password";
  name?: string;
  onFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  valid?: boolean;
  validationMessage?: string;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  value,
  labelValue,
  type,
  name,
  onFormChange,
  valid,
  validationMessage,
  disabled,
}) => {
  return (
    <div className={styles.inputContainer}>
      {labelValue && (
        <label className={styles.inputLabel} htmlFor={name}>
          {labelValue}
        </label>
      )}
      <input
        className={styles.input}
        disabled={disabled}
        id={name}
        name={name}
        value={value}
        type={type}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onFormChange(event)}
        autoComplete="off"
      />
      {!valid && valid !== undefined && (
        <div className={styles.validationMessage}>{validationMessage}</div>
      )}
    </div>
  );
};

export default Input;
