import Styled from 'styled-components'

export const Container = Styled.ul`
  width: 100%;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
  }

  li {
    margin-top: 15px;
  }
`
export const FileInfo = Styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

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
  }
`

interface PreviewInterface {
  src?: string
}

export const Preview = Styled.div`
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background-image: url(${(props: PreviewInterface) => props.src});
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`
