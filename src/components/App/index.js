import React, { Component } from 'react';
import classnames from 'classnames';
import './style.css';

class App extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('App', className)} {...props}>
        <p className="App-intro">
            Hey Buddy !!!!
        </p>
      </div>
    );
  }
}

export default App;
