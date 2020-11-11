import React from 'react'
import WebFont from 'webfontloader'
import Styled, { keyframes } from 'styled-components'
import Highlight from 'react-highlight'

import Form from './components/Form'
import MultipleFiles from './components/MultipleFiles'
import OneFile from './components/OneFile'

import TSIcon from './images/typescript-icon.png'
import StyledIcon from './images/styled-component-icon.png'
import ReactIcon from './images/react-icon.png'

import 'react-highlight/node_modules/highlight.js/styles/dracula.css'

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'Nunito:300,400,700']
  }
})

const Container = Styled.main`
  width: 100%;
  max-width: 600px;

  margin: 0 auto;
  padding: 0 1rem;

  section {
    margin: 1rem;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Rotate = Styled.div`
  animation: ${rotate} 3s linear infinite;

  width: fit-content;
`

const Grid = Styled.div`
  width: 100%;
  max-width: 320px;

  margin: 1rem auto;
`

const App = () => {
  return (
    <>
      <Container>
        <header>
          <h1>React OG Forms</h1>
          <p>
            Forms lib made by OG Developer using typescript, styled-components
            and react-dropzone
          </p>

          <p>
            Main reference for construction is{' '}
            <a
              href='https://www.youtube.com/watch?v=G5UZmvkLWSQ&ab_channel=Rocketseat'
              target='_blank'
              rel='noreferrer noopener'
            >
              "Upload Files by Diego Fernandes from Rocketseat"
            </a>
            <span role='img' aria-label='rocket'>
              🚀
            </span>
          </p>
        </header>
        <section>
          <h2>Install</h2>
          <Highlight className='bash'>
            {`npm install --save react-og-forms`}
          </Highlight>
          <span>or</span>
          <Highlight className='bash'>{`yarn add react-og-forms`}</Highlight>
        </section>
        <section>
          <h2>Setup</h2>
          <Highlight className='css'>
            {`
            :root {
              --title-font: Roboto;
              --content-font: Nunito;
            }
          `}
          </Highlight>
        </section>
        <section>
          <h2>Input Form</h2>
          <Grid>
            <Form />
          </Grid>
          <Highlight className='javascript'>{`
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

          export default Index`}</Highlight>
        </section>

        <section>
          <h2>Input File</h2>
          <Grid>
            <OneFile />
          </Grid>
          <Highlight>
            {`
            import React, { useState } from 'react'
            import Styled from 'styled-components'
            import { File } from 'react-og-forms'

            import UploadedFile from 'react-og-forms/dist/interfaces/UploadedFile'

            const Container = Styled.div

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
                      Authorization: ''
                    }}
                  />
                </Container>
              )
            }

            export default Index`}
          </Highlight>
        </section>

        <section>
          <h2>Input File Multiple</h2>
          <Grid>
            <MultipleFiles />
          </Grid>
          <Highlight>
            {`
            import React, { useState } from 'react'
            import Styled from 'styled-components'
            import { File } from 'react-og-forms'
            import UploadFile from 'react-og-forms/dist/interfaces/UploadedFile'

            const Container = Styled.div

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
                      Authorization: ''
                    }}
                    multiple={true}
                  />
                </Container>
              )
            }

            export default Index`}
          </Highlight>
        </section>
      </Container>
      <footer>
        <div>
          <strong>OG Developer</strong>
          <span>
            {'  '}- License MIT © [odenirdev](
            <a
              href='https://github.com/odenirdev'
              target='_blank'
              rel='noreferrer noopener'
            >
              https://github.com/odenirdev
            </a>
            )
          </span>
        </div>
        <div className='icones'>
          <a
            href='https://styled-components.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={StyledIcon} alt='Styled components icon' width='32px' />
          </a>
          <a
            href='https://www.typescriptlang.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={TSIcon} alt='Typescript icon' width='32px' />
          </a>
          <a
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Rotate>
              <img src={ReactIcon} alt='Typescript icon' width='32px' />
            </Rotate>
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
