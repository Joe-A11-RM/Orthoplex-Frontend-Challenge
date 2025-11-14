import React from "react";
import PhoneInput from "antd-phone-input";

export default function PhoneNumber({
  label,
  name,
  id,
  onChange,
  onBlur,
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

      <PhoneInput
        country="eg"
        disableDropdown
        name={name}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        status={hasError ? "error" : ""}
      />

      {hasError && (
        <div style={{ color: "#ff4d4f", marginTop: "4px", fontSize: "12px" }}>
          {errors}
        </div>
      )}
    </div>
  );
}
