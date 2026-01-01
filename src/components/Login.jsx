import { getUser } from "../utils/auth";

export default function Login({ goSignup, goHome }) {
  const login = () => {
    const user = getUser();
    if (!user) {
      alert("User not found. Please sign up.");
      return;
    }
    goHome(user);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <input placeholder="Email or mobile number" />
        <input type="password" placeholder="Password" />
        <button className="primary-btn" onClick={login}>Sign In</button>
        <p className="link">Forgot password?</p>
        <p className="link" onClick={goSignup}>New here? Create an account</p>
      </div>
    </div>
  );
}
