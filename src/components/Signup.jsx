import { useState } from "react";

export default function Signup({ onSignup, back }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(form.email))
      return setError("Invalid email");

    if (!phoneRegex.test(form.phone))
      return setError("Invalid phone number");

    if (!passwordRegex.test(form.password))
      return setError("Password must be strong");

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.message);

    onSignup({ ...data.user, token: data.token });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card card">
        <h2>Signup</h2>

        {["firstName", "lastName", "email", "phone", "password"].map((f) => (
          <input
            key={f}
            placeholder={f}
            type={f === "password" ? "password" : "text"}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          />
        ))}

        {error && <div className="form-error">{error}</div>}

        <button className="search-btn" onClick={submit}>
          Signup
        </button>

        <div className="link" onClick={back}>
          Back to login
        </div>
      </div>
    </div>
  );
}
