# react-og-forms

> Forms lib made by OG Developer using typescript, styled-components and react-dropzone

> Main reference for construction access at ["Upload Files by Diego Fernandes from Rocketseat"](https://www.youtube.com/watch?v=G5UZmvkLWSQ&ab_channel=Rocketseat)

[![NPM](https://img.shields.io/npm/v/react-og-forms.svg)](https://www.npmjs.com/package/react-og-forms) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Documentation](https://react-og-forms.netlify.app/)

## Install

```bash
npm install --save react-og-forms

or

yarn add react-og-forms
```

## Setup

```css
:root {
  --title-font: Roboto;
  --content-font: Nunito;
}
```

## Input Form

```tsx
import React, { useState } from 'react'

import Form, { Input, Item, Switch } from 'react-og-forms'

function Index() {
  const [blocked, setBlocked] = useState(true)

  return (
    <Form>
      <Item>
        Nome
        <Input value='OG Form' />
      </Item>
      <Item>
        E-Mail
        <Input type='email' value='odenirdev@gmail.com' status={true} />
      </Item>
      <Item>
        <Input
          placeholder='Confirmar senha'
          type='password'
          value='GFEDCBA'
          status={false}
        />
      </Item>
      <Item>
        <Switch
          label='Bloqueado'
          value={blocked}
          onChange={(value) => setBlocked(value)}
        />
      </Item>
    </Form>
  )
}

export default Index
```

## Input File

```tsx
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
        onChange={(files: UploadedFile[]) => setUploadedFiles(files)}
        baseUrl='https://localhost:1337'
        headers={{
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA0NjEzMzUyLCJleHAiOjE2MDcyMDUzNTJ9.8M00WmsOOK_q9toenddLMEp57VG5DwEEdOtDRk5MieM'
        }}
      />
    </Container>
  )
}

export default Index
```

## Input File Multiple

```tsx
import React, { useState } from 'react'
import Styled from 'styled-components'
import { File } from 'react-og-forms'
import UploadFile from 'react-og-forms/dist/interfaces/UploadedFile'

const Container = Styled.div``

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
        headers={{
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA0NjEzMzUyLCJleHAiOjE2MDcyMDUzNTJ9.8M00WmsOOK_q9toenddLMEp57VG5DwEEdOtDRk5MieM'
        }}
        multiple={true}
      />
    </Container>
  )
}

export default Index
```

## License

MIT © [odenirdev](https://github.com/odenirdev)
