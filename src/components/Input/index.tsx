import Styled, { css } from 'styled-components'

interface InputProps {
  status?: boolean
}

const ValidInput = css`
  border: 2px solid #8bc34a;
`

const InvalidInput = css`
  border: 2px solid #f44336;
`
const DefaultInput = css`
  &:focus {
    border: 2px solid #2196f3;
  }
`

export const Input = Styled.input.attrs({
  className: 'react-og-input'
})`
  font-size: 20px;
  font-family: var(--content-font);

  padding: 10px 10px;

  box-shadow: 1px 1px 3px -1px #121212;

  border-radius: 2px;
  border: 2px solid #FAFAFA;

  background-color: #FAFAFA;

  &:focus {
    outline: 0;
  }

  ${(props: InputProps) => {
    switch (props.status) {
      case true:
        return ValidInput

      case false:
        return InvalidInput

      default:
        return DefaultInput
    }
  }}
`
export default Input
