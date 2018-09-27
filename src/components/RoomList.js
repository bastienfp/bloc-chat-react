import React, { Component } from 'react';

class RoomList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  //Fetch rooms from the database
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  //Controlled Component, keep the React state as the 'single source of truth'
  handleChange(event) {
    this.setState({newRoomName: event.target.value});
  }

  //Create the new room in Firebase
  //Prevent refresh
  //Reset newRoomName
  createRoom(event) {
    event.preventDefault();
    if (!this.state.newRoomName) { return }
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: '' });
  }
//Create a row for each room in the database
//User input to create a new room in the database and render it
  render() {
    return(
      <table id="room-list">
        <colgroup>
          <col id="room-name"/>
          </colgroup>
          <tbody>
            {
              this.state.rooms.map( (room, index) =>
                <tr className="room" key={index}>
                  <td>{room.name}</td>
                </tr>
              )
            }
            <tr>
              <td>
                <form onSubmit={ (e) => this.createRoom(e)}>
                  <input type="text" name="name" placeholder="New room name" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
                  <input type="submit" value="Create" />
                </form>
              </td>
            </tr>
          </tbody>
      </table>
    );
  }
}

export default RoomList;
