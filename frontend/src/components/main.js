//IMPORTS=========================================================================================================================================================

import React, { Component } from 'react';

//Child components
import EntryAddForm from './entryAddForm'
import AllEntriesList from './allEntriesList'
import AddButton from './addButton'


//STYLING=========================================================================================================================================================

//NAME, STATE, AND BINDING=========================================================================================================================================================

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalClicks: 0, 
      entries: [],
      entryAddFormIsVisible: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.showEntryAddForm = this.showEntryAddForm.bind(this);
  }
 
//LIFECYCLE METHODS=========================================================================================================================================================


//SELF METHODS=========================================================================================================================================================

  //When handleClick is called, do the following
  handleClick() {
    const total = this.state.totalClicks;
    this.setState({ totalClicks: total + 1 });
  }

  //When handleClick is called, do the following
  showEntryAddForm() {
    if (this.state.entryAddFormIsVisible === false) {
      this.setState({ entryAddFormIsVisible: true })
    } else {
      this.setState({ entryAddFormIsVisible: false })
    }
  }
  
//RENDER=========================================================================================================================================================

  render() {
    let content; 
    if (this.state.entryAddFormIsVisible) {
      content = <EntryAddForm onClick={this.handleClick} onParentStateChange={this.state.totalClicks}/>
    }
    return(
        <div className="p-3">
          <AddButton onClick={this.showEntryAddForm}/>
          {content}
          <br></br>
          <AllEntriesList onClick={this.handleClick} onParentStateChange={this.state.totalClicks} />
        </div>
    );
  }
}

//Export class AllEntriesList to be used by App.js
export default Main;