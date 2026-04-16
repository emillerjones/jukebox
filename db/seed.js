import db from "#db/client";
import { createTrack, createPlaylist, getPlaylistTrack, createPlaylistTrack } from './queries/queries.js'
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const tracksCount = 21;
  const playlistsCount = 11;
  const ptCount = 123;
  let fileSuffix = 1;

  for (let i = 0; i < tracksCount; i++){
    const track = await createTrack({ name: `TrackName${i+1}`, duration_ms: Math.floor(Math.random() * (400 - 200 + 1)) + 200});
  }


  for (let i = 0; i < playlistsCount; i++){
    const track = await createPlaylist({ name: `PlaylistName${i+1}`, description: `Playlist Description - ${i+1}`});
  }


  let count = 0;
  while (count < ptCount){
    let p = Math.floor(Math.random() * playlistsCount) + 1;
    let t = Math.floor(Math.random() * tracksCount) + 1;
    let e = await getPlaylistTrack(p,t);

    if (!e){
      const track = await createPlaylistTrack({ playlist_id: p, track_id: t});
      count++;
    }   
  }
}
