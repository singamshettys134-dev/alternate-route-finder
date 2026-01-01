import { useState } from "react";

/**
 * Dummy stations (you can expand later)
 */
const STATIONS = [
  "Bengaluru",
  "Tirupati",
  "Chittoor",
  "Anantapur",
  "Hyderabad",
  "Kadapa",
];

/**
 * Dummy time matrix (rough, realistic)
 */
const TIME = {
  "Bengaluru-Tirupati": 6,
  "Tirupati-Bengaluru": 6,

  "Tirupati-Chittoor": 2,
  "Chittoor-Tirupati": 2,

  "Chittoor-Anantapur": 6,
  "Anantapur-Chittoor": 6,

  "Tirupati-Anantapur": 12,
  "Anantapur-Tirupati": 12,

  "Chittoor-Hyderabad": 11,
  "Hyderabad-Chittoor": 11,

  "Bengaluru-Hyderabad": 10,
  "Hyderabad-Bengaluru": 10,

  "Kadapa-Anantapur": 4,
  "Anantapur-Kadapa": 4,

  "Kadapa-Tirupati": 5,
  "Tirupati-Kadapa": 5,
};

/**
 * Helper to get time safely
 */
function getTime(from, to) {
  return TIME[`${from}-${to}`] ?? 8; // fallback
}

export default function Home() {
  const [from, setFrom] = useState("Bengaluru");
  const [to, setTo] = useState("Tirupati");
  const [routes, setRoutes] = useState([]);

  function searchRoutes() {
    // 🚫 BLOCK INVALID SEARCH
    if (from === to) {
      alert("Source and destination cannot be the same");
      return;
    }

    /**
     * Generate alternate routes via intermediate hubs
     * RULES:
     * - via !== from
     * - via !== to
     * - no leg where from === to
     */
    const alternates = STATIONS
      .filter(via => via !== from && via !== to)
      .map(via => {
        const leg1Time = getTime(from, via);
        const leg2Time = getTime(via, to);

        return {
          via,
          legs: [
            {
              mode: "TRAIN",
              from,
              to: via,
              time: leg1Time,
            },
            {
              mode: "TRAIN",
              from: via,
              to,
              time: leg2Time,
            },
          ],
          total: leg1Time + leg2Time,
        };
      });

    // Optional: sort by fastest first
    alternates.sort((a, b) => a.total - b.total);

    setRoutes(alternates);
  }

  return (
    <div className="app">
      <h1>Smart Journey Continuation System</h1>
      <p className="subtitle">
        Fastest possible train routes when direct trains are unavailable
      </p>

      {/* SEARCH CARD */}
      <div className="card search-card">
        <div className="search-bar">
          <select value={from} onChange={e => setFrom(e.target.value)}>
            {STATIONS.map(st => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <select value={to} onChange={e => setTo(e.target.value)}>
            {STATIONS.map(st => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <button className="search-btn" onClick={searchRoutes}>
            Search
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {routes.length > 0 && (
        <div className="results">
          {routes.map((route, idx) => (
            <div className="route" key={idx}>
              {route.legs.map((leg, i) => (
                <div className="leg" key={i}>
                  <span className="badge train">{leg.mode}</span>
                  <span>
                    {leg.from} → {leg.to}
                  </span>
                  <span style={{ marginLeft: "auto", fontWeight: 600 }}>
                    {leg.time} hrs
                  </span>
                </div>
              ))}

              <hr />

              <div className="total">
                <div>Via {route.via}</div>
                <span>{route.total} hrs</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
