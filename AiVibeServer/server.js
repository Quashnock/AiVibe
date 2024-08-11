import e from "express";
import SpotifyWebApi from "spotify-web-api-node";
const app = e();

app.post("/login", function (req, res) {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "08f45a34c4d34abc87bd67da22a74824",
    clientSecret: "27ebe479a00e49fcbfc50d871e0774a7",
  });

  spotifyApi.authorizationCodeGrant(code).then((data) => {
    res
      .json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
      .catch(() => {
        res.sendStatus(400);
      });
  });
});
