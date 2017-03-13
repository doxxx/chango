import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

class AppNav extends Component {
  render() {
    return (
      <Navbar fixedTop inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            Prestocard Tax Credit Calculator
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}

export default AppNav;