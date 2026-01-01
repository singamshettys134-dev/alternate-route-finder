import { useState } from "react";

export default function Signup({ onSignup, back }) {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  const submit = () => {
    if (Object.values(form).some((v) => v.trim() === "")) {
      setError("All fields are required to continue");
      return;
    }
    onSignup(form);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card card">
        <h2>Create Account</h2>

        <input placeholder="First Name" onChange={(e) => update("first", e.target.value)} />
        <input placeholder="Last Name" onChange={(e) => update("last", e.target.value)} />
        <input placeholder="Email" onChange={(e) => update("email", e.target.value)} />
        <input placeholder="Contact Number" onChange={(e) => update("phone", e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => update("password", e.target.value)} />

        {error && <div className="form-error">{error}</div>}

        <button className="search-btn" onClick={submit}>
          Continue
        </button>

        <div className="auth-link" onClick={back}>Back to login</div>
      </div>
    </div>
  );
}
