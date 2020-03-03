import * as firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [songs, setSongs] = useState();
  useEffect(() => {
    return firebase
      .firestore()
      .collection("songs")
      .onSnapshot(songs => setSongs(songs.docs));
  }, []);

  return (
    <div className="App">
      <h1>My Favourite Tame Impala Songs</h1>

      <ul>
        {songs
          ? songs.map(song => (
              <li key={song.id}>
                {song.data().title}{" "}
                <input
                  value={song.data().rating}
                  onChange={e => {
                    // Update the rating:
                    song.ref.update({ rating: parseInt(e.target.value) });
                  }}
                  type="number"
                  min="0"
                  max="100"
                  required
                />
              </li>
            ))
          : "Loading..."}
      </ul>

      <h2>Add new song:</h2>

      <form name="song" onSubmit={handleSubmit}>
        <p>
          <label>
            Title: <input name="title" required />
          </label>
        </p>

        <p>
          <label>
            Rating:{" "}
            <input name="rating" type="number" min="0" max="100" required />
          </label>
        </p>

        <p>
          <button type="submit">Add to chart!</button>
        </p>
      </form>
    </div>
  );
}

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const title = form.title.value;
  const rating = parseInt(form.rating.value);
  const firestore = firebase.firestore();

  firestore.collection("songs").add({ title, rating });
  form.reset();
}
