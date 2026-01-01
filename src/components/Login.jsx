export default function Login({ onLogin, goSignup }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card card">
        <h2>Welcome Back</h2>

        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button
          className="search-btn"
          onClick={() => onLogin({ email: "demo@mail.com" })}
        >
          Sign In
        </button>

        <div className="auth-links">
          <span className="auth-link">Forgot password?</span>
          <span className="auth-link primary" onClick={goSignup}>
            Create account
          </span>
        </div>
      </div>
    </div>
  );
}
