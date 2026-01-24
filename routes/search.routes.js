import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// helper: get coordinates from place name
async function geocode(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    place
  )}&limit=1&countrycodes=in`;

  const res = await fetch(url, {
    headers: { "User-Agent": "alternate-route-finder" },
  });

  const data = await res.json();

  if (!data.length) return null;

  return {
    lat: data[0].lat,
    lon: data[0].lon,
    display: data[0].display_name,
  };
}

router.post("/", async (req, res) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ message: "Missing locations" });
    }

    // 1️⃣ Geocode
    const fromLoc = await geocode(from);
    const toLoc = await geocode(to);

    if (!fromLoc || !toLoc) {
      return res.status(404).json({
        message: "Location not found. Please try another spelling.",
      });
    }

    // 2️⃣ OSRM routing
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${fromLoc.lon},${fromLoc.lat};${toLoc.lon},${toLoc.lat}?alternatives=true&overview=false`;

    const routeRes = await fetch(osrmUrl);
    const routeData = await routeRes.json();

    if (!routeData.routes) {
      return res.status(500).json({ message: "Routing failed" });
    }

    // 3️⃣ Format response
    const routes = routeData.routes.map((r) => ({
      totalTime: Math.round(r.duration / 3600),
      segments: [
        {
          from: fromLoc.display,
          to: toLoc.display,
          time: Math.round(r.duration / 60),
        },
      ],
    }));

    res.json({ routes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
