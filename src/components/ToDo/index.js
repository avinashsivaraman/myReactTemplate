import React from 'react';
import classnames from 'classnames';
import HorizontalLinearStepper from './HorizontalLinearStepper'
import { Paper, Snackbar } from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'block-inline',
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
      play: 'stop',
      showStepper: false
    };
    this.showSnackbar = false;
    this.handleClick = this.handleClick.bind(this);
    this.moonLight = this.moonLight.bind(this);
    this.setGoalTarget = this.setGoalTarget.bind(this);
  }
  handleClick = (event) => {
    event.preventDefault();
    switch(event.currentTarget.id){
      /*case 'increment':
        this.setState(prevState => {
        return { counter: prevState.counter+1 };
      });
        break;
      case 'decrement': {
        this.setState(prevState => {
          return { counter: (prevState.counter-1 > 0) ? prevState.counter-1 : 0 };
        });
        break;
      }*/
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

  setGoalTarget({goal, time}) {
    console.log(goal, time);
    this.setState({
      showStepper: !this.state.showStepper 
    });
  }
  render() {
    const {className, ...props} = this.props;
    const { Lap, play } = this.state;
    const colorPlay = (play==='stop') ?  'btn btn-primary' :  'btn btn-danger' 
    return (
      <div className={classnames('Todo',className)} {...props}>
        <canvas id="demo-canvas"></canvas>
        <div className='col-xs-8'>
          <HorizontalLinearStepper callBack={this.setGoalTarget} show={!this.state.showStepper}/>
        </div>
        <div className='col-xs-4'>
          <div className='col-xs-12'>
            { Lap.map((key,i) => {
                return <span className='col-xs-4'> You are lap {i+1} at {key} <br /></span>
            })}
            <Paper className='col-xs-4' style={style} zDepth={2} circle={true}><h1>{this.state.timer}</h1> min </Paper>
          </div>
          <div className = 'col-xs-12'>
            <button className='btn btn-danger btn-space'  id='clear' onClick={this.handleClick}><i className='fa fa-times' aria-hidden /></button>
            <button className= {colorPlay}  id={this.state.play} onClick={this.handleClick} ><i className='fa fa-play-circle' aria-hidden /></button>
            { (this.state.play === 'stop') && <div>
            <button className='btn btn-success btn-space'  id='fast' onClick={this.handleClick}><i className='fa fa-forward' aria-hidden /></button>
            <button className='btn btn-primary btn-space'  id='slow' onClick={this.handleClick} ><i className='fa fa-backward' aria-hidden/> </button>
            <button className='btn btn-danger btn-space'  id='lap' onClick={this.handleClick}><i className='fa fa-level-up' aria-hidden/></button> </div>} 
          </div>
        </div>
        <FloatingActionButton secondary={true} style={{marginRight: 20}} onTouchTap={()=>{this.setState(prevState => {
          return {showStepper: !prevState.showStepper}
        });}}>
          <ContentAdd />
        </FloatingActionButton>
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
