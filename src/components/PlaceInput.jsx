import { useEffect, useState } from "react";

export default function PlaceInput({
  value,
  onChange,
  placeholder,
  disabled = false,
}) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!value || value.length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        value
      )}&countrycodes=in&limit=5`,
      {
        headers: {
          "User-Agent": "alternate-route-finder",
        },
        signal: controller.signal,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(Array.isArray(data) ? data : []);
      })
      .catch(() => setSuggestions([]));

    return () => controller.abort();
  }, [value]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {suggestions.length > 0 && !disabled && (
        <div className="dropdown">
          {suggestions.map((place) => (
            <div
              key={place.place_id}
              className="menu-item"
              onClick={() => {
                onChange(place.display_name);
                setSuggestions([]);
              }}
            >
              {place.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
