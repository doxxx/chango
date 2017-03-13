import React, { Component } from 'react'
import { Panel, Table } from 'react-bootstrap'

const DATE_FORMAT = 'YYYY-MM-DD'

class UsageReport extends Component {
  render() {
    const { weeks } = this.props

    let rows = []

    for (let week of weeks) {
      let first = true
      for (let entry of week.entries) {
        let entryCols = [
          <td key="company">{entry.company}</td>,
          <td key="tripCount">{entry.tripCount}</td>,
          <td key="totalTripCost">${entry.totalTripCost.toFixed(2)}</td>
        ]
        if (first) {
          first = false
          rows.push(
            <tr key={rows.length}>
              <td rowSpan={week.entries.length}>
                {week.from.format(DATE_FORMAT)} - {week.to.format(DATE_FORMAT)}
              </td>
              {entryCols}
            </tr>
          )
        }
        else {
          rows.push(<tr key={rows.length}>{entryCols}</tr>)
        }
      }
    }

    return (
      <Panel header="Usage Report" bsStyle="info">
        <Table bordered condensed fill>
          <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Trips</th>
              <th>Cost</th>
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
