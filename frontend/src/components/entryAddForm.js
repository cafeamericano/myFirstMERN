import React, { Component } from 'react';

//Define styles
const inline = {
  display: 'inline-block'
}

//Component Main
class EntryAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { //Set up some empty state.entry values where we can hold the user's entries 
      entry: {
        date: '',
        comments: ''
      }
    }
    this.clearForm = this.clearForm.bind(this);
  }
//LIFECYCLE METHODS=========================================================================================================================================================
  
  //Define a function that will clear out the values entered into the form
  clearForm() {
    this.setState({
      entry: {
        date: '',
        comments: ''
      }
    });
  }

  //Pre-define the HTTP request that will be called when the add form is submitted
  addEntry = (event) => {
      event.preventDefault();
      const entry = this.state.entry;
      fetch(`http://localhost:4000/entries/add?date=${entry.date}&comments=${entry.comments}`)
          .catch(err => console.error(err))
      this.clearForm();
  }

  //Visually render the add form
  render() {
      const entryToAdd = this.state.entry; //Create an object called entryToAdd that mimics this component's state.entry; it will be empty but allow the sub-states defined for this component to be filled by the code below

      return (
        <div className="p-3 mb-3 rounded border" onClick={this.props.onClick}> {/*This is where the child component uses its inherited method; when this div is clicked, handleClick is performed on the parent component*/}

            <form>

              <div class="form-group">
                <label for="formGroupExampleInput">Date</label>
                <input
                    placeholder="Date" className="form-control m-1" type="date" 
                    value={entryToAdd.date}
                    onChange={event => this.setState({
                      entry: { ...entryToAdd, date: event.target.value} //..Before the comma is the object to use, after the comma is the alteration to make to it
                    })}
                />
              </div>

              <div class="form-group">
                <label for="formGroupExampleInput2">Comments</label>
                <input
                    placeholder="Comments" 
                    className="form-control m-1"
                    value={entryToAdd.comments}
                    onChange={event => this.setState({
                      entry: { ...entryToAdd, comments: event.target.value} //..Before the comma is the object to use, after the comma is the alteration to make to it
                    })}
                />
              </div>

              <div className="text-right">
                <button onClick= {this.addEntry} className="btn btn-primary m-1"> Add entry </button>
              </div>

            </form>
            
        </div>
      );
  };
}

export default EntryAddForm;
