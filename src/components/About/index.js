import React, { Component } from 'react';
import classnames from 'classnames';
import icon from './logo.svg'

import './style.css';

const NotificationLetter = ['YOu are AweSome', 'One Man ArmY', 'My God, You are alive', 'I am FucKing TiRed', 'YoU aRe BeaUtiFul']

export default class About extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}
  componentWillMount() {
      Notification.requestPermission();
      
  }

  componentDidMount() {
    new Notification('Rendered');
  }

  NotifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var options = {
        body: NotificationLetter[Math.floor(Math.random()*4)],
        icon: icon,
        vibrate: [100,200,100]
      }
      var notification = new Notification("NOtification Here", options);
      notification.vibrate;
    }
}
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>
        <h1>
          <button className='btn btn-primary' id='NotifyMe' onClick={this.NotifyMe}>NotifyMe</button>
        </h1>
      </div>
    );
  }
}
