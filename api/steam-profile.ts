export default async function handler(req, res) {
  const { steamid, apiKey } = req.query; // Get the steamid and apiKey from the query params

  // Check if steamid or apiKey is missing
  if (!steamid || !apiKey) {
    return res.status(400).json({ error: "steamid and apiKey are required" });
  }

  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamid}`
    );

    if (!response.ok) {
      throw new Error("Steam API request failed");
    }

    const data = await response.json();

    // Send the data back to the client
    res.status(200).json(data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
}
