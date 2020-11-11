import React, { useState } from 'react'
import Styled from 'styled-components'
import { File } from 'react-og-forms'
import UploadFile from 'react-og-forms/dist/interfaces/UploadedFile'

const Container = Styled.div`
  display: flex;
  justify-content: center;
`

function Index() {
  const [file, setFile] = useState<UploadFile[]>([])

  return (
    <Container>
      <File
        accept='image/*'
        value={file}
        onChange={(file: UploadFile[]) => {
          setFile(file)
        }}
        baseUrl='https://localhost:1337'
      />
    </Container>
  )
}

export default Index
