import React, { Component } from 'react';
import Main from './components/main.js';
import Header from './components/header';

class App extends Component {

  render() {
      return(
          <div>
                <Header/>
                <br></br>
                <div className="container">
                    <Main/>
                    <br></br>
                </div>
          </div>
      );
  }
}

export default App;