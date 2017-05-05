import React from 'react';
import classnames from 'classnames';

import { Paper, Snackbar } from 'material-ui';
import './style.css'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'relative',
};


export default class toDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      timer: 0.0,
      speed: 0.01,
      toDo: [],
      open: false,
      message: `Do you want to reset `
    };
    this.showSnackbar = false;
    this.handleClick = this.handleClick.bind(this);
    this.moonLight = this.moonLight.bind(this);
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
          timer: 0,
          speed: 0.01
        });
        break;
      }
      case 'fast': {
        this.setState(prevState => {
          return{ speed: prevState.speed+0.02 }
        });
        break;
      }
      case 'slow': {
        this.setState(prevState => {
          if (prevState.speed > 0.04){
            return{ speed: prevState.speed-0.02 }
          }
        });
        break;
      }
      default:
        break;
    }
  }
  moonLight() {
    if (this.state.timer && this.state.timer % 2 === 0 && this.state.timer === Math.floor(this.state.timer)) {
      this.showSnackbar = true;
    }
  }
  componentDidMount() {
    this.interval = setInterval( () => {
      this.setState(prevState => {
        let result = parseFloat((prevState.timer + prevState.speed).toFixed(2));
        result = (result -  Math.floor(result) > 0.59) ? Math.ceil(result) : result ;
        return { timer: ((prevState.timer - Math.floor(prevState.timer)) >= 0.59 ) ? Math.floor(prevState.timer) + 1 : result };
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
        <button className='btn btn-primary btn-space col-xs-2' id='increment'onClick={this.handleClick}> Increment </button>
        <button className='btn btn-danger btn-space col-xs-2'  id='decrement'onClick={this.handleClick}> Decrement </button>
        <div id='centered' className='col-xs-12'>
          <div className='col-xs-12'>
            <Paper className='col-xs-6'style={style} zDepth={5} circle={true}><h1>{this.state.counter}</h1>count</Paper>
            <Paper className='col-xs-6 pull-right' style={style} zDepth={2} circle={true}><h1>{this.state.timer}</h1> min </Paper>
          </div>
          <div className = 'col-xs-12'>
            <button className='btn btn-danger btn-space col-xs-2'  id='clear'onClick={this.handleClick}> Clear </button>
            <button className='btn btn-success btn-space col-xs-2'  id='fast'onClick={this.handleClick}> Fast Forward </button>
            <button className='btn btn-primary btn-space col-xs-2'  id='slow'onClick={this.handleClick}> Slow Down </button>
          </div>
        </div>
        {this.moonLight()}
        <Snackbar
          open={this.showSnackbar}
          message={this.state.message}
          action="reset"
          autoHideDuration={2000}
          onActionTouchTap={() => { 
            this.showSnackbar = false;
            this.setState({
              timer: 0.00
          });}}
          onRequestClose={() => this.showSnackbar = false }
        />
      </div>
    );
  }
}
