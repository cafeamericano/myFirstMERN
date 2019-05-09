import React, { Component } from 'react';
import EntryAddForm from './entryAddForm'
import DeleteEntryButton from './deleteEntryButton'

//Define styles

class AllEntriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalClicks: 0, 
      entries: []
    }
    this.handleClick = this.handleClick.bind(this);
  }
 
  //Wait for component to mount before performing the getEntries method
  componentDidMount(){
    this.getEntries();
  }

  //When handleClick is called, do the following
  handleClick() {
    this.getEntries();
    const total = this.state.totalClicks;
    this.setState(
      { totalClicks: total + 1 }
    );
  }
  
  //Make HTTP request, then take response as JSON and use it to set the state.entries of this component to what it returns
  getEntries = _ => {
      fetch('http://localhost:4000/entries')
          .then(response => response.json())
          //Here is where we fill state.entries with all values in the database
          .then(response => this.setState({entries: response.data}))
          .catch(err => console.error(err))
  }

  //Predefine how we will visually layout each entry to the user
  renderEntry = ({id, date, subject, hours}) => 
    <div className="card bg-warning m-3 p-3" key={id}>
        <div className="row">
          <div className="col">{date}</div>
          <div className="col">{subject}</div>
          <div className="col">{hours}</div>
          <DeleteEntryButton identifier={id} className="col" onClick={this.handleClick} />
        </div>
    </div>

  //Prepare the component for visual rendering
  render() {
    const stuffToShow = this.state.entries; //Create an array 'stuffToShow' and fill it with everything that was added to this component's state.entries array
    return(
        <div className="border border-success p-3">
            <EntryAddForm onClick={this.handleClick} />
            <br/>
            <h3>AllEntriesList Component</h3>
            {stuffToShow.map(this.renderEntry)} {/*Take everything in our stuffToShow array, then map to a new array the table row specified by the renderEntry function for each record*/}
        </div>
    );
  }
}

//Export class AllEntriesList to be used by App.js
export default AllEntriesList;