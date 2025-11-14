import React from "react";
import { Input as AntInput } from "antd";

export default function Input({
  label,
  name,
  id,
  onChange,
  onBlur,
  type,
  placeholder,
  prefix,
  errors,
  touched,
  required = false,
}) {
  const hasError = errors && touched;

  return (
    <div className="auth-input">
      <label
        htmlFor={id}
        style={{ fontWeight: "500", display: "block", marginBottom: "4px" }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <AntInput
        name={name}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        prefix={prefix}
        status={hasError ? "error" : ""}
        style={{
          borderColor: hasError ? "#ff4d4f" : undefined,
        }}
      />
      {hasError && (
        <div style={{ color: "#ff4d4f", marginTop: "4px", fontSize: "12px" }}>
          {errors}
        </div>
      )}
    </div>
  );
}
