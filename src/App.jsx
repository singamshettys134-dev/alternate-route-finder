import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileSetup from "./components/ProfileSetup";
import Home from "./components/Home";
import { getUser, saveUser, clearUser } from "./utils/auth";

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

  if (page === "login") {
    return (
      <Login
        onLogin={(u) => {
          saveUser(u);
          setUser(u);
          setPage("home");
        }}
        goSignup={() => setPage("signup")}
      />
    );
  }

  if (page === "signup") {
    return (
      <Signup
        onSignup={(u) => {
          saveUser(u);
          setUser(u);
          setPage("profile");
        }}
        back={() => setPage("login")}
      />
    );
  }

  if (page === "profile") {
    return (
      <ProfileSetup
        user={user}
        onFinish={(updatedUser) => {
          saveUser(updatedUser);
          setUser(updatedUser);
          setPage("home");
        }}
      />
    );
  }

  return (
    <Home
      user={user}
      logout={() => {
        clearUser();
        setUser(null);
        setPage("login");
      }}
    />
  );
}
