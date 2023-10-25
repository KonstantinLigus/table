"use client";

import { loginFormSubmitHandler } from "@/server-actions/actions";
import { FormEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import styles from "./styles.module.css";

export function LoginForm() {
  const [message, setMessage] = useState<String | null>(null);
  const [userNameError, setUserNameError] = useState<String | null>(null);
  const [passwordError, setPasswordError] = useState<String | null>(null);

  useEffect(() => {
    if (message === "success") {
      redirect("/table?limit=10&offset=0");
    }
  }, [message]);

  const onSubmitClickHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = await loginFormSubmitHandler(formData);
    if (Array.isArray(data)) {
      data.forEach(({ path, message }) => {
        if (path[0] === "username") {
          setUserNameError(message);
        }
        if (path[0] === "password") {
          setPasswordError(message);
        }
      });
    } else if (data && data?.message) {
      setMessage(data.message);
      setUserNameError(null);
      setPasswordError(null);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmitClickHandler}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          className={styles.input}
        />
        {userNameError && (
          <span className={styles.errorMessage}>{userNameError}</span>
        )}
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="text"
          name="password"
          className={styles.input}
        />
        {passwordError && (
          <span className={styles.errorMessage}>{passwordError}</span>
        )}
        {message && (
          <p aria-live="polite" className={styles.errorMessage}>
            {message}
          </p>
        )}
        <button type="submit" className={styles.logInBtn}>
          logIn
        </button>
      </form>
    </div>
  );
}
