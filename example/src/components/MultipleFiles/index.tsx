import React, { useState } from 'react'
import Styled from 'styled-components'
import { File } from 'react-og-forms'

import UploadedFile from 'react-og-forms/dist/interfaces/UploadedFile'

const Container = Styled.div`

`

function Index() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  return (
    <Container>
      <File
        accept='image/*'
        value={uploadedFiles}
        onChange={async (files: UploadedFile[]) => {
          await setUploadedFiles(files)
        }}
        baseUrl='https://localhost:1337'
        multiple={true}
      />
    </Container>
  )
}

export default Index
