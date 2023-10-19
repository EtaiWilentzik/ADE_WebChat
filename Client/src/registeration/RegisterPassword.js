import React from "react";

export function ValidatePassword(password, setPasswordError) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;

        if (!passwordRegex.test(password)) {
          let error = "Password must ";
          if (password.length < 6 || password.length > 10) {
            error += "be 6-10 characters long";
          } else {
            if (!/(?=.*[a-z])/.test(password)) {
            error += "contain at least 1 lowercase letter";
          }else {
            if (!/(?=.*[A-Z])/.test(password)) {
                error += "contain at least 1 uppercase letter";
            }else {
              if (!/(?=.*\d)/.test(password)) {
                error += "contain at least 1 number";
              }
                }
          }
        }
            setPasswordError(error);
      } else {
            setPasswordError("");
      }
}

export function RegisterPassword({ password, setPassword, passwordError, setPasswordError }) {
  return (

    <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <input
                  type="password"
                  className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => ValidatePassword(password, setPasswordError)}
                  title="6-10 chars, at leat one - Upper, Lower, digit"
                />
                {passwordError && (
                  <div className="invalid-feedback">
                   {passwordError}
                  </div>
                )}
              </div>
            </div>
  );
}





