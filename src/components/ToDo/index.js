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
      timer: 0.0,
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
          counter: 0,
          timer: 0
        });
        break;
      }
      case 'fast': {
        this.setState({
          timer: parseFloat((this.state.timer + 1.00).toFixed(2)) 
        });
      }
      default:
        break;
    }
  }

  componentDidMount() {
    this.interval = setInterval( () => {
      this.setState(prevState => {
       return { timer: ((prevState.timer - Math.floor(prevState.timer)) >= 0.59 ) ? Math.floor(prevState.timer) + 1 : parseFloat((prevState.timer + 0.01).toFixed(2)) };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const {className, ...props} = this.props;
    return (
      <div className={classnames('Todo',className)} {...props}>
        <button className='btn btn-primary btn-space' id='increment'onClick={this.handleClick}> Increment </button>
        <button className='btn btn-danger btn-space'  id='decrement'onClick={this.handleClick}> Decrement </button>
        <div id='centered'>
          <Paper style={style} zDepth={5} circle={true}><h1>{this.state.counter}</h1> count </Paper>
          <Paper style={style} zDepth={2} circle={true}><h1>{this.state.timer}</h1> min </Paper>
          <button className='btn btn-danger btn-space'  id='clear'onClick={this.handleClick}> Clear </button>
          <button className='btn btn-danger btn-space'  id='fast'onClick={this.handleClick}> Fast Forward </button>
        </div>
      </div>
    );
  }
}
