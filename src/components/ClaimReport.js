import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

class ClaimReport extends Component {
  render() {
    let { total } = this.props
    return (
      <Panel header="Claim" bsStyle="primary">
        <p className="lead">Total claim amount: ${total.toFixed(2)}</p>
      </Panel>
    )
  }
}

export default ClaimReport
