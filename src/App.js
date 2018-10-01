import React, { Component } from 'react';
import './index.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
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
  constructor (props){
    super(props);

    this.state = {
      activeRoomName: 'room1',
      activeRoomId: '1'
    };
  }

  activeRoomView = (newActiveRoomId, newActiveRoomName) => {
    this.setState({
      activeRoomId: newActiveRoomId,
      activeRoomName: newActiveRoomName
    });
  }
  // Render RoomList
  render() {
    return (
      <div className="app">
        <sidebar className="sidebar">
          <header className="header">
            <h1 className="title">Bloc Chat</h1>
          </header>
          <RoomList
            firebase={firebase}
            className="roomList"
            activeRoomName={this.state.activeRoomName}
            activeRoomId={this.state.activeRoomId}
            activeRoomView={this.activeRoomView}
          />
        </sidebar>
        <section className="messageList">
          <MessageList
            firebase={firebase}
            activeRoomName={this.state.activeRoomName}
            activeRoomId={this.state.activeRoomId}
            activeRoomView={this.activeRoomView}
          />
        </section>
      </div>
    );
  }
}

export default App;
