import React, { Component } from 'react';

class EntryAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { //Set up some empty state.entry values where we can hold the user's entries 
      entry: {
        date: '',
        subject: '',
        hours: ''
      }
    }
    this.clearForm = this.clearForm.bind(this);
  }
  
  //Define a function that will clear out the values entered into the form
  clearForm() {
    this.setState({
      entry: {
        date: '',
        subject: '',
        hours: ''
      }
    });
  }

  //Pre-define the HTTP request that will be called when the add form is submitted
  addEntry = _ => {
      const entry = this.state.entry;
      fetch(`http://localhost:4000/entries/add?date=${entry.date}&subject=${entry.subject}&hours=${entry.hours}`)
          .catch(err => console.error(err))
      this.clearForm();
  }

  //Visually render the add form
  render() {
      const entryToAdd = this.state.entry; //Create an object called entryToAdd that mimics this component's state.entry; it will be empty but allow the sub-states defined for this component to be filled by the code below

      return (
        <div className="border border-primary p-3"> {/*This is where the child component uses its inherited method; when this div is clicked, handleClick is performed on the parent component*/}
            <h3>EntryAddForm Sub-Component</h3>

            <input
                placeholder="Date" className="m-1" type="date" 
                value={entryToAdd.date}
                onChange={event => this.setState({
                  entry: { ...entryToAdd, date: event.target.value} //..Before the comma is the object to use, after the comma is the alteration to make to it
                })}
            />

            <input
                placeholder="Subject" className="m-1"
                value={entryToAdd.subject}
                onChange={event => this.setState({
                  entry: { ...entryToAdd, subject: event.target.value} //..Before the comma is the object to use, after the comma is the alteration to make to it
                })}
            />

            <input
                placeholder="Hours" className="m-1"
                value={entryToAdd.hours}
                onChange={event => this.setState({
                  entry: { ...entryToAdd, hours: event.target.value} //..Before the comma is the object to use, after the comma is the alteration to make to it
                })}
            />

            <div onClick={this.props.onClick}>
                <button onClick= {this.addEntry} className="btn btn-primary m-1"> Add entry </button>
            </div>

        </div>
      );
  };
}

export default EntryAddForm;
