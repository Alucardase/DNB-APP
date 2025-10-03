const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/stream", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("No URL provided");

  try {
    res.setHeader("Content-Type", "audio/mp3");
    ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    }).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error streaming audio");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
