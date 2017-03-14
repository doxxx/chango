import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

function sum(array) {
  return array.reduce((a,b) => a+b)
}

class ClaimReport extends Component {
  render() {
    let { total, periods } = this.props
    let avgTripCount = sum(periods.map(p => p.tripCount)) / periods.length
    let avgPeriodCost = sum(periods.map(p => p.totalTripCost)) / periods.length
    return (
      <Panel header="Claim" bsStyle="primary">
        <p className="lead">Total claim amount: ${total.toFixed(2)}</p>
        <p>Number of claimed periods: {periods.length}</p>
        <p>Average trips per claimed period: {avgTripCount.toFixed(0)}</p>
        <p>Average cost per claimed period: ${avgPeriodCost.toFixed(2)}</p>
      </Panel>
    )
  }
}

export default ClaimReport
