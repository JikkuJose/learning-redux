import React from 'react';
import styled from 'styled-components'

const Panel = styled.div`
  padding: 20px;
  font-family: monospace;
  font-size: 30px;
`

const Button = styled.button`
  padding: 8px;
  font-size: 20px;
  font-family: monospace;
`

const Container = styled.div`
  padding: 20px;
  background: #F5F5F5;
  font-family: monospace;
  border-bottom: 1px solid #E3E3E3;
  margin-bottom: 5px;
`

export default class Counter extends React.Component {
  render() {
    return(
      <Container>
        <Panel>
          {this.props.count}
        </Panel>
        <Button onClick={this.props.increment}>+</Button>
        <Button onClick={this.props.decrement}>-</Button>
        <Button onClick={this.props.delete}>Delete</Button>
      </Container>
    );
  }
}
