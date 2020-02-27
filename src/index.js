// 1. Import Firebase app
import * as firebase from "firebase/app";
// 2. Import the auth module
import "firebase/auth";
// 3. Import Firestore module
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// 4. Initialize Firebase using values that you can find at:
// https://console.firebase.google.com/project/_/settings/general/
firebase.initializeApp({
  apiKey: "AIzaSyCWG-cL-QJZ3OV2QVRForOMpIUZla1DepA",
  projectId: "tame-impala-chart"
});

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
