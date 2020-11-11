import Styled from 'styled-components'

const Item = Styled.label.attrs({
  className: 'react-og-item'
})`
  font-size: 24px;
  font-family: var(--title-font);

  color: #191919;

  display: flex;
  flex-direction: column;

  margin-bottom: 8px;
`

export default Item
