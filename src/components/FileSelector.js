import React, { Component } from 'react'
import { Form, FormGroup } from 'react-bootstrap'
import Files from 'react-files'

import './FileSelector.css'

class FileSelector extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      filename: null
    }
  }

  render() {
    const { onFileSelected } = this.props
    const { filename } = this.state

    const onChange = (files) => {
      // remove old files
      while (files.length > 1) {
        files.slice(1, files.length)
      }

      // store filename
      this.setState({ filename: files[0].name })

      // trigger file processing
      onFileSelected(files[0])
    }
    const onError = (err) => window.alert('Cannot process file: ' + err.message)
    const messagOrFilename = filename ? filename : "Drop your PRESTO Transit Usage Report PDF file here, or click to open a file browser."

    return (
      <div>
        <Form>
          <FormGroup>
            <Files className="file-selector" dropActiveClassName="drop-active" accepts={['application/pdf']} multiple={false} onChange={onChange} onError={onError}>
              {messagOrFilename}
            </Files>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default FileSelector
