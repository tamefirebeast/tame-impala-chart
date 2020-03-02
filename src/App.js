import * as firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // 1. Create state to store the songs
  const [songs, setSongs] = useState();
  useEffect(() => {
    // 2. Query all documents in the songs collection
    firebase
      .firestore()
      .collection("songs")
      .get()
      // 3. When the query is resolved, save the documents
      // to the state
      .then(songs => setSongs(songs.docs));
  }, []);

  return (
    <div className="App">
      <h1>My Favourite Tame Impala Songs</h1>

      <ul>
        {songs
          ? songs.map(song => (
              <li key={song.id}>
                {song.data().title} ({song.data().rating})
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

  // 1. Get data from the form
  const title = form.title.value;
  const rating = parseInt(form.rating.value);

  // 2. Get Firestore instance
  const firestore = firebase.firestore();

  // 3. Add a document to the songs collection with random id
  const song = await firestore.collection("songs").add({ title, rating });

  alert(`Added ${title} song with id ${song.id}`);
  form.reset();
}
