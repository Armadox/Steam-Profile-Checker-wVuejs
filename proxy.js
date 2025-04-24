import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/steam-profile", async (req, res) => {
  const { steamid } = req.query;
  const steamApiKey = "";

  const steamUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamid}`;

  try {
    const response = await fetch(steamUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ error: "Error fetching Steam data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
