import React, { Component } from 'react'
import { Panel, Table } from 'react-bootstrap'

import './UsageReport.css'

const DATE_FORMAT = 'YYYY-MM-DD'

class UsageReport extends Component {
  render() {
    const { weeks } = this.props

    let rows = []
    let weekIndex = 1

    for (let week of weeks) {
      let first = true
      for (let entry of week.entries) {
        let entryCols = [
          <td key="company" className="text-left">{entry.company}</td>,
          <td key="tripCount" className="text-right">{entry.tripCount}</td>,
          <td key="totalTripCost" className="text-right">${entry.totalTripCost.toFixed(2)}</td>
        ]
        if (first) {
          first = false
          rows.push(
            <tr key={rows.length}>
              <td rowSpan={week.entries.length} className="vert-center text-center">
                {weekIndex}
              </td>
              <td rowSpan={week.entries.length} className="vert-center text-center">
                {week.from.format(DATE_FORMAT)}
              </td>
              <td rowSpan={week.entries.length} className="vert-center text-center">
                {week.to.format(DATE_FORMAT)}
              </td>
              {entryCols}
            </tr>
          )
        }
        else {
          rows.push(<tr key={rows.length}>{entryCols}</tr>)
        }
      }
      weekIndex++
    }

    return (
      <Panel header="Usage Report" bsStyle="info">
        <Table bordered condensed fill>
          <thead>
            <tr>
              <th className="text-center">Week #</th>
              <th className="text-center">From</th>
              <th className="text-center">To</th>
              <th className="text-left">Company</th>
              <th className="text-right">Trips</th>
              <th className="text-right">Cost</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </Panel>
    )
  }
}

export default UsageReport
