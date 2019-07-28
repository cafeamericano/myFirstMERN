import React, { Component } from 'react';

class DeleteEntryButton extends Component {

  //Pre-define the HTTP request that will be called when the add form is submitted
  deleteEntry = _ => {
      const entryToDelete = this.props.identifier
      console.log(`http://localhost:4000/entries/delete?id=${entryToDelete}`)
      fetch(`http://localhost:4000/entries/delete?id=${entryToDelete}`).catch(err => console.error(err))
  }

  //Visually render the add form
  render() {
      return (
        <div onClick={this.props.onClick} className=""> {/*This is where the child component uses its inherited method; when this div is clicked, handleClick is performed on the parent component*/}
            <button onClick={this.deleteEntry} className="btn"><i class="fas fa-times fa-lg"></i></button>
        </div>
      );
  };
}

export default DeleteEntryButton;
