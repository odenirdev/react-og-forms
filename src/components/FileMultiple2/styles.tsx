import Styled, { css } from 'styled-components'

export const Container = Styled.div`
  width: 100%;
  max-width: 600px;

  background-color: #FFF;
  padding: 18px;

  border-radius: 2px;

  box-shadow: 1px 1px 3px -1px #121212;
`

interface DropContainerInterface {
  isDragActive?: boolean
  isDragReject?: boolean
}

const dragActive = css`
  border-color: #8bc34a;
`
const dragReject = css`
  border-color: #f44336;
`

export const DropContainer = Styled.div`
  border: 1px dashed #474747;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props: DropContainerInterface) => props.isDragActive && dragActive}

  ${(props: DropContainerInterface) => props.isDragReject && dragReject}

  &:focus {
    outline: 0;
  }
`

interface UploadMessageInterface {
  type?: string
}

const messageColors = {
  default: '#474747',
  error: '#f44336',
  success: '#8bc34a'
}

export const UploadMessage = Styled.p`
  font-family: var(--title-font);
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  margin: 0;
  display: flex;
  color: ${(props: UploadMessageInterface) =>
    messageColors[props.type || 'default']};
`
