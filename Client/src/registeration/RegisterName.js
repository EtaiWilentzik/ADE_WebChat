import React from "react";

export function ValidateFullName(fullName, setFullNameError) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const words = fullName.trim().split(/\s+/);

  if (fullName.length > 20) {
    setFullNameError("Name must not exceed 20 characters");
  } else if (words.length < 2 || !nameRegex.test(fullName)) {
    setFullNameError("Please enter at least two words with only English letters");
  } else {
    setFullNameError("");
  }
}


export function RegisterName({ fullName, setFullName, fullNameError, setFullNameError }) {
  return (

<div className="d-flex flex-row align-items-center mb-4">
  <div className="form-outline flex-fill mb-0">
    <input
      type="text"
      className={`form-control ${fullNameError ? 'is-invalid' : ''}`}
      placeholder="Enter your full name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      onBlur={() => ValidateFullName(fullName, setFullNameError)}
      title="at least 2 words, only English letters"
    />
    {fullNameError && (
      <div className="invalid-feedback">
        {fullNameError}
      </div>
    )}
  </div>
</div>
  );
}