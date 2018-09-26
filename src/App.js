import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDel60G4l2uuumoDpPEQMp4yhdLFQ9Ndj0",
  authDomain: "bloc-chat-react-bfp.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-bfp.firebaseio.com",
  projectId: "bloc-chat-react-bfp",
  storageBucket: "bloc-chat-react-bfp.appspot.com",
  messagingSenderId: "606160730107"
};
firebase.initializeApp(config);

class App extends Component {
  // Render RoomList
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat React</h1>
        </header>
        <section>
        <RoomList
          firebase={firebase}
        />
        </section>
      </div>
    );
  }
}

export default App;
