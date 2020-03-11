import * as firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // 1. Create a state to store the user.
  // When the user's undefined, then the auth isn't initialized.
  // When it's null, then the user is not logged in.
  const [user, setUser] = useState();
  useEffect(() => {
    // 2. Add auth state change listener.
    firebase.auth().onAuthStateChanged(userData => {
      if (userData) {
        // 3. Save the user data to the state if it's logged in.
        setUser(userData);
      } else {
        // 4. Set the user to null to indicate that it's not logged in.
        setUser(null);
      }
    });
  }, []);

  const [songs, setSongs] = useState();
  useEffect(() => {
    return firebase
      .firestore()
      .collection("songs")
      .onSnapshot(songs => setSongs(songs.docs));
  }, []);

  if (user === undefined) {
    // 5. Display loading.
    return <div className="App">Loading...</div>;
  } else if (user === null) {
    // 6. Display the sign in button.
    return (
      <div className="App">
        <h1>Please sign in</h1>
        <button
          onClick={() => {
            // 1. Create the Google auth provider
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
          }}
        >
          Sign in with Google
        </button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          Signed in as {user.email} |{" "}
          <button
            onClick={() => {
              // Sign out the user
              firebase.auth().signOut();
            }}
          >
            Sign out
          </button>
        </div>

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
                        const confirmDelete = window.confirm(
                          `Do you want to remove ${data.input}?`
                        );
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
