// defining the server port
const port = 5000;
// initializing installed dependencies
const express = require("express");
require("dotenv").config();
const axios = require("axios");
const app = express();
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
app.use(cors());
app.use(express.json());

const redirectUrl = "http://localhost:3000";
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope =
  "user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public";

app.listen(5000, () => console.log(`Server is running on ${port}`));
app.get("/gemini", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    res.send((await model.generateContent(prompt)).response.text());
  } catch (err) {
    res.send(new Error("Failed to get Gemini request"));
  }
});

app.get("/spotify/login", async (req, res) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: process.env.REACT_APP_SPOTIFY_API_KEY,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  console.log(code_verifier + " " + authUrl.toString());
  res.send([code_verifier, authUrl.toString()]);
});

app.get("/spotify/token", async (req, res) => {
  const code_verifier = req.query.verifier;
  const code = req.query.code;
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.REACT_APP_SPOTIFY_API_KEY,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });
  res.send(await response.json());
});
