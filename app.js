import cassettesCollection from "./cassettesCollections.json" assert { type: "json" };

import express, { json } from "express";
const app = express();
const port = 3000;

app.use(json());

let selectedCassette = null;

app.get("/api/cassettes", (req, res) => {
  res.json({ cassettes: cassettesCollection });
});

app.post("/api/select", (req, res) => {
  if (selectedCassette) {
    return res.status(400).json({
      message:
        "A cassette is already in place. Eject it before inserting a new one.",
    });
  }

  const cassetteId = req.body.id;
  const cassette = cassettesCollection.find((c) => c.id === cassetteId);

  if (cassette) {
    selectedCassette = {
      ...cassette,
      playing: false,
      paused: false,
      stopped: true,
      position: 0,
    };
    res.json({
      message: `Cassette selected: ${cassette.title}`,
      cassette: selectedCassette,
    });
  } else {
    res.status(404).json({ message: "Cassette not found" });
  }
});

app.post("/api/play", (req, res) => {
  if (selectedCassette) {
    if (!selectedCassette.playing) {
      selectedCassette.playing = true;
      selectedCassette.paused = false;
      selectedCassette.stopped = false;
      res.json({ message: "Now Playing", cassette: selectedCassette });
    } else {
      res.json({
        message: "The tape is already playing",
        cassette: selectedCassette,
      });
    }
  } else {
    res.status(400).json({ message: "No cassette selected" });
  }
});

app.post("/api/pause", (req, res) => {
  if (selectedCassette) {
    if (selectedCassette.playing) {
      selectedCassette.paused = true;
      selectedCassette.playing = false;
      res.json({ message: "Cassette paused", cassette: selectedCassette });
    } else {
      res.json({
        message: "The cassette is not playing",
        cassette: selectedCassette,
      });
    }
  } else {
    res.status(400).json({ message: "No cassette selected" });
  }
});

app.post("/api/stop", (req, res) => {
  if (selectedCassette) {
    selectedCassette.stopped = true;
    selectedCassette.playing = false;
    selectedCassette.paused = false;
    selectedCassette.position = 0;
    res.json({ message: "Cassette stopped", cassette: selectedCassette });
  } else {
    res.status(400).json({ message: "No cassette selected" });
  }
});

app.post("/api/eject", (req, res) => {
  if (selectedCassette) {
    if (!selectedCassette.playing && selectedCassette.stopped) {
      res.json({ message: `Cassette ejected: ${selectedCassette.title}` });
      selectedCassette = null;
    } else {
      res.status(400).json({
        message: "You must stop the cassette before ejecting it.",
      });
    }
  } else {
    res.status(400).json({ message: "No cassette to eject." });
  }
});

app.post("/api/forward", (req, res) => {
  if (selectedCassette) {
    let secondsToForward = req.body.seconds || 10;
    if (
      selectedCassette.position + secondsToForward <
      selectedCassette.duration
    ) {
      selectedCassette.position += secondsToForward;
      res.json({
        message: `Fast forwarded by ${secondsToForward} seconds`,
        cassette: selectedCassette,
      });
    } else {
      selectedCassette.position = selectedCassette.duration;
      res.json({
        message: "Tape advanced to the end",
        cassette: selectedCassette,
      });
    }
  } else {
    res.status(400).json({ message: "No cassette selected" });
  }
});

app.post("/api/rewind", (req, res) => {
  if (selectedCassette) {
    let secondsToRewind = req.body.seconds || 10;
    if (selectedCassette.position - secondsToRewind > 0) {
      selectedCassette.position -= secondsToRewind;
      res.json({
        message: `Rewinded by ${secondsToRewind} seconds`,
        cassette: selectedCassette,
      });
    } else {
      selectedCassette.position = 0;
      res.json({
        message: "Cassette reset to start",
        cassette: selectedCassette,
      });
    }
  } else {
    res.status(400).json({ message: "No cassette selected" });
  }
});

app.get("/api/status", (req, res) => {
  if (selectedCassette) {
    res.json({ cassette: selectedCassette });
  } else {
    res.status(400).json({ message: "No cassette selected" });
  }
});

app.listen(port, () => {
  console.log(`Cassette Player API available at http://localhost:${port}`);
});
