import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalLinearStepper extends React.Component {
  static propTypes = {
    callBack: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired
  }
  constructor(props){
    super(props);
    this.state= {
      finished: false,
      stepIndex: 0,
      goal: null,
      time: null
    }
    this.setInputValue = this.setInputValue.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.show !== nextProps.show){
      return true;
    }
    if(this.state !== nextState) {
      return true;
    }
    return false;
  }
  handleNext = (event) => {
    event.preventDefault();

    const {stepIndex, goal, time} = this.state;
    if (event.currentTarget.id === 'Finish') {
      this.props.callBack({ goal, time });
      this.setState({stepIndex: 0, finished: false});
    }
    else {
      this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  setInputValue(event){
    event.preventDefault();
    switch(event.target.id) {
      case 'Goal': {
        this.setState({
          goal: event.target.value 
        });
        break;
      }
      case 'time': {
        this.setState({
          time: event.target.value
        });
        break;
      }
      default:
        break;
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<TextField
                id='Goal'
                key='Goal'
                hintText="Your goal to be accompolish"
                errorText="This field is required"
                floatingLabelText="Goal"
                onChange={this.setInputValue}/>);
      case 1:
        return (<TextField
                id='time'
                key='time'
                hintText="Your minutes to be accompolish"
                errorText="This field is required"
                floatingLabelText="Time"
                onChange={this.setInputValue}/>);
      case 2:
        return `You are going to accompolish "${this.state.goal}" in ${this.state.time} minutes`;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {finished, stepIndex, show} = this.state;
    const contentStyle = {margin: '0 16px'};
    if (!this.props.show){
      return (
         <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Goal
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>Time</StepLabel>
            </Step>
            <Step>
              <StepLabel>Achieve</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle} show={this.state.show}>
            {finished ? (
              <p>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                  }}
                >
                  Click here
                </a> to reset the example.
              </p>
            ) : (
              <div>
                <p>{this.getStepContent(stepIndex)}</p>
                <div style={{marginTop: 12}}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onTouchTap={this.handlePrev}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    className={stepIndex === 2 ? 'Finish' : 'Next'}
                    id={stepIndex === 2 ? 'Finish' : 'Next'}
                    key={stepIndex === 2 ? 'Finish' : 'Next'}
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onClick={this.handleNext}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default HorizontalLinearStepper;