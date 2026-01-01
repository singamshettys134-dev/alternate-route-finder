import { useState } from "react";
import ProfileBar from "./ProfileBar";

export default function Home({ user, logout }) {
  const [routes, setRoutes] = useState([]);

  const search = () => {
    setRoutes([
      { via: "Chittoor", total: "16 hrs", legs: [
        { from: "Bengaluru", to: "Chittoor", time: "5 hrs" },
        { from: "Chittoor", to: "Hyderabad", time: "11 hrs" },
      ]},
      { via: "Tirupati", total: "18 hrs", legs: [
        { from: "Bengaluru", to: "Tirupati", time: "6 hrs" },
        { from: "Tirupati", to: "Anantapur", time: "12 hrs" },
      ]}
    ]);
  };

  return (
    <div className="app">
      <ProfileBar user={user} logout={logout} />

      <h1>Smart Journey Continuation System</h1>
      <p className="subtitle">Fastest possible train routes when direct trains are unavailable</p>

      <div className="card search-card">
        <div className="search-bar">
          <select>
            <option>Current Location</option>
            <option>Bengaluru</option>
          </select>

          <select>
            <option>Select Destination</option>
            <option>Hyderabad</option>
          </select>

          <button className="search-btn" onClick={search}>Search</button>
        </div>
      </div>

      {routes.map((r, i) => (
        <div key={i} className="route-card">
          <div className="route-header">
            Via {r.via}
            <span>{r.total}</span>
          </div>

          {r.legs.map((l, j) => (
            <div key={j} className="route-leg">
              🚆 {l.from} → {l.to}
              <span>{l.time}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
