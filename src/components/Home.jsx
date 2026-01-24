import { useState } from "react";
import PlaceInput from "./PlaceInput";
import ProfileBar from "./ProfileBar";

export default function Home({ auth, logout }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");

  const search = () => {
    if (!from || !to) {
      setError("Please select source and destination");
      return;
    }
    setError("");
  };

  return (
    <div className="app">
      <ProfileBar user={auth} logout={logout} />

      <h1>Alternate Route Finder</h1>
      <div className="subtitle">Welcome, {auth.firstName}</div>

      <div className="card search-card">
        <div className="search-bar">
          <PlaceInput
            value={from}
            onChange={setFrom}
            placeholder="Source"
          />
          <PlaceInput
            value={to}
            onChange={setTo}
            placeholder="Destination"
            disabled={!from}
          />
          <button className="search-btn" onClick={search}>
            Search Routes
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}
      </div>
    </div>
  );
}
