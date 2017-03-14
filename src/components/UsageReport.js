import React, { Component } from 'react'
import { Panel, Table } from 'react-bootstrap'

import './UsageReport.css'

const DATE_FORMAT = 'YYYY-MM-DD'

function findPeriod(periods, week) {
  for (var periodIndex = 0; periodIndex < periods.length; periodIndex++) {
    var period = periods[periodIndex];
    if (period.from.isSameOrBefore(week.from) && period.to.isSameOrAfter(week.to)) {
      return { period, periodIndex }
    }
  }

  return {}
}

class UsageReport extends Component {
  render() {
    const { weeks, periods } = this.props

    let rows = []
    let weekIndex = 1

    for (let week of weeks) {
      let { period, periodIndex } = findPeriod(periods, week)
      let first = true

      for (let entry of week.entries) {
        let cols = []

        if (first) {
          first = false

          if (period && period.from.isSame(week.from)) {
            cols.push(
              <td key="periodIndex" rowSpan={period.entryCount} className="vert-center text-center">
                {periodIndex}
              </td>
            )
          }
          else if (!period) {
            cols.push(<td key="empty" rowSpan={week.entries.length}/>)
          }

          cols.push(
            <td key="weekIndex" rowSpan={week.entries.length} className="vert-center text-center">
              {weekIndex}
            </td>
          )
          cols.push(
            <td key="weekFrom" rowSpan={week.entries.length} className="vert-center text-center">
              {week.from.format(DATE_FORMAT)}
            </td>
          )
          cols.push(
            <td key="weekTo" rowSpan={week.entries.length} className="vert-center text-center">
              {week.to.format(DATE_FORMAT)}
            </td>
          )
        }

        cols.push(<td key="company" className="text-left">{entry.company}</td>)
        cols.push(<td key="tripCount" className="text-right">{entry.tripCount}</td>)
        cols.push(<td key="totalTripCost" className="text-right">${entry.totalTripCost.toFixed(2)}</td>)

        rows.push(<tr key={rows.length}>{cols}</tr>)
      }

      weekIndex++
    }

    return (
      <Panel header="Usage Report" bsStyle="info">
        <Table bordered condensed fill>
          <thead>
            <tr>
              <th className="text-center">Period #</th>
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
