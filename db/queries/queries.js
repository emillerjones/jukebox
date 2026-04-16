import db from "#db/client";

/** @returns the movie created according to the provided details */
export async function createTrack({ name, duration_ms }) {
  const text = 'INSERT INTO tracks(name, duration_ms) VALUES($1, $2) RETURNING *';
  const values = [name, duration_ms];
  const res = await db.query(text, values);
  return res.rows[0];
}

export async function createPlaylist({ name, description }) {
  const text = 'INSERT INTO playlists(name, description) VALUES($1, $2) RETURNING *';
  const values = [name, description];
  const res = await db.query(text, values);
  return res.rows[0];
}


export async function getPlaylistTrack(p,t) {
    const text = 
                `SELECT 
                    *                  
                FROM 
                    playlists_tracks
                WHERE 
                    playlists_tracks.playlist_id = $1
                    AND
                    playlists_tracks.track_id = $2`;
    const values = [p, t];
    const res = await db.query(text, values)
    return res.rows[0];
}


export async function createPlaylistTrack({ playlist_id, track_id }) {
  const text = 'INSERT INTO playlists_tracks(playlist_id, track_id) VALUES($1, $2) RETURNING *'
  const values = [playlist_id, track_id]  
  const res = await db.query(text, values)
  return res.rows[0]
}



export async function getTracks() {
  const text = `SELECT 
                  *
                FROM 
                  tracks
                `  
  const res = await db.query(text)
  return res.rows;
}


export async function getTrackById(id) { 
  const text = `SELECT 
                  *
                FROM 
                  tracks                 
                WHERE 
                  id = $1;`;
  const values = [id];
  const res = await db.query(text, values);
  return res.rows[0];
}



export async function getPlaylists() {
  const text = `SELECT 
                  *
                FROM 
                  playlists
                `  
  const res = await db.query(text)
  return res.rows;
}


export async function getPlaylistById(id) { 
  const text = `SELECT 
                  *
                FROM 
                  playlists                 
                WHERE 
                  id = $1;`;
  const values = [id];
  const res = await db.query(text, values);
  return res.rows[0];
}

export async function getPlaylistTracksById(id) { 
  const text = `SELECT 
                  playlists.name
                  ,tracks.name
                  ,duration_ms
                FROM 
                  playlists_tracks  
                JOIN playlists ON playlists_tracks.playlist_id = playlists.id     
                JOIN tracks ON playlists_tracks.track_id = tracks.id             
                WHERE 
                  playlists_tracks.playlist_id = $1;`;
  const values = [id];
  const res = await db.query(text, values);
  return res.rows;
}