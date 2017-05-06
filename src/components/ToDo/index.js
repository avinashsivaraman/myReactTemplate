import React from 'react';
import classnames from 'classnames';

import { Paper, Snackbar } from 'material-ui';
import './style.css';

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
      message: `Do you want to reset `,
      Lap: [],
      play: 'stop'
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
          speed: 0.01,
          Lap: []
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
          if (prevState.speed > 0.02){
            return{ speed: prevState.speed-0.02 }
          }
        });
        break;
      }
      case 'lap': {
        const { Lap, timer } = this.state;
        Lap.push(timer);
        this.setState({ Lap });
        break;
      }
      case 'start': {
        if(!this.interval){
          this.interval = setInterval( () => {
            this.setState(prevState => {
              let result = parseFloat((prevState.timer + prevState.speed).toFixed(2));
              result = (result -  Math.floor(result) > 0.59) ? Math.ceil(result) : result ;
              return { timer: ((prevState.timer - Math.floor(prevState.timer)) >= 0.59 ) ? Math.floor(prevState.timer) + 1 : result, play: 'stop' };
            });
          }, 1000);
        }
        break;
      }
      case 'stop': {
        this.setState({
          play: 'start' 
        });
        clearInterval(this.interval);
        this.interval = 0;
        break;
      }
      default:
        break;
    }
  }
  moonLight() {
    if (this.state.timer && this.state.timer % 30 === 0 && this.state.timer === Math.floor(this.state.timer)) {
      var options = {
        body: 'Hurry up buddy.. 30 min snooze',
        vibrate: [100,200,100]
      }
      var notification = new Notification("My Lord", options);
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
    const { Lap } = this.state;
    return (
      <div className={classnames('Todo',className)} {...props}>
        <canvas id="demo-canvas"></canvas>
        <button className='btn btn-primary btn-space col-xs-2' id='increment'onClick={this.handleClick}> Increment </button>
        <button className='btn btn-danger btn-space col-xs-2'  id='decrement'onClick={this.handleClick}> Decrement </button>
        <div id='centered' className='col-xs-12'>
          <div className='col-xs-12'>
            <Paper className='col-xs-4'style={style} zDepth={5} circle={true}><h1>{this.state.counter}</h1>count</Paper>
            { Lap.map((key,i) => {
                return <span className='col-xs-4'> You are lap {i+1} at {key} <br /></span>
            })}
            <Paper className='col-xs-4 pull-right' style={style} zDepth={2} circle={true}><h1>{this.state.timer}</h1> min </Paper>
          </div>
          <div className = 'col-xs-12'>
            <button className='btn btn-danger btn-space col-xs-2'  id='clear'onClick={this.handleClick}> Clear </button>
            <button className='btn btn-primary btn-space col-xs-2'  id={this.state.play} onClick={this.handleClick}> {(this.state.play).toUpperCase()} </button>
            { (this.state.play === 'stop' || this.state.timer === 0 ) && <div>
            <button className='btn btn-success btn-space col-xs-2'  id='fast' onClick={this.handleClick}> Fast Forward </button>
            <button className='btn btn-primary btn-space col-xs-2'  id='slow' onClick={this.handleClick} > Slow Down </button>
            <button className='btn btn-danger btn-space col-xs-2'  id='lap' onClick={this.handleClick}> Lap </button> </div>} 
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
