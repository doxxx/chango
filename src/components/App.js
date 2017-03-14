import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageHeader, Grid, Row, Col, Alert, Navbar } from 'react-bootstrap'

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
      content = <Row><Col xs={12} md={8} mdOffset={2}><Alert bsStyle="info">Loading...</Alert></Col></Row>
    }
    else if (result) {
      content = (
        <Row>
          <Col xs={12} md={8} mdOffset={2}><ClaimReport total={result.totalClaimAmount} periods={result.periods}/></Col>
          <Col xs={12} md={8} mdOffset={2}><UsageReport weeks={result.weeks} periods={result.periods}/></Col>
        </Row>
      )
    }

    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <PageHeader>CHANGO <small>PRESTO Tax Claim Calculator</small></PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
              <FileSelector onFileSelected={onFileSelected} />
            </Col>
          </Row>
          {content}
        </Grid>
        <Navbar fixedBottom fluid>
          <Navbar.Text>Website Copyright © 2017 Gordon Tyler. PRESTO Copyright © 2016 Metrolinx. This website is not sponsored, endorsed or produced by PRESTO.</Navbar.Text>
        </Navbar>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
