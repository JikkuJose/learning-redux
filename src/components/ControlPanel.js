import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
  background: #B6B6B6;
  margin-bottom: 20px;
`

const Button = styled.button`
  font-size: 20px;
  font-family: monospace;
  padding: 15px;
`

export default class ControlPanel extends React.Component {
  render() {
    return(
      <Container>
        <Button onClick={this.props.onAddClick}>Add Counter</Button>
        <Button onClick={this.props.onDeleteAllClick}>Delete All</Button>
        <Button onClick={this.props.onAddToEachClick}>Add to Each</Button>
        <Button onClick={this.props.onShowEvenClick}>Show Even</Button>
        <Button onClick={this.props.onShowOddClick}>Show Odd</Button>
        <Button onClick={this.props.onShowAllClick}>Show All</Button>
      </Container>
    );
  }
}
