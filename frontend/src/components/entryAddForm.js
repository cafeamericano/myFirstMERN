import React, { Component } from 'react';

//Define styles
const background = {
  background: '#f0ca62'
}

//Component Main
class EntryAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { //Set up some empty state.entry values where we can hold the user's entries 
      entry: {
        dueDate: '',
        taskDescription: ''
      }
    }
    this.clearForm = this.clearForm.bind(this);
  }
//LIFECYCLE METHODS=========================================================================================================================================================
  
  //Define a function that will clear out the values entered into the form
  clearForm() {
    this.setState({
      entry: {
        dueDate: '',
        taskDescription: ''
      }
    });
  }

  //Pre-define the HTTP request that will be called when the add form is submitted
  addEntry = (event) => {
      event.preventDefault();
      const entry = this.state.entry;
      fetch(`http://localhost:4000/entries/add?dueDate=${entry.dueDate}&taskDescription=${entry.taskDescription}`)
          .catch(err => console.error(err))
      this.clearForm();
  }

  //Visually render the add form
  render() {
      const entryToAdd = this.state.entry; //Create an object called entryToAdd that mimics this component's state.entry; it will be empty but allow the sub-states defined for this component to be filled by the code below

      return (
        <div style={background} className="p-3 mb-3 rounded border" onClick={this.props.onClick}> {/*This is where the child component uses its inherited method; when this div is clicked, handleClick is performed on the parent component*/}

            <form>

              <div class="form-group">
                <label for="formGroupExampleInput">Due Date</label>
                <input
                    className="form-control m-1" type="date" 
                    value={entryToAdd.dueDate}
                    onChange={event => this.setState({
                      entry: { ...entryToAdd, dueDate: event.target.value} //..Before the comma is the object to use, after the comma is the alteration to make to it
                    })}
                />
              </div>

              <div class="form-group">
                <label for="formGroupExampleInput2">Task Description</label>
                <input
                    placeholder="Task description" 
                    className="form-control m-1"
                    value={entryToAdd.taskDescription}
                    onChange={event => this.setState({
                      entry: { ...entryToAdd, taskDescription: event.target.value} //..Before the comma is the object to use, after the comma is the alteration to make to it
                    })}
                />
              </div>

              <div className="text-right" onClick={this.props.toggleAddForm}>
                <button onClick= {this.addEntry} className="btn btn-primary m-1"> Add entry </button>
              </div>

            </form>
            
        </div>
      );
  };
}

export default EntryAddForm;
