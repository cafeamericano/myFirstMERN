import React, { Component } from 'react';
import AllEntriesList from './components/allEntriesList.js';
import Header from './components/header';

class App extends Component {

  render() {
      return(
          <div>
                <Header/>
                <br></br>
                <div className="container">
                    <AllEntriesList/> {/*Includes entryAddForm as a child*/}
                    <br></br>
                </div>
          </div>
      );
  }
}

export default App;