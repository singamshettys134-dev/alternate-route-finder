import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { from, to } = req.body;

  res.json({
    routes: [
      {
        via: "Chittoor",
        totalTime: 18,
        segments: [
          { from, to: "Chittoor", time: 6 },
          { from: "Chittoor", to, time: 12 }
        ]
      },
      {
        via: "Vellore",
        totalTime: 17,
        segments: [
          { from, to: "Vellore", time: 7 },
          { from: "Vellore", to, time: 10 }
        ]
      }
    ]
  });
});

export default router;
