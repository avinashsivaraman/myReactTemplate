import React from 'react';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';
import './style.css'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


export default class toDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      toDo: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = (event) => {
    event.preventDefault();
    switch(event.target.id){
      case 'increment':
        this.setState(prevState => {
        return { counter: prevState.counter+1 };
      });
        break;
      case 'decrement': {
        this.setState(prevState => {
          return { counter: (prevState.counter-1 > 0) ? prevState.counter-1 : 0 };
        });
        break;
      }
      case 'clear': {
        this.setState({
          counter: 0
        });
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {className, ...props} = this.props;
    return (
      <div className={classnames('Todo',className)} {...props}>
        <button className='btn btn-primary btn-space' id='increment'onClick={this.handleClick}> Increment </button>
        <button className='btn btn-danger btn-space'  id='decrement'onClick={this.handleClick}> Decrement </button>
        <div id='centered'>
          <Paper style={style} zDepth={5} circle={true}><center><h1><t>{this.state.counter}</t></h1></center></Paper>
          <button className='btn btn-danger btn-space'  id='clear'onClick={this.handleClick}> Clear </button>
        </div>
      </div>
    );
  }
}
