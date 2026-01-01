import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileSetup from "./components/ProfileSetup";
import Home from "./components/Home";
import { getUser } from "./utils/auth";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = getUser();
    if (stored) {
      setUser(stored);
      setPage("home");
    }
  }, []);

  if (page === "login")
    return (
      <Login
        goSignup={() => setPage("signup")}
        goHome={(u) => {
          setUser(u);
          setPage("home");
        }}
      />
    );

  if (page === "signup")
    return (
      <Signup
        next={(u) => {
          setUser(u);
          setPage("profile");
        }}
      />
    );

  if (page === "profile")
    return (
      <ProfileSetup
        user={user}
        finish={(updatedUser) => {
          setUser(updatedUser);
          setPage("home");
        }}
      />
    );

  return (
    <Home
      user={user}
      logout={() => {
        setUser(null);
        setPage("login");
      }}
    />
  );
}
