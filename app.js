import express from "express";
import { createTrack, createPlaylist, getPlaylistTrack, createPlaylistTrack, getTracks, getTrackById, getPlaylists, getPlaylistById, getPlaylistTracksById } from './db/queries/queries.js'
const app = express();
app.use(express.json());
export default app;



app.get('/tracks', async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

app.get("/tracks/:id", async (req, res) => {
  const { id } = req.params;
    if (Number.isNaN(Number(id))) {
        return res.status(400).send("ID is not a number")
    }

    const track = await getTrackById(id);
    if (!track) {
        return res.status(404).send("Track not found");
    }
    res.send(track);
});




app.get('/playlists', async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

app.post("/playlists", async (request, response) => {

    if (request.body === undefined){
        response.status(400).send(`Request must have a body.`)
        return;
    }
    else if(!request.body.name || !request.body.description){
        response.status(400).send(`Required fields missing.`)
        return;
    }

    const newPlaylist = await createPlaylist({name: request.body.name, description: request.body.description});   
    response.status(201).send(newPlaylist);
});




app.get("/playlists/:id", async (req, res) => {
  const { id } = req.params;
    if (Number.isNaN(Number(id))) {
        return res.status(400).send("ID is not a number")
    }
  const playlist = await getPlaylistById(id);
  if (!playlist) {
    return res.status(404).send("playlist not found");
  }
  res.send(playlist);
});

app.get("/playlists/:id/tracks", async (req, res) => {
    const { id } = req.params;
    if (Number.isNaN(Number(id))) {
        return res.status(400).send("ID is not a number")
    }
    const playlist = await getPlaylistById(id);
    if (!playlist) {
        return res.status(404).send("playlist tracks not found");
    }
    const tracks = await getPlaylistTracksById(id);
    res.send(tracks);
});

app.post("/playlists/:id/tracks", async (req, res) => {
    const { id } = req.params;
    

    if (Number.isNaN(Number(id))) {
        return res.status(400).send("ID is not a number")
    }
    if (req.body === undefined){
        res.status(400).send(`Request must have a body.`)
        return;
    }
    else if(!req.body.trackId){
        res.status(400).send(`Required fields missing.`)
        return;
    }

    const track_id = req.body.trackId;
    if (Number.isNaN(Number(track_id))) {
        return res.status(400).send("track_id is not a number")
    }
    const track = await getTrackById(track_id);
    if (!track) {
        return res.status(400).send("track does not exist");
    }
    let p = await getPlaylistById(id);
    if (!p){
      return res.status(404).send("playlist dne");
    }  

    let e = await getPlaylistTrack(id,track_id);
    if (!e){
      const playlist = await createPlaylistTrack({ playlist_id: id, track_id: track_id});
      return res.status(201).send(playlist);
    }    
    else
        {
            return res.status(400).res.send("combo already exists")
        }  
});