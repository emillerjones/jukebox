-- TODO
-- psql -U postgres -c "CREATE DATABASE jukebox;"
DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;


CREATE TABLE playlists (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE tracks (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    duration_ms INT NOT NULL
);

CREATE TABLE playlists_tracks (
    id SERIAL PRIMARY KEY NOT NULL,    
    playlist_id INT NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    UNIQUE (playlist_id, track_id)
);