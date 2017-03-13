import React, { Component } from 'react'
import { Form, FormGroup } from 'react-bootstrap'
import Files from 'react-files'

import './FileSelector.css'

class FileSelector extends Component {
  render() {
    const { onFileSelected } = this.props
    const onChange = (files) => {
      onFileSelected(files[0])
      files.splice(0, files.length) // clear files array to allow further drops
    }
    const onError = (err) => window.alert('Cannot process file: ' + err.message)

    return (
      <div>
        <Form>
          <FormGroup>
            <Files className="file-selector" dropActiveClassName="drop-active" accepts={['application/pdf']} multiple={false} maxFiles={1} onChange={onChange} onError={onError}>
              Drop your PRESTO Transit Usage Report PDF file here, or click to open a file browser.
            </Files>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default FileSelector
