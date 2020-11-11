import Styled, { css } from 'styled-components'

export const Container = Styled.div`
  width: fit-content;
`

export const Preview = Styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`

interface UploadMessageInterface {
  type?: string
}

const MessageDefault = css`
  background-color: rgba(250, 250, 250, 0.5);
  color: #121212;
`

const MessageError = css`
  background-color: rgba(250, 250, 250, 0.5);
  color: #f44336;
`

const MessageSuccess = css`
  background-color: rgba(250, 250, 250, 0.5);
  color: #8bc34a;
`

export const UploadMessage = Styled.div`
  font-family: var(--title-font);

  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  transition: 400ms;

  p {
    padding: 0;
  }

  ${(props: UploadMessageInterface) => {
    switch (props.type) {
      case 'error':
        return MessageError

      case 'success':
        return MessageSuccess

      default:
        return MessageDefault
    }
  }}
`

interface DropContainerInterface {
  isDragActive: boolean
  isDragReject: boolean
  width?: string
  height?: string
  src?: string
  uploaded: boolean
}

export const DropContainer = Styled.div`
  position: relative;

  background-color: #FAFAFA;

  border-radius: 2px;

  box-shadow: 1px 1px 3px -1px #121212;

  cursor: pointer;

  width: ${(props: DropContainerInterface) => props.width || '225px'};

  height: ${(props: DropContainerInterface) =>
    props.height || props.uploaded ? 'auto' : '225px'};

  background-image: url(${(props: DropContainerInterface) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  &:focus {
    outline: 0;
  }
`
export const FileInfo = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .infos {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    padding-right: 2px;

    strong {
      width: 170px;
      overflow-x: auto;
    }

    span {
      font-size: 12px;
      color: #999;

      button {
        border: 0;
        background: transparent;
        color: #f44336;
        margin-left: 5px;
        cursor: pointer;
      }
    }
`
