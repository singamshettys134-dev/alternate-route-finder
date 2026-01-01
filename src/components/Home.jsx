import { useEffect, useState } from "react";
import ProfileBar from "./ProfileBar";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
    } catch (err) {
      console.error("Invalid userProfile in localStorage");
      localStorage.removeItem("userProfile");
    }
  }, []);

  return (
    <div className="app">
      {profile && <ProfileBar profile={profile} />}

      <h1>Smart Journey Continuation System</h1>
      <p className="subtitle">
        Fastest possible train routes when direct trains are unavailable
      </p>

      {/* SEARCH BAR stays EXACTLY same */}
    </div>
  );
}
