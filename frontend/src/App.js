import React, { Component } from 'react';
import Main from './components/main.js';
import Header from './components/header';

class App extends Component {
    constructor(props) {
        super(props);
    }
  
  render() {
      return(
          <div className="mb-5">
                <Header/>
                <div class="container"><Main/></div>
          </div>
      );
  }
}

export default App;