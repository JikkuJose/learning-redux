import React from 'react';
import Counter from './components/Counter.js'

class App extends React.Component {
  render() {
    return (
      <Counter count={3} />
    );
  }
}

export default App;
