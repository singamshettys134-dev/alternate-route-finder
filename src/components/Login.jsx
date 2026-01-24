import { useState } from "react";

export default function Login({ onLogin, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Check your email/password");
        return;
      }

      onLogin({
        ...data.user,
        token: data.token,
      });
    } catch {
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={{ position: "relative" }}>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShow(!show)}
            style={{ position: "absolute", right: 12, top: 12, cursor: "pointer" }}
          >
            👁
          </span>
        </div>

        {error && <div className="form-error">{error}</div>}

        <button className="search-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="link" onClick={goSignup}>
          Create an account
        </div>
      </div>
    </div>
  );
}
