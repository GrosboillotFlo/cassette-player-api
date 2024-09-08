# Walkman Simulation API

This is a simple API that simulates the behavior of a cassette player (the Walkman type) built with Node.js and Express. You can interact with this API to play, pause, stop, forward, rewind, and eject cassettes from a predefined collection.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
  - [GET /cassettes](#get-cassettes)
  - [POST /select](#post-select)
  - [POST /play](#post-play)
  - [POST /pause](#post-pause)
  - [POST /stop](#post-stop)
  - [POST /eject](#post-eject)
  - [POST /forward](#post-forward)
  - [POST /rewind](#post-rewind)
  - [GET /status](#get-status)
- [Example Workflows](#example-workflows)
  - [Using curl](#using-curl)
  - [Using PowerShell](#using-powershell)

## Installation

### Prerequisites

- Node.js (>= 12.x)
- npm (Node package manager)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/grosboillotflo/cassette-player-api.git
   cd walkman-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the API server:

   ```bash
   node app.js
   ```

   The API server will start on `http://localhost:3000` by default.

## Endpoints

### GET /cassettes

Retrieve the list of available cassettes.

#### Example Response

```json
{
  "cassettes": [
    {
      "id": 1,
      "title": "The Dark Side of the Moon",
      "artist": "Pink Floyd",
      "year": 1973,
      "genre": "Rock progressif",
      "duration": 2580
    },
    {
      "id": 2,
      "title": "Thriller",
      "artist": "Michael Jackson",
      "year": 1982,
      "genre": "Pop",
      "duration": 2580
    }
  ]
}
```

### POST /select

Select a cassette by ID from the collection.

#### Request Body

```json
{
  "id": 1
}
```

#### Example Response

```json
{
  "message": "Cassette selected: The Dark Side of the Moon",
  "cassette": {
    "id": 1,
    "title": "The Dark Side of the Moon",
    "artist": "Pink Floyd",
    "year": 1973,
    "genre": "Rock progressif",
    "duration": 2580,
    "playing": false,
    "paused": false,
    "stopped": true,
    "position": 0
  }
}
```

### POST /play

Start playing the selected cassette.

#### Example Response

```json
{
  "message": "Now Playing",
  "cassette": {
    /* cassette info */
  }
}
```

### POST /pause

Pause the currently playing cassette.

#### Example Response

```json
{
  "message": "Cassette paused",
  "cassette": {
    /* cassette info */
  }
}
```

### POST /stop

Stop the cassette and reset the position to the beginning.

#### Example Response

```json
{
  "message": "Cassette stopped",
  "cassette": {
    /* cassette info */
  }
}
```

### POST /eject

Eject the cassette after it has been stopped.

#### Example Response

```json
{
  "message": "Cassette ejected: The Dark Side of the Moon"
}
```

### POST /forward

Fast forward the cassette by a given number of seconds.

#### Request Body (Optional)

```json
{
  "seconds": 15
}
```

If no body is provided, it will fast forward by 10 seconds by default.

#### Example Response

```json
{
  "message": "Fast forwarded by 15 seconds",
  "cassette": {
    /* cassette info */
  }
}
```

### POST /rewind

Rewind the cassette by a given number of seconds.

#### Request Body (Optional)

```json
{
  "seconds": 10
}
```

If no body is provided, it will rewind by 10 seconds by default.

#### Example Response

```json
{
  "message": "Rewinded by 10 seconds",
  "cassette": {
    /* cassette info */
  }
}
```

### GET /status

Retrieve the current status of the cassette player, including the selected cassette and its playback state.

#### Example Response

```json
{
  "cassette": {
    "id": 1,
    "title": "The Dark Side of the Moon",
    "artist": "Pink Floyd",
    "year": 1973,
    "genre": "Rock progressif",
    "duration": 2580,
    "playing": true,
    "paused": false,
    "stopped": false,
    "position": 120
  }
}
```

## Example Workflows

### Using curl

#### 1. Get the list of cassettes

```bash
curl -X GET http://localhost:3000/api/cassettes
```

#### 2. Select a cassette by ID

```bash
curl -X POST http://localhost:3000/api/select -H "Content-Type: application/json" -d '{"id": 1}'
```

#### 3. Play the selected cassette

```bash
curl -X POST http://localhost:3000/api/play
```

#### 4. Pause the cassette

```bash
curl -X POST http://localhost:3000/api/pause
```

#### 5. Stop the cassette

```bash
curl -X POST http://localhost:3000/api/stop
```

#### 6. Eject the cassette

```bash
curl -X POST http://localhost:3000/api/eject
```

### Using PowerShell

#### 1. Get the list of cassettes

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/cassettes" -Method GET
```

#### 2. Select a cassette by ID

```powershell
$body = @{ id = 1 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/select" -Method POST -Body $body -ContentType "application/json"
```

#### 3. Play the selected cassette

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/play" -Method POST
```

#### 4. Pause the cassette

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/pause" -Method POST
```

#### 5. Stop the cassette

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/stop" -Method POST
```

#### 6. Eject the cassette

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/eject" -Method POST
```
