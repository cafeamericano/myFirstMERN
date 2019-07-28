import React, { Component } from 'react';

const headerStyle = {
  background: '#e8b6a2',
  color: 'black',
  fontFamily: 'monoton',
  fontSize: '50px',
}
class Header extends Component {

  render() {
    return (
      <div id="logo" className="p-3 text-right" >
          <h1 style={headerStyle}>MERN Tasks</h1>
      </div>
    );
  }
}

export default Header;