import React from 'react'
import Styled, { keyframes } from 'styled-components'

interface Props {
  label: string
  value: boolean
  onChange: (value: boolean) => any
}

interface SwitcherProps {
  value: boolean
}

const SwitchOn = keyframes`
  from {
    margin-left: 0%;
  }

  to {
    margin-left: 60%;
  }
`
const SwitchOff = keyframes`
  from {
    margin-left: 60%;
  }

  to {
    margin-left: 0%;
  }
`

const GridOff = keyframes`
  from {
    background-color: #8bc34a;
  }

  to {
    background-color: #e6e6e6;
  }
`
const GridOn = keyframes`
  from {
    background-color: #e6e6e6;
  }

  to {
    background-color: #8bc34a;
  }
`

const Container = Styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;

  width: fit-content;

  span {
    font-size: 18px;
    margin-left: 5px;
  }
`

const Grid = Styled.div`
  background-color: ${(props: SwitcherProps) =>
    props.value ? '#8bc34a' : '#e6e6e6'};

  animation: ${(props: SwitcherProps) =>
    props.value ? GridOn : GridOff} 0.2s linear;

  width: 72px;
  height: 32px;

  box-shadow: 1px 1px 3px -1px #121212;

  border-radius: 16px;

  display: flex;
  align-items: center;

  padding: 0 5px;
`
const Switcher = Styled.div`
  background-color: #FAFAFA;
  width: 26px;
  height: 26px;
  border-radius: 13px;

  box-shadow: 1px 1px 3px -2px #121212;

  animation: ${(props: SwitcherProps) =>
    props.value ? SwitchOn : SwitchOff} 0.2s linear;
  margin-left: ${(props: SwitcherProps) => (props.value ? 'auto' : '0')};
`

function Index(props: Props) {
  return (
    <Container
      onClick={() => {
        props.onChange(!props.value)
      }}
    >
      <Grid value={props.value}>
        <Switcher value={props.value} />
      </Grid>
      <span>{props.label}</span>
    </Container>
  )
}

export default Index
