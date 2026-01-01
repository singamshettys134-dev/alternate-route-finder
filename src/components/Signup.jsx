import { saveUser } from "../utils/auth";

export default function Signup({ next }) {
  const submit = () => {
    const user = {
      first: "Yogesh",
      last: "K",
      email: "yogi@mail.com",
      phone: "9999999999",
      username: "@yogi.ok2025",
      bio: "",
      profilePic: null

    };
    saveUser(user);
    next(user);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <input placeholder="First name" />
        <input placeholder="Last name" />
        <input placeholder="Email" />
        <input placeholder="Contact number" />
        <input type="password" placeholder="Password (min 8 chars)" />
        <button className="primary-btn" onClick={submit}>Sign Up</button>
      </div>
    </div>
  );
}
