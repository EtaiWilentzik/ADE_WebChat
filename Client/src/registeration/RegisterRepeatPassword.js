import React from "react";

export function ValidateRepeatPassword(password, repeatPassword, setRepeatPasswordError) {
   if (password !== repeatPassword) {
        setRepeatPasswordError("Passwords do not match");
      } else {
        setRepeatPasswordError("");
      }
}

export function RegisterRepeatPassword({ password, repeatPassword, setRepeatPassword, repeatPasswordError, setRepeatPasswordError }) {
  return (

    <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <input
                  type="password"
                  className={`form-control ${repeatPasswordError ? 'is-invalid' : ''}`}
                  placeholder="Repeat Your password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  onBlur={() => ValidateRepeatPassword(password,repeatPassword,  setRepeatPasswordError)}
                  title="Repeat exactly the same password"
                />
                {repeatPasswordError && (
                  <div className="invalid-feedback">
                  {repeatPasswordError}
                  </div> )}
              </div>
            </div>
  );
}