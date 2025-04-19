// lib/api.ts
export async function startGame() {
  const res = await fetch("http://localhost:8080/game/start", {
    method: "POST",
  });
  return res.json();
}

export async function sendMessage(gameId: string, message: string) {
  console.log("Sending message to backend:", { gameId, message });

  const res = await fetch("http://localhost:8080/game/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameId, message }),
  });

  let response = res.json();
  console.log(response);
  return response;
}

export async function changeDifficulty(gameId: string, gameMode: string) {
  console.log(
    `attempting to change difficulty to ${gameMode} for gameid: ${gameId}`
  );

  const res = await fetch("http://localhost:8080/game/difficulty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameId, gameMode }),
  });

  let response = res.json();
  console.log(`response to game mode change: ${response}`);

  return response;
}

export async function deleteGame(gameId: string) {
  console.log(`deleting game with id ${gameId}`);

  const res = await fetch("http://localhost:8080/game/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameId }),
  });

  const response = res.json();
  console.log(`response status: ${response}`);

  return response;
}
