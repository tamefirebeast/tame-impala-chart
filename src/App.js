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
          ? songs.map(song => {
              const data = song.data();
              return (
                <li key={song.id}>
                  {song.data().title}{" "}
                  <input
                    value={data.rating}
                    onChange={e =>
                      song.ref.update({ rating: parseInt(e.target.value) })
                    }
                    type="number"
                    min="0"
                    max="100"
                    required
                  />{" "}
                  <button
                    onClick={e => {
                      e.preventDefault();
                      // 2. Confirm the deletion
                      const confirmDelete = window.confirm(
                        `Do you want to remove ${data.input}?`
                      );
                      // 3. Delete the component; delete returns a promise
                      confirmDelete && song.ref.delete();
                    }}
                  >
                    Remove
                  </button>
                </li>
              );
            })
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
