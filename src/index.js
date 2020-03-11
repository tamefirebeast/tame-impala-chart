import * as firebase from "firebase/app";
// 1. Ensure that you import the firebase/auth module
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp({
  apiKey: "AIzaSyCWG-cL-QJZ3OV2QVRForOMpIUZla1DepA",
  projectId: "tame-impala-chart",
  // 2. Set authDomain to YOUR_APP_ID.firebaseapp.com
  authDomain: "tame-impala-chart.firebaseapp.com"
});

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
