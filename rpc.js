// rpc.js
const RPC = require("discord-rpc");
const express = require("express");
const app = express();
const client = new RPC.Client({ transport: "ipc" });
const PORT = 3000;

let currentSong = null;

client.on("ready", () => {
  console.log("✅ Discord RPC connected as", client.user.username);
  updatePresence();
});

function updatePresence() {
  if (!currentSong) return;
  client.setActivity({
    details: `🎶 ${currentSong.title}`,
    state: "Velkzie Music Player",
    largeImageKey: "music",
    largeImageText: "Now Playing",
    instance: false
  });
}

// API endpoint for your web app to update now-playing
app.use(express.json());
app.post("/update", (req, res) => {
  currentSong = req.body;
  updatePresence();
  res.json({ ok: true });
});

app.listen(PORT, () => console.log("RPC server listening on", PORT));
client.login({ clientId: "849661451190534154" }).catch(err => {
  console.warn("⚠️ Could not connect to Discord RPC:", err.message);
});

