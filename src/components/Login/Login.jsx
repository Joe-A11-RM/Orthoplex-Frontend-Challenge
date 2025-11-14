import React, { useEffect, useState } from "react";
import LoginHelmet from "./LoginHelmet";
import { Navigate, useLocation, useNavigate } from "react-router";
import Input from "../FormInputs/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation } from "../../Redux/service/freshcart";
import { toast } from "react-toastify";
import { Button, Spin } from "antd";
import { setLoginData } from "../../Redux/service/loggedUserData";
import { useDispatch } from "react-redux";

export default function Login() {
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      token &&
      (location.pathname === "/login" || location.pathname === "/")
    ) {
      navigate("/dashboard");
    }
  }, [token, location.pathname]);
  const initialValues = {
    email: "",
    password: "",
  };
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalid email"),
    password: Yup.string().required("Password is required"),
  });
  let loginUser = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await login(values).unwrap();
        toast.success("Login successfully", {
          autoClose: 800,
        });
        dispatch(
          setLoginData({
            user: data?.user?.name,
            email: data?.user?.email,
            role: data?.user?.role,
          })
        );
        setSubmitAttempt(false);
        localStorage.setItem("token", data?.token);
        navigate("/dashboard");
      } catch (error) {
        setSubmitAttempt(false);
        const msg =
          error?.data?.errors?.msg ||
          error?.data?.message ||
          error?.message ||
          "Something went wrong";
        toast.error(msg, {
          autoClose: 800,
        });
      }
    },
  });
  if (isLoading) {
    return (
      <div className="loader">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <LoginHelmet />
      <div className="auth">
        <div className="auth-layout">
          <h1>welcome back</h1>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitAttempt(true);
              loginUser.handleSubmit(e);
            }}
          >
            <Input
              label="email"
              type="email"
              id="email"
              name="email"
              onChange={loginUser.handleChange}
              onBlur={loginUser.handleBlur}
              errors={loginUser.errors.email}
              touched={loginUser.touched.email}
              value={loginUser.values.email || ""}
              placeholder="Enter your email"
              required={true}
            />

            <Input
              label="password"
              type="password"
              id="password"
              name="password"
              onChange={loginUser.handleChange}
              onBlur={loginUser.handleBlur}
              errors={loginUser.errors.password}
              touched={loginUser.touched.password}
              value={loginUser.values.password || ""}
              placeholder="Enter your password"
              required={true}
            />

            <Button type="primary" className="auth-btn" htmlType="submit">
              login
            </Button>
            {submitAttempt && !loginUser.isValid && (
              <div className="validation">Please check required inputs</div>
            )}
          </form>

          <p className="switch-text" onClick={() => navigate("/register")}>
            Don’t have an account? <span>Sign up</span>
          </p>
        </div>
      </div>
    </>
  );
}
