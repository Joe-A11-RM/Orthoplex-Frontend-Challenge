import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SignUpHelmet from "./SignUpHelmet";
import Input from "../FormInputs/Input";
import { useLocation, useNavigate } from "react-router";
import PhoneNumber from "../FormInputs/PhoneNumber";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "antd";
import { useSignupMutation } from "../../Redux/service/freshcart";
import { Spin } from "antd";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (
      token &&
      (location.pathname === "/login" || location.pathname === "/")
    ) {
      navigate("/dashboard");
    }
  }, [token, location.pathname]);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name at least 3 characters")
      .max(12, "Name at max 24 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone should be egyptian phone number"),

    email: Yup.string().required("Email is required").email("invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password should contain at least 6 characters")
      .max(12, "Password should contain maximum 12 characters"),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "Password and Repassword not the same"),
  });
  let addUser = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setSubmitAttempt(true);
      try {
        await signup(values).unwrap();
        toast.success("Your account registered successfully", {
          autoClose: 800,
        });

        setSubmitAttempt(false);
        navigate("/login");
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
      <SignUpHelmet />
      <div className="auth">
        <div className="auth-layout">
          <h1>register</h1>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitAttempt(true);
              addUser.handleSubmit(e);
            }}
          >
            <div className="row gy-3">
              <Input
                label="name"
                type="text"
                id="name"
                name="name"
                onChange={addUser.handleChange}
                onBlur={addUser.handleBlur}
                errors={addUser.errors.name}
                touched={addUser.touched.name}
                value={addUser.values.name || ""}
                placeholder="Enter your name"
                required={true}
              />
              <PhoneNumber
                label="phone"
                id="phone"
                name="phone"
                onChange={(value) => {
                  const fullPhone = `0${value?.areaCode || ""}${
                    value?.phoneNumber || ""
                  }`;
                  addUser.setFieldValue("phone", fullPhone);
                }}
                onBlur={addUser.handleBlur}
                errors={addUser.errors.phone}
                touched={addUser.touched.phone}
                value={addUser.values.phone || ""}
                required={true}
              />

              <Input
                label="email"
                type="email"
                id="email"
                name="email"
                onChange={addUser.handleChange}
                onBlur={addUser.handleBlur}
                errors={addUser.errors.email}
                touched={addUser.touched.email}
                value={addUser.values.email || ""}
                placeholder="Enter your email"
                required={true}
              />

              <Input
                label="password"
                type="password"
                id="password"
                name="password"
                onChange={addUser.handleChange}
                onBlur={addUser.handleBlur}
                errors={addUser.errors.password}
                touched={addUser.touched.password}
                value={addUser.values.password || ""}
                placeholder="Enter your password"
                required={true}
              />

              <Input
                label="re-password"
                type="password"
                id="rePassword"
                name="rePassword"
                onChange={addUser.handleChange}
                onBlur={addUser.handleBlur}
                errors={addUser.errors.rePassword}
                touched={addUser.touched.rePassword}
                value={addUser.values.rePassword || ""}
                placeholder="Enter your rePassword"
                required={true}
              />
            </div>

            <Button type="primary" className="auth-btn" htmlType="submit">
              register
            </Button>
            {submitAttempt && !addUser.isValid && (
              <div className="validation">Please check required inputs</div>
            )}
          </form>

          <p className="switch-text" onClick={() => navigate("/")}>
            Already have an account? <span href="/login">Login</span>
          </p>
        </div>
      </div>
    </>
  );
}
