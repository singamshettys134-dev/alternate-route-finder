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
    return <Login goSignup={() => setPage("signup")} goHome={setUser} />;

  if (page === "signup")
    return <Signup next={(u) => { setUser(u); setPage("profile"); }} />;

 if (page === "profile")
  return (
    <ProfileSetup
      user={user}
      finish={(updatedUser) => {
        setUser(updatedUser); // 🔥 UPDATE STATE
        setPage("home");
      }}
    />
  );


  return <Home user={user} logout={() => setPage("login")} />;
}
