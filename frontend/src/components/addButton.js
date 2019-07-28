import React, { Component } from 'react';

//STYLING=========================================================================================================================================================

let background = {
  background: '#bcebeb'
}

//Component Main
class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = { //Set up some empty state.entry values where we can hold the user's entries 
      entry: {
        date: '',
        comments: ''
      }
    }
  }

  //Visually render the add form
  render() {
    const entryToAdd = this.state.entry; //Create an object called entryToAdd that mimics this component's state.entry; it will be empty but allow the sub-states defined for this component to be filled by the code below

    return (
      <div className="p-3 mb-3" style={background} onClick={this.props.onClick}>
        <div className="text-right"> <h5>New Task <i class="fas fa-plus-circle"></i></h5> </div>
      </div>
    );
  };

}

export default AddButton;
