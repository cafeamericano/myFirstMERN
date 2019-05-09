import React, { Component } from 'react';

const headerStyle = {
  background: 'white',
  color: 'black',
  fontFamily: 'monoton',
  fontSize: '50px',
  marginBottom: '-10px'
}

const line1 ={
  border: '1px red solid',
  margin: '2px auto'
}

const line2 ={
  border: '1px green solid',
  margin: '2px auto'
}

const line3 ={
  border: '1px yellow solid',
  margin: '2px auto'
}

const line4 ={
  border: '1px blue solid',
  margin: '2px auto'
}

class Header extends Component {

  render() {
    return(
      <div>
        <div id="logo" className="p-3" >
            <div className="text-right">
              <h1 style={headerStyle}>Tasks</h1>
              <small>Powered by React</small>
            </div>
        </div>
        <div id="colorbars">
          <hr style={line1}></hr>
          <hr style={line2}></hr>
          <hr style={line3}></hr>
          <hr style={line4}></hr>
        </div>
      </div>
    );
  }
}

export default Header;