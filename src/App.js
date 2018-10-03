import React, { Component } from 'react';
import './index.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
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
      activeRoomName: '',
      activeRoomId: '',
      username: 'Guest',
      currentUser: '',
      isLoggedIn: false
    };
  }

  activeRoomView = (newActiveRoomId, newActiveRoomName) => {
    this.setState({
      activeRoomId: newActiveRoomId,
      activeRoomName: newActiveRoomName
    });
  }

  //Set username based on login or logout events from User component
  setUser = (user) => {
    this.setState({currentUser: user});
    const isLoggedIn = this.state.isLoggedIn;
    if ( isLoggedIn === true) {
      this.setState({
        isLoggedIn: false,
        username: 'Guest'
      });
    } else {
      this.setState({
        isLoggedIn: true,
        username: user.displayName
      });
    }
  }

  //Format all timestamps in the app
  formatTime(time) {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime1 = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    let formattedTime2 = hours + ':' + minutes.substr(-2);
    let h = hours % 12 || 12;
    let ampm = (hours < 12 || hours === 24) ? " AM" : " PM";
    let formattedTime3 = h + ':' + minutes.substr(-2) + ampm;
    return formattedTime3;
  }

  //Render RoomList
  //Render MessageList
  //Render User
  render() {
    return (
      <div className="app">
        <section className="sidebar">
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
        </section>
        <section className="messageList">
          <User
            firebase={firebase}
            setUser={this.setUser}
            username={this.state.username}
            currentUser={this.state.currentUser}
          />
          <MessageList
            firebase={firebase}
            activeRoomName={this.state.activeRoomName}
            activeRoomId={this.state.activeRoomId}
            activeRoomView={this.activeRoomView}
            username={this.state.username}
            formatTime={this.formatTime}
          />
        </section>
      </div>
    );
  }
}

export default App;
