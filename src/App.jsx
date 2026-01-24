import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileSetup from "./components/ProfileSetup";
import Home from "./components/Home";
import { getUser, saveUser, clearUser } from "./utils/auth";

export default function App() {
  const [page, setPage] = useState("login");
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const stored = getUser();
    if (stored && stored.token) {
      setAuth(stored);
      setPage("home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (page === "login") {
    return (
      <Login
        onLogin={(data) => {
          const authData = {
            ...data.user,
            token: data.token,
          };
          saveUser(authData);
          setAuth(authData);
          setPage("home");
        }}
        goSignup={() => setPage("signup")}
      />
    );
  }

  if (page === "signup") {
    return (
      <Signup
        onSignup={(data) => {
          const authData = {
            ...data.user,
            token: data.token,
          };
          saveUser(authData);
          setAuth(authData);
          setPage("profile");
        }}
        back={() => setPage("login")}
      />
    );
  }

  if (page === "profile") {
    return (
      <ProfileSetup
        auth={auth}
        onFinish={() => setPage("home")}
      />
    );
  }

  return (
    <Home
      auth={auth}
      goProfile={() => setPage("profile")} // ✅ EDIT PROFILE NAVIGATION
      logout={() => {
        clearUser();
        setAuth(null);
        setPage("login");
      }}
    />
  );
}
