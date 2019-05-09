import React, { Component } from 'react';

const headerStyle = {
  background: 'teal',
  color: 'white'
}

class Header extends Component {

  render() {
    return(
        <div className="p-3" style={headerStyle}>
            <h1 className="text-right">Microstudy</h1>
        </div>
    );
  }
}

export default Header;