//IMPORTS=========================================================================================================================================================

import React, { Component } from 'react';
import BackgroundPhoto from './cork-wallet.png';

//Child components
//import EntryAddForm from './entryAddForm'
import DeleteEntryButton from './deleteEntryButton'

//STYLING=========================================================================================================================================================

let containerBackground = {
  background: '#d7dbf6'
}

let dateFormat = {
  paddingTop: '7px',
  fontWeight: 'bold'
}

//NAME, STATE, AND BINDING=========================================================================================================================================================

class AllEntriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalClicks: 0,
      entries: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  //LIFECYCLE METHODS=========================================================================================================================================================

  //Wait for component to mount before performing the getEntries method
  componentDidMount() {
    this.getEntries();
  }

  componentDidUpdate() {
    this.getEntries()
  }

  //SELF METHODS=========================================================================================================================================================

  //When handleClick is called, do the following
  handleClick() {
    this.getEntries();
    const total = this.state.totalClicks;
    this.setState({ totalClicks: total + 1 }
    );
  }

  //Make HTTP request, then take response as JSON and use it to set the state.entries of this component to what it returns
  getEntries = _ => {
    fetch('http://localhost:4000/entries')
      .then(response => response.json())
      //Here is where we fill state.entries with all values in the database
      .then(response => this.setState({ entries: response.data }))
      .catch(err => console.error(err))
  }

  //Predefine how we will visually layout each entry to the user
  renderEntry = ({ _id, dueDate, taskDescription }) =>
    <div className="card mt-3 mb-3 p-3 shadow-sm" key={_id}>
      <div className="row">
        <div className="col-11" style={dateFormat}>{dueDate}</div>
        <div className="col-1"><DeleteEntryButton identifier={_id} onClick={this.handleClick} /></div>
      </div>
      <hr></hr>
      <small>{taskDescription}</small>
    </div>

  //RENDER=========================================================================================================================================================

  render() {
    const stuffToShow = this.state.entries; //Create an array 'stuffToShow' and fill it with everything that was added to this component's state.entries arrayz
    return (
      <div className="border p-3 shadow" style={containerBackground}>
        {stuffToShow.map(this.renderEntry)} {/*Take everything in our stuffToShow array, then map to a new array the table row specified by the renderEntry function for each record*/}
      </div>
    );
  }
}

//Export class AllEntriesList to be used by App.js
export default AllEntriesList;