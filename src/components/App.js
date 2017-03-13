import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageHeader, Grid, Row, Col, Alert } from 'react-bootstrap'

import './App.css'

import FileSelector from './FileSelector'
import ClaimReport from './ClaimReport'
import UsageReport from './UsageReport'

import { processFile } from '../processor'

function mapStateToProps(state) {
  return {
    processing: state.processing,
    result: state.result
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFileSelected: (file) => dispatch(processFile(file))
  }
}

class App extends Component {
  render() {
    const { processing, result, onFileSelected } = this.props

    let content
    if (processing) {
      content = <Alert bsStyle="info">Loading...</Alert>
    }
    else if (result) {
      content = (
        <Row>
          <Col xs={12} md={6}><ClaimReport total={result.totalClaimAmount}/></Col>
          <Col xs={12} md={6}><UsageReport weeks={result.weeks} /></Col>
        </Row>
      )
    }

    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <PageHeader>PRESTO Tax Credit Calculator</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
              <FileSelector onFileSelected={onFileSelected} />
            </Col>
          </Row>
          {content}
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)