//IMPORTS=========================================================================================================================================================

import React, { Component } from 'react';

//Child components
import EntryAddForm from './entryAddForm'
import AllEntriesList from './allEntriesList'

//STYLING=========================================================================================================================================================

//NAME, STATE, AND BINDING=========================================================================================================================================================

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalClicks: 0, 
      entries: []
    }
    this.handleClick = this.handleClick.bind(this);
  }
 
//LIFECYCLE METHODS=========================================================================================================================================================


//SELF METHODS=========================================================================================================================================================

  //When handleClick is called, do the following
  handleClick() {
    const total = this.state.totalClicks;
    this.setState({ totalClicks: total + 1 });
  }
  
//RENDER=========================================================================================================================================================

  render() {
    return(
        <div className="p-3">
          <div className="text-right"> <h5>New Task <i class="fas fa-plus-circle"></i></h5> </div>
          {/*<EntryAddForm onClick={this.handleClick} onParentStateChange={this.state.totalClicks}/>*/}
          <br></br>
          <AllEntriesList onClick={this.handleClick} onParentStateChange={this.state.totalClicks} />
        </div>
    );
  }
}

//Export class AllEntriesList to be used by App.js
export default Main;