import React from 'react'

import OneFile from '../OneFile'
import FileMultiple from '../FileMultiple2'

// eslint-disable-next-line no-unused-vars
import Props from '../../interfaces/File'

function Index(props: Props) {
  if (props.multiple) {
    return <FileMultiple {...props} />
  }

  return <OneFile {...props} />
}

export default Index
